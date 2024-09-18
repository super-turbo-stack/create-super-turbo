import path from "node:path";
import { fileURLToPath } from "node:url";

//const __filename = fileURLToPath(import.meta.url);
const distPath =  path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export  const TITLE = "CREATE SUPER TURBO";

export const CREATE_SUPER_TURBO = "create-super-turbo";
