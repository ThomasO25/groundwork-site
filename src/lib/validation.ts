import { z } from "zod";

/**
 * Shared quote-request schema. Used by BOTH the client form (instant feedback)
 * and the server route (authoritative validation). Never trust the client.
 */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can reach you at.")
    .max(25)
    .regex(/^[0-9()+\-.\s]+$/, "Use digits and phone symbols only."),
  industry: z.string().trim().max(60).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Where the lead came from (utm/referrer). Useful for tracking, never shown.
  source: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
