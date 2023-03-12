import { z } from "@builder.io/qwik-city";

export const Encrypted = z.object({
  content: z.string(),
  tag: z.string(),
  iv: z.string(),
  salt: z.string(),
});

export type Encrypted = z.infer<typeof Encrypted>;
