#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { runCli } from "./runCli";
import { logger } from "./utils/logger";

const main = async () => {
  const {
    turboRepoName,
    isTS,
    flags: { noGit, noInstall },
    next,
    react,
    express,
    packageManager,
  } = await runCli();
  console.log({
    turboRepoName,
    isTS,
    flags: { noGit, noInstall },
    next,
    react,
    express,
    packageManager,
  });
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});
