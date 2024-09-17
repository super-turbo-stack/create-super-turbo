#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { runCli } from "@/runCli";
import { logger } from "@/utils/logger";

async function main() {
  try {
    const {
      turboRepoName,
      flags: { noGit, noInstall, default: boolean },
      isTS,
      packageManager,
      next,
      react,
      express,
    } = await runCli();
    // Your implementation here
  } catch (err) {
    logger.error("Aborting installation...");
    if (err instanceof Error) {
      logger.error(err.message);
    } else {
      logger.error(
        "An unknown error has occurred. Please open an issue on github with the below:",
      );
      console.log(err);
    }
    process.exit(1);
  }
}

main();
// process.on("SIGINT", () => {
//   logger.info("\nOperation canceled by user. Exiting...");
//   process.exit(1);
// });
