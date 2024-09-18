#!/usr/bin/env node
import fs from "fs-extra";
import { runCli } from "@/runCli";
import { logger } from "@/utils/logger";
import { renderTitle } from "@/utils/renderTitle";

async function main() {
  try {
    renderTitle();
    const {
      turboRepoName,
      language,
      packageManager,
      next,
      react,
      express,
      git,
      install,
    } = await runCli();
    console.log("in index", {
      turboRepoName,
      git,
      install,
      language,
      packageManager,
      next,
      react,
      express,
    });
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
