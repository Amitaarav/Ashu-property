import { z } from "zod";

export const requirements = ["Buy", "Sell", "Rent", "Invest"] as const;
export const propertyTypes = ["Residential", "Commercial", "Plot"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").or(z.literal("")),
  requirement: z.enum(requirements),
  propertyType: z.enum(propertyTypes),
  budget: z.string().trim().max(40).optional(),
  location: z.string().trim().max(80).optional(),
  message: z.string().trim().max(500).optional(),
  company: z.string().max(0).optional(), // honeypot: real users leave it empty
});

export type LeadInput = z.infer<typeof leadSchema>;
