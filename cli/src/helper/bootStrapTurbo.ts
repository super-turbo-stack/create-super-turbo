import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import { logger } from "@/utils/logger";
import chalk from "chalk";
import * as p from "@clack/prompts";

export async function bootStrapTurbo({
  destDir,
  turboRepoName,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
  turboRepoName: string;
}): Promise<string> {
  const srcDir = path.join(PKG_ROOT, "src/template/base/turbo");
  const spinner = ora(`Creating BoilerPlate in ${destDir}...\n`).start();

  if (fs.existsSync(destDir)) {
    if (fs.readdirSync(destDir).length === 0) {
      if (turboRepoName === ".") {
        spinner.info(logger.info("Creating") as unknown as string);
      }
    } else {
      spinner.stopAndPersist();
      const overwriteDir = await p.select({
        message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
          turboRepoName
        )} already exists and isn't empty. How would you like to proceed?`,
        options: [
          {
            label: "Abort installation (recommended)",
            value: "abort",
          },
          {
            label: "Clear the directory and continue installation",
            value: "clear",
          },
          {
            label: "Continue installation and overwrite conflicting files",
            value: "overwrite",
          },
        ],
        initialValue: "abort",
      });
      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      const overwriteAction =
        overwriteDir === "clear"
          ? "clear the directory"
          : "overwrite conflicting files";

      const confirmOverwriteDir = await p.confirm({
        message: `Are you sure you want to ${overwriteAction}?`,
        initialValue: false,
      });

      if (!confirmOverwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        spinner.info(`Emptying ${chalk.cyan.bold(turboRepoName)} \n`);
        fs.emptyDirSync(destDir);
      }
    }
  }

  spinner.start();

  fs.copySync(srcDir, destDir);
  fs.renameSync(
    path.join(destDir, "_gitignore"),
    path.join(destDir, ".gitignore")
  );

  const App = turboRepoName === "." ? "App" : chalk.cyan.bold(turboRepoName);

  spinner.succeed(`${App} ${chalk.green("Bootstraped successfully!")}\n`);

  return destDir;
}
