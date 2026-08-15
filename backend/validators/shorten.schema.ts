import { z } from "zod";

/**
 * Zod validation schema for POST /api/shorten requests.
 * Extracted here so it can be reused by tests, middleware, or other API routes.
 */
export const shortenSchema = z.object({
  /** The original long URL to shorten */
  originalUrl: z.string().url({ message: "Please enter a valid URL (including https://)" }),

  /** Optional custom short code (3–32 alphanumeric + hyphens) */
  customCode: z
    .string()
    .min(3, { message: "Custom alias must be at least 3 characters" })
    .max(32, { message: "Custom alias cannot exceed 32 characters" })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: "Custom alias can only contain letters, numbers, hyphens, and underscores",
    })
    .optional()
    .or(z.literal("")),

  /** Optional plain-text password (will be hashed before storing) */
  password: z.string().min(1).optional().or(z.literal("")),

  /** Optional ISO date string for link expiry */
  expiresAt: z.string().datetime({ offset: true }).optional().or(z.literal("")),
});

/** Inferred TypeScript type for a validated shorten request */
export type ShortenInput = z.infer<typeof shortenSchema>;
