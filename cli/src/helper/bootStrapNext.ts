import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import type { nextApp } from "@/types/packageTypes";
import { logger } from "@/utils/logger";

export const bootStrapNext = ({
  turboRepoName,
  superTurboDir,
  next,
}: {
  turboRepoName: string;
  superTurboDir: string;
  next: nextApp;
}) => {
  const srcDir = path.join(PKG_ROOT, "src/template/base/next");
  const destDir = path.join(superTurboDir, "apps", next.nextName);
  const spinner = ora(
    `Adding ${next.nextName} in ${turboRepoName}...\n`
  ).start();
  fs.copySync(srcDir, destDir);
  fs.renameSync(
    path.join(destDir, "_.json"),
    path.join(destDir, "tsconfig.json")
  );

  const App = turboRepoName === "." ? "App" : chalk.cyan.bold(turboRepoName);
  const nextAppLog = logger.success(next.nextName);

  spinner.succeed(
    `${App} ${chalk.green(`Added ${nextAppLog} successfully!`)}\n`
  );
};
