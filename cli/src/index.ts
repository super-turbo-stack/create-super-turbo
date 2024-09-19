#!/usr/bin/env node
import fs from "fs-extra";
import { runCli } from "@/runCli";
import { logger } from "@/utils/logger";
import { renderTitle } from "@/utils/renderTitle";
import { bootStrapTurbo } from "@/helper/bootStrapTurbo";
import path from "path";
import { getUserPackageManager } from "./utils/getUserPackageManager";

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
    await bootStrapTurbo({ destDir, packageManager, turboRepoName });

    //git init if git is true

    //copy react app to /apps
    //install react packages

    //copy next app to /apps
    //install next packages

    //copy express app to /apps
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
