# Payments Setup — Square

How Groundwork gets paid. **Nothing in this document is implemented in the
website code, and nothing here belongs in the code.** No API keys, no account
IDs, no checkout button, no payment form, no stored card details — the site never
touches money.

The website's only job is to get a good enquiry. Everything below happens in
**Square**, by hand, after a project has been agreed.

> **Contains no private account information or secret keys.** Don't add any.

---

## 1. Create the Square account

1. Go to **squareup.com** and create a free account under the business name.
2. Complete the identity and business verification (name, address, tax details).
3. Link the bank account that should receive payouts.
4. Turn on two-factor authentication. This account can move money — treat it like
   online banking.
5. Set the business name, logo, and reply-to email in **Account & Settings →
   Business** so estimates and invoices look like they came from Groundwork and
   not from a stranger.

**Cost:** Square's Invoices plan is free to use. You pay a per-transaction
processing fee, taken from each payment. There is no monthly fee on the free plan.

---

## 2. Create an estimate

Use an estimate when the client has seen the website plan and wants a formal
number, but hasn't signed off yet.

1. Square Dashboard → **Invoices → Estimates → Create estimate**.
2. Add the client's name and email.
3. Add one line item per deliverable, mirroring the written scope exactly. If the
   scope says "up to 6 pages", the estimate says "up to 6 pages".
4. Set an expiry date (30 days is sensible — it stops an old number haunting you).
5. Send it. The client can accept it in one click, which converts it to an invoice.

**Rule:** the estimate must never contain anything the written scope doesn't.
The estimate *is* the scope, with a number attached.

---

## 3. Send the agreement / contract

Square can attach files to estimates and invoices, but it is **not** a contract
tool and it does not give you a legally reviewed agreement.

1. Keep a plain-English project agreement covering: scope, revision rounds,
   timeline, payment schedule, what happens if the client goes quiet, ownership
   of the finished site, and what's explicitly out of scope.
2. **Have it reviewed once by a lawyer.** One review covers every project after it.
3. Send it for signature (Square doesn't do e-signature — use any e-sign tool, or
   a countersigned PDF) **and** attach a copy to the Square estimate so the
   numbers and the terms travel together.
4. Don't start work until it's signed **and** the deposit has cleared.

---

## 4. Deposit and balance invoices

Square supports **milestone/split invoices**, which is exactly the model here.

1. Convert the accepted estimate into an invoice.
2. Choose **split into multiple payments** (Square calls these instalments).
3. Set the schedule to match the written proposal, for example:
   - **Deposit** — due on acceptance. Work starts when it clears.
   - **Balance** — due on launch, or split across agreed milestones on larger builds.
4. Set a due date on every instalment. "Due on receipt" with no date is how
   invoices get forgotten.
5. Turn on automatic reminders (before due, on due, after due). This one setting
   collects more money than any amount of chasing.

**Never start the build before the deposit clears.** Not "is sent" — *clears*.

---

## 5. Enable card and bank-transfer (ACH) payments

1. Square Dashboard → **Settings → Payments**.
2. Enable **Card payments** (credit/debit).
3. Enable **ACH bank transfer**. This matters: ACH is a flat, low fee, while card
   fees are a percentage. On a $2,500 invoice the difference is real money.
4. Send a **test invoice to yourself** and pay it both ways before you ever send
   one to a client (see §12).

**Do not add surcharges or "processing fees" to client invoices.** In several US
states card surcharging is restricted or illegal, the rules differ by state, and
it reads as nickel-and-diming to exactly the kind of local business you're trying
to win. Price the fee into the project instead.

⚠️ **Until this is done and tested, the website must not say which payment methods
are accepted.** See §10.

---

## 6. Recurring invoices for Website Care

Website care ($75/month and up) should be a **recurring invoice series**, not a
subscription the customer can't see.

1. Square Dashboard → **Invoices → Create invoice → Recurring**.
2. Set the frequency (monthly) and the start date.
3. **Only** enable "save card on file" / automatic charging if the customer has
   explicitly authorised it — see below.
4. Send the first one manually so the customer sees exactly what they're agreeing to.

### Card-on-file requires real authorisation

Storing a customer's card or bank details for automatic charging is not something
you can do because it's convenient. You need their explicit, recorded consent to
store the payment method and charge it on a schedule — Square will prompt for this,
and the customer must complete it themselves.

**Never** enter a customer's card details on their behalf. If they want automatic
billing, they authorise it through Square's own flow. If they'd rather pay each
invoice manually, that's fine — care is optional anyway, and so is autopay.

---

## 7. Why there is no public checkout button

A "Buy Now" or "Pay $750" button on the website would be wrong for this business:

- **Nothing here is a fixed-price product.** Every price is a *starting* price.
  A checkout button implies a product that ships at a fixed price, and this
  business sells scoped work.
- **It skips the scope.** Someone could pay $750 for a project that was always
  going to cost $2,000, and now you're either eating the difference or having an
  ugly conversation with someone who has already paid.
- **It attracts the wrong buyer** — people who want to skip the conversation are
  the ones who most need it.
- **It's a compliance surface** you don't need. No checkout means no cart, no
  refund flow, no chargeback exposure from strangers.

The site's job ends at the enquiry. **Money moves only after a scope is agreed.**

---

## 8. Why each customer gets their own invoice

Never publish a generic "pay here" link.

- An individual invoice is **tied to a specific person, scope, and amount**. It's
  a record of what was agreed.
- A generic link is payable by anyone, for any amount, with no scope attached —
  which is useless as a record and a gift to fraud.
- Square's invoices produce a clean audit trail: sent, viewed, paid, with dates.
  You will want that trail at tax time, and badly if a payment is ever disputed.

Each client receives **their own secure invoice link, by email, after they've
agreed to the project.**

---

## 9. Customer authorisation for saved payment methods

Repeating this because getting it wrong is the expensive kind of mistake:

- A saved card or bank account for recurring care **requires the customer's
  explicit authorisation**, captured through Square.
- Groundwork must **never** store card numbers, bank details, or CVVs anywhere —
  not in a spreadsheet, not in a CRM, not in a note, and *certainly* not in this
  codebase.
- The website has **no payment form and no payment fields**. That is deliberate,
  and it should stay that way. If card data never touches your systems, it can
  never leak from them.

---

## 10. What the site may safely say — and when

**Safe to display right now** (already live on `/pricing` and in the FAQ):

> "After the project scope is approved, you'll receive a written agreement and a
> secure invoice. Projects normally begin with a deposit, and the remaining payment
> schedule is listed clearly in the proposal."

> "Optional website care is billed as a recurring invoice, and only after you've
> authorised it."

**Gated until Square is live and tested.** This line is already written into the
code but is **hidden**:

> "Card and bank-transfer payment options are available."

To turn it on, once §5 and §12 are genuinely done:

```ts
// src/config/site.ts
payments: {
  methodsConfirmed: true,   // ← flip this
  depositNote: "",
}
```

**Never display:** financing, buy-now-pay-later, "0% interest", a specific deposit
percentage (unless you set `depositNote`), processing surcharges, or any claim
that a payment method works before you've taken a test payment through it.

---

## 11. Configure outside the codebase

None of this is in the repository, and none of it should be:

- [ ] Square account created and verified
- [ ] Bank account linked, payouts tested
- [ ] Two-factor authentication on
- [ ] Business name, logo, and reply-to email set in Square
- [ ] Project agreement drafted **and reviewed by a lawyer**
- [ ] E-signature method chosen
- [ ] Card payments enabled
- [ ] **ACH bank transfer enabled** (this is the one people forget, and it's the cheapest)
- [ ] Invoice reminder schedule configured
- [ ] Recurring invoice template built for Website Care
- [ ] Test invoice paid and refunded (§12)
- [ ] `payments.methodsConfirmed` flipped to `true` in `src/config/site.ts` — **only after all of the above**

---

## 12. Test-invoice checklist

Do this before a single real client sees an invoice.

- [ ] Send a **$1 test invoice** to your own personal email
- [ ] It arrives, isn't in spam, and the business name and logo look right
- [ ] Pay it with a **card** → confirm it marks as paid
- [ ] Send a second $1 invoice → pay by **ACH bank transfer** → confirm it clears
      (ACH takes a few days; this is worth knowing *before* a client asks why the
      project hasn't started)
- [ ] Check the payout actually lands in the bank account
- [ ] **Refund** one of them → confirm the refund flow works and how long it takes
- [ ] Create a **split/milestone invoice** → confirm the deposit and balance
      instalments behave as expected
- [ ] Create a **recurring invoice** → confirm the schedule and the authorisation prompt
- [ ] Confirm automatic reminders fire
- [ ] Note the exact fee taken on each method, so you can price it in

Only when every box is ticked should the website say a word about payment methods.
