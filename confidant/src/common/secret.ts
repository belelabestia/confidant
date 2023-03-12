import { decrypt, encrypt } from "./crypto";
import { FileName } from "./models";
import { read, write } from "./storage";

export const getSecret = (id: FileName, password: string): string | null => {
  const encrypted = read(id);
  if (encrypted === null) return null;
  return decrypt(encrypted, password);
};

export const saveSecret = (id: FileName, content: string, password: string) => {
  const encrypted = encrypt(content, password);
  write(id, encrypted);
};
