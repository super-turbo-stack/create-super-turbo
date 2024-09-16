import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
// import { PKG_ROOT } from "@/consts";

//TODO:update path so that the version is fetched from build/package.json

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? "1.0.0";
  return "1.0.0";
};
