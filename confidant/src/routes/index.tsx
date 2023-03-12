import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { loader$ } from "@builder.io/qwik-city";
import { list } from "$/storage";
import { LinkList } from "@/secret-list";

export const useSecretList = loader$(() => list());

export default component$(() => {
  const secrets = useSecretList();

  return (
    <>
      <LinkList links={secrets.value} />
    </>
  );
});

export const head: DocumentHead = { title: "Confidant - tell me anything" };
