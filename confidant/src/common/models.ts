import { z } from "@builder.io/qwik-city";

export const Encrypted = z.object({
  content: z.string(),
  tag: z.string(),
  iv: z.string(),
  salt: z.string(),
});

export const FileName = z.string().regex(/^[a-zA-Z0-9_-]+$/).brand("FileName");

export type Encrypted = z.infer<typeof Encrypted>;
export type FileName = z.infer<typeof FileName>;