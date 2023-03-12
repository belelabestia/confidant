import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { decrypt, encrypt } from "./crypto";
import { Encrypted } from "./encrypted";

export const write = (name: string, content: Encrypted): void => {
  const json = JSON.stringify(content);

  mkdirSync("storage", { recursive: true });
  writeFileSync(filePath(name), json);
};

export const read = (name: string): Encrypted | null => {
  try {
    const fileContent = readFileSync(filePath(name)).toString("utf-8");
    const jsonObject = JSON.parse(fileContent);
    const parseResult = Encrypted.safeParse(jsonObject);

    return parseResult.success ? parseResult.data : null;
  } catch {
    return null;
  }
};

const filePath = (fileName: string) =>
  "storage/" + fileName + ".confidant.json";

export const test = () => {
  const encrypted = encrypt("dad3da", "password");
  write("some_name", encrypted);
  const content = read("some_name");
  console.log(content);

  if (content == null) return;

  const decrypted = decrypt(content, "password");
  console.log(decrypted);
};
