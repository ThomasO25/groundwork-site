# Internal Project Dashboard — Technical Plan

A lightweight, **internal-only** dashboard for the agency to track clients, projects,
and inbound leads. This is a **plan, not a built feature** — the marketing site ships
fully functional without it. Per the "add a backend only when needed" principle, stand
this up once lead/project volume makes a spreadsheet painful (rough trigger: more than
a handful of active projects or leads arriving faster than you can log them by hand).

---

## Goals & non-goals

**Goals**
- One place to see every client, every active project, and its status.
- Capture inbound leads from the website automatically and track them to won/lost.
- Simple enough for a 1–3 person team to actually keep updated.

**Non-goals (deliberately out of scope for v1)**
- Client-facing portal, invoicing/payments, time tracking, file storage.
- Anything public. The dashboard is behind auth and excluded from search
  (`/robots.txt` already disallows `/dashboard`).

---

## Recommended stack

| Concern | Choice | Why |
|--------|--------|-----|
| Database | **Supabase (Postgres)** | Managed Postgres, generous free tier, integrates cleanly with Next.js |
| Auth | **Supabase Auth** | Email-based login for team members; no need to build auth |
| Access control | **Row Level Security (RLS)** | Enforced at the database, so a leaked key can't dump data |
| UI | Next.js route group `app/(dashboard)/dashboard/…` | Reuses this repo's components and deploy pipeline |
| Hosting | Same Vercel project (or a separate one) | No new infra |

Keeping it in Supabase means the marketing site's `/api/quote` endpoint can insert
leads directly, and the dashboard reads from the same tables — one source of truth.

---

## Data model (v1)

Three core tables plus optional notes. Timestamps (`created_at`, `updated_at`) on all.

### `clients`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (pk) | |
| business_name | text | |
| contact_name | text | |
| email | text | |
| phone | text | |
| industry | text | |
| service_area | text | |
| status | enum | `prospect`, `active`, `past`, `archived` |
| notes | text | free-form |

### `projects`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk → clients) | |
| name | text | e.g. "Website Launch" |
| tier | enum | `SVC-01`, `SVC-02`, `SVC-03` |
| status | enum | `intake`, `design`, `build`, `review`, `launched`, `care`, `on_hold` |
| quoted_amount | numeric | |
| care_plan | text | monthly plan, if any |
| target_launch | date | |
| launched_at | date | nullable |

### `leads`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (pk) | |
| name | text | |
| business | text | |
| email | text | |
| phone | text | |
| industry | text | |
| budget | text | matches quote-form options |
| message | text | |
| source | text | utm/plan/ref/referrer captured by the site form |
| status | enum | `new`, `contacted`, `quoted`, `won`, `lost` |
| client_id | uuid (fk → clients, nullable) | set when a lead converts |

The `leads` columns intentionally mirror the website quote form
(`src/lib/validation.ts`) and the intake questionnaire, so data flows without
reshaping. `source` is what powers "which ad/page produced this lead."

### `project_notes` (optional)
Simple append-only log: `id`, `project_id`, `author`, `body`, `created_at` — a running
history per project.

---

## Access control (RLS)

- Enable RLS on **every** table (default-deny).
- Add a policy allowing access only to authenticated team members. Simplest v1: a
  single `team_members` allowlist (or a Supabase Auth custom claim / role) and policies
  of the form "row is visible/editable if the requester is an authenticated team
  member." No anonymous read/write ever.
- The website's lead insert uses a **separate, least-privilege path**: either a
  server-side service role used only inside `/api/quote` (never exposed to the browser)
  or a dedicated RPC that can *insert into `leads` only* — it cannot read clients or
  projects. This means the public form can drop off a lead but can't read anything.

---

## Website → dashboard lead flow

The marketing site already has the seam for this. Today `/api/quote` emails the lead
(Resend) and/or the form posts to Formspree. To wire in the dashboard later:

1. In `src/app/api/quote/route.ts`, after validation, insert the payload into the
   Supabase `leads` table using the server-side key (in addition to, or instead of,
   the email step).
2. No front-end change needed — the form already collects and submits the right fields
   including `source`.
3. New leads then appear in the dashboard with status `new`.

This is the main reason the API route exists as a server endpoint rather than a
pure client-side POST: it gives a private place to add the DB write without exposing
credentials.

---

## Suggested screens (v1)

1. **Leads** — table sorted by newest, filter by status; click to view and change
   status or convert to a client.
2. **Clients** — list + detail (contact info, their projects).
3. **Projects** — board or table grouped by status; the day-to-day "what's in flight"
   view.
4. **Dashboard home** — counts: new leads this week, active projects by stage,
   upcoming launches.

---

## Build phases

- **Phase 0 (now):** ship the marketing site. Log leads/clients in a spreadsheet.
- **Phase 1:** create the Supabase project, the three tables, RLS policies, and auth.
  Point `/api/quote` at the `leads` table.
- **Phase 2:** build the read-only dashboard screens (leads, clients, projects).
- **Phase 3:** add editing (status changes, lead→client conversion, notes).
- **Later (only if needed):** invoicing, client portal, file storage, automations.

Estimated effort for Phases 1–3 is small — a few focused days — precisely because the
data model is intentionally minimal and the site already produces clean lead data.
