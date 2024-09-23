#!/usr/bin/env node
import path from "path";
import { runCli } from "@/runCli";
import { logger } from "@/utils/logger";
import { renderTitle } from "@/utils/renderTitle";
import { bootStrapTurbo } from "@/helper/bootStrapTurbo";
import { bootStrapApps } from "./helper/bootStrapApps";
import { InstallPackages } from "./installer";
import { createGitRepo } from "./helper/git";
import { installDependencies } from "./helper/install";

async function main() {
  try {
    renderTitle();
    const {
      turboRepoName,
      packageManager,
      next,
      react,
      express,
      git,
      install,
    } = await runCli();
    console.log({
      turboRepoName,
      packageManager,
      next,
      react,
      express,
      git,
      install,
    });

    const destDir = path.join(process.cwd(), turboRepoName);

    //Copy the Turbo-base to user's dir
    const superTurboDir = await bootStrapTurbo({
      destDir,
      packageManager,
      turboRepoName,
      templateCompilationProps: {
        props: {
          turboRepoName,
          packageManager,
        },
      },
    });

    //copy react app to /apps
    if (react) {
      await bootStrapApps({
        turboRepoName,
        superTurboDir,
        type: "react",
        app: react,
        templateCompilationProps: {
          props: {
            packageManager,
            react,
          },
        },
      });
    }

    //copy next app to /apps
    if (next) {
      await bootStrapApps({
        turboRepoName,
        superTurboDir,
        type: "next",
        app: next,
        templateCompilationProps: {
          props: {
            packageManager,
            next,
          },
        },
      });
    }

    //copy express app to /apps
    if (express) {
      await bootStrapApps({
        turboRepoName,
        superTurboDir,
        type: "express",
        app: express,
        templateCompilationProps: {
          props: {
            packageManager,
            express,
          },
        },
      });
    }

    await InstallPackages({ packageManager, next, react, express, destDir });

    if (git) {
      await createGitRepo(destDir);
    }

    if (install) {
      await installDependencies({ projectDir: destDir });
    }
  } catch (err) {
    logger.error("Aborting installation...");
    if (err instanceof Error) {
      logger.error(err.message);
    } else {
      logger.error(
        "An unknown error has occurred. Please open an issue on github with the below:"
      );
      console.log(err);
    }
    process.exit(1);
  }
}

main();
