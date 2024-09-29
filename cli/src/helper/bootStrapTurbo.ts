import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import { logger } from "@/utils/logger";
import chalk from "chalk";
import * as p from "@clack/prompts";
import { MoveAndCompileTemplate } from "./MoveAndCompileTemplate";
import { start } from "repl";

export async function bootStrapTurbo({
  destDir,
  turboRepoName,
  packageManager,
  templateCompilationProps,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
  turboRepoName: string;
  templateCompilationProps: any;
}): Promise<string> {
  const srcDir = path.join(PKG_ROOT, "src/template/base/turbo");
  console.log("first");
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
          displayPath
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
        spinner.info(`Emptying ${chalk.cyan.bold(displayPath)} \n`);
        fs.emptyDirSync(destDir);
      }
    }
  } else if (!isCurrentDir) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  spinner.start();

  await MoveAndCompileTemplate({ destDir, srcDir, templateCompilationProps });
  if (packageManager !== "pnpm") {
    fs.removeSync(path.join(destDir, "pnpm-workspace.yaml"));
  }

  const App = isCurrentDir ? "App" : chalk.cyan.bold(turboRepoName);

  spinner.succeed();
  return destDir;
}
