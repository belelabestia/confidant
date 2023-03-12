import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { decrypt, encrypt } from "./crypto";
import { Encrypted, FileName } from "./models";

export const list = (): FileName[] => {
  try {
    const files = readdirSync("storage");
    return files.map((f) => FileName.parse(f.split(".")[0]));
  } catch {
    return [];
  }
};

export const write = (name: FileName, content: Encrypted): void => {
  const json = JSON.stringify(content);

  mkdirSync("storage", { recursive: true });
  writeFileSync(filePath(name), json);
};

export const read = (name: FileName): Encrypted | null => {
  try {
    const fileContent = readFileSync(filePath(name)).toString("utf-8");
    const jsonObject = JSON.parse(fileContent);
    const parseResult = Encrypted.safeParse(jsonObject);

    return parseResult.success ? parseResult.data : null;
  } catch {
    return null;
  }
};

const filePath = (fileName: FileName) =>
  "storage/" + fileName + ".confidant.json";

export const test = () => {
  const encrypted = encrypt("dad3da", "password");
  write(FileName.parse("some_name0"), encrypted);
  write(FileName.parse("some_name1"), encrypted);
  write(FileName.parse("some_name2"), encrypted);
  write(FileName.parse("some_name3"), encrypted);
  const content = read(FileName.parse("some_name"));
  console.log(content);

  if (content == null) return;

  const decrypted = decrypt(content, "password");
  console.log(decrypted);

  const files = list();
  console.log(files);
};
