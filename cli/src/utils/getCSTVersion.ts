import path from 'path';
// import fs from "fs-extra";
// import { type PackageJson } from "type-fest";

// import { PKG_ROOT } from "~/consts.js";

//TODO: get version from package.json

export const getVersion = () => {
  // const packageJsonPath = path.join(PKG_ROOT, "package.json");

  // const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  // return packageJsonContent.version ?? "1.0.0";
  return '1.0.0';
};
