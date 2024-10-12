import { logger } from "@/utils/logger";

export const getStartedMessage = ({
  packageManager,
  turboRepoName,
  install,
  prisma,
}: {
  packageManager: "yarn" | "npm" | "pnpm";
  turboRepoName: string;
  install: boolean;
  prisma: boolean;
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

  if (prisma) {
    logger.info(`${step++}. cd packages/db`);
    logger.info(`${step++}. Add DATABASE_URL to .env`);

    if (packageManager === "pnpm" || packageManager === "npm")
      logger.info(`${step++}. ${packageManager} install`);
    else logger.info(`${step++}. yarn `);

    logger.info(`${step++}. npx prisma migrate dev`);
  }

  if (packageManager === "pnpm" || packageManager === "npm")
    logger.info(`${step++}. ${packageManager} run dev`);
  else logger.info(`${step++}. yarn dev`);

  console.log();

  logger.success("Happy coding!!");
};
