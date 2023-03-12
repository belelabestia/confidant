import { component$ } from "@builder.io/qwik";

export const LinkList = component$(({ links }: { links: string[] }) => (
  <ul>
    {links.map((l) => (
      <li>
        <a href={encodeURI(l)}>{l}</a>
      </li>
    ))}
  </ul>
));
