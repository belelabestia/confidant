import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { action$, Form, loader$, z, zod$ } from "@builder.io/qwik-city";
import type { Encrypted } from "$/models";
import { decrypt, encrypt } from "$/crypto";
import { test } from "$/storage";

type Store = { data: Encrypted | null };
const store: Store = { data: null };

export const save = loader$(() => {
  test();

  console.log("route loader");
  const data = encrypt("ciaone", "password");
  store.data = data;
  return data;
});

export const read = action$(({ password }) => {
  console.log("route action");
  if (store.data === null) return null;
  return { content: decrypt(store.data, password) };
}, zod$({ password: z.string() }));

export default component$(() => {
  const s = save();
  const r = read();

  return (
    <>
      <button onClick$={() => r.run({ password: "password" })}>Run</button>
      <Form action={r}>
        <input name="password" />
        <pre>{JSON.stringify(s.value, null, "  ")}</pre>
        <pre>
          Dio {JSON.stringify(r.value)} - {r.status} -{" "}
          {r.isRunning ? "running" : "idle"}
        </pre>
        <button type="submit">Read</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = { title: "Confidant - tell me anything" };
