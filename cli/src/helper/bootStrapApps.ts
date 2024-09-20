import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import type { expressApp, nextApp, reactApp } from "@/types/packageTypes";
import { logger } from "@/utils/logger";

type Props = {
  turboRepoName: string;
  superTurboDir: string;
} & (
  | { type: "express"; app: expressApp }
  | { type: "next"; app: nextApp }
  | { type: "react"; app: reactApp }
);

export const bootStrapApps = ({
  turboRepoName,
  superTurboDir,
  type,
  app,
}: Props) => {
  let appName: string;
  if (type === "express") appName = app.expressName;
  else if (type === "next") appName = app.nextName;
  else if (type === "react") appName = app.reactName;
  else throw new Error("Invalid type");

  const srcDir = path.join(PKG_ROOT, "src/template/base/express");
  const destDir = path.join(superTurboDir, "apps", appName);
  const spinner = ora(`Adding ${appName} in ${turboRepoName}...\n`).start();
  fs.copySync(srcDir, destDir);

  spinner.succeed(` ${chalk.green(`Added ${appName} successfully!`)}\n`);
};
