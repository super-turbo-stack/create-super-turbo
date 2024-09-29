import { logger } from "@/utils/logger";

export const getStartedMessage = ({
  packageManager,
  turboRepoName,
  install,
}: {
  packageManager: "yarn" | "npm" | "pnpm";
  turboRepoName: string;
  install: boolean;
}) => {
  logger.success("Now, to get started");
  console.log();

  let step = 1;

  if (turboRepoName !== ".") {
    logger.info(`${step++}. cd ${turboRepoName}`);
  }

  if (!install) {
    if (packageManager === "pnpm" || packageManager === "npm")
      logger.info(`${step++}. ${packageManager} install`);
    else logger.info(`${step++}. yarn `);
  }

  if (packageManager === "pnpm" || packageManager === "npm")
    logger.info(`${step++}. ${packageManager} run dev`);
  else logger.info(`${step++}. yarn dev`);

  console.log();

  logger.success("Happy coding!!");
};
