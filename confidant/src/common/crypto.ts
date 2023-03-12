import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "crypto";
import { Encrypted } from "./encrypted";

const algorithm = "aes-256-gcm";

export const encrypt = (text: string, password: string): Encrypted => {
  const salt = randomBytes(16);
  const key = scryptSync(Buffer.from(password), salt, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    content: encrypted.toString("hex"),
    tag: tag.toString("hex"),
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
  };
};

export const decrypt = (e: Encrypted, password: string): string | null => {
  const iv = Buffer.from(e.iv, "hex");
  const tag = Buffer.from(e.tag, "hex");
  const salt = Buffer.from(e.salt, "hex");
  const key = scryptSync(password, salt, 32);
  const encrypted = Buffer.from(e.content, "hex");
  const decipher = createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(tag);

  try {
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf-8");
  } catch {
    return null;
  }
};
