import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { loader$ } from "@builder.io/qwik-city";
import type { Encrypted } from "$/models";
import { list } from "$/storage";
import { SecretList } from "@/secret-list";

type Store = { data: Encrypted | null };
const store: Store = { data: null };

export const useSecretList = loader$(() => list());

export default component$(() => {
  const secrets = useSecretList();
  return (
    <>
      <SecretList secrets={secrets.value} />
    </>
  );
});

export const head: DocumentHead = { title: "Confidant - tell me anything" };
