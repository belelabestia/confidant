import { FileName } from "$/models";
import { getSecret, saveSecret } from "$/secret";
import { component$ } from "@builder.io/qwik";
import { action$, Form, useLocation, z, zod$ } from "@builder.io/qwik-city";

export const useGetSecret = action$(
  ({ id, password }) => ({ secret: getSecret(id, password) }),
  zod$({
    id: FileName,
    password: z.string(),
  })
);

export const useSaveSecret = action$(
  ({ id, content, password }) => {
    saveSecret(id, content, password);
  },
  zod$({
    id: FileName,
    content: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const loc = useLocation();
  const getSecret = useGetSecret();
  const saveSecret = useSaveSecret();

  return getSecret.value?.secret == null ? (
    <Form action={getSecret} class="flex column">
      <input type="text" name="id" value={loc.params.secret} readOnly />
      <input type="password" name="password" />
      <button type="submit" disabled={getSecret.isRunning}>
        Get secret
      </button>
    </Form>
  ) : (
    <Form action={saveSecret} class="flex column">
      <input type="text" name="id" value={loc.params.secret} readOnly />
      <input type="password" name="password" />
      <textarea name="content" value={getSecret.value.secret} />
      <button type="submit">Save</button>
    </Form>
  );
});
