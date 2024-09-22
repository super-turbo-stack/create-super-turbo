#!/usr/bin/env node
import fs from "fs-extra";
import { runCli } from "@/runCli";
import { logger } from "@/utils/logger";
import { renderTitle } from "@/utils/renderTitle";
import { bootStrapTurbo } from "@/helper/bootStrapTurbo";
import path from "path";
import { getUserPackageManager } from "./utils/getUserPackageManager";
import { bootStrapApps } from "./helper/bootStrapApps";
import { InstallPackages } from "./installer";

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
        templateCompilationProps: {},
      });
    }
    //install react packages

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

    //install next packages

    //copy express app to /apps
    if (express) {
      await bootStrapApps({
        turboRepoName,
        superTurboDir,
        type: "express",
        app: express,
        templateCompilationProps: {},
      });
    }

    await InstallPackages({ packageManager, next, react, express, destDir });

    //git init if git is true
    //install express packages
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
