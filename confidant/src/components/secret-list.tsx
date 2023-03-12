import { component$ } from "@builder.io/qwik";

export const SecretList = component$(({ secrets }: { secrets: string[] }) => (
  <>
    {secrets.map((s) => (
      <p>{s}</p>
    ))}
  </>
));
