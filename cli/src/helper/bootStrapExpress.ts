import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import type { expressApp } from "@/types/packageTypes";
import { logger } from "@/utils/logger";

export const bootStrapExpress = ({
  turboRepoName,
  superTurboDir,
  express,
}: {
  turboRepoName: string;
  superTurboDir: string;
  express: expressApp;
}) => {
  const srcDir = path.join(PKG_ROOT, "src/template/base/express");
  const destDir = path.join(superTurboDir, "apps", express.expressName);
  const spinner = ora(
    `Adding ${express.expressName} in ${turboRepoName}...\n`
  ).start();
  fs.copySync(srcDir, destDir);

  const App = turboRepoName === "." ? "App" : chalk.cyan.bold(turboRepoName);
  const expressAppLog = logger.success(express.expressName);

  spinner.succeed(
    `${App} ${chalk.green(`Added ${expressAppLog} successfully!`)}\n`
  );
};
