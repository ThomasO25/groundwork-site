import { z } from "zod";

/**
 * Shared quote-request schema. Used by BOTH the client form (instant feedback)
 * and the server route (authoritative validation). Never trust the client.
 *
 * Required to send: name, business, what they need help with, and AT LEAST ONE
 * way to reply (email or phone). Everything else is optional — we don't force a
 * business owner to pick a budget before we've even spoken.
 */
export const quoteSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(80),
    business: z.string().trim().min(1, "Please enter your business name.").max(120),

    // One of these two is required — enforced in superRefine below.
    email: z
      .string()
      .trim()
      .max(160)
      .email("Enter a valid email address.")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .max(25)
      .regex(/^[0-9()+\-.\s]{7,}$/, "Enter a phone number we can reach you on.")
      .optional()
      .or(z.literal("")),

    /** Their current website, if they have one. */
    website: z.string().trim().max(200).optional().or(z.literal("")),

    /** "What would you like help with?" — the only long-form question up front. */
    help: z
      .string()
      .trim()
      .min(5, "Tell us a little about what you need.")
      .max(2000),

    // --- Optional extras (progressive step 2) --------------------------------
    industry: z.string().trim().max(60).optional().or(z.literal("")),
    budget: z.string().trim().max(40).optional().or(z.literal("")),
    timeline: z.string().trim().max(60).optional().or(z.literal("")),

    /** Where the lead came from (UTM / plan / referrer). Never shown publicly. */
    source: z.string().trim().max(300).optional().or(z.literal("")),

    /** Honeypot — must stay empty. Bots fill it; humans never see it. */
    company_website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contactMethod"],
        message: "Add an email or a phone number so we can get back to you.",
      });
    }
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
