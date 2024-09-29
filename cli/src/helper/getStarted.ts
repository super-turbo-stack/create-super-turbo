import { logger } from "@/utils/logger";

export const getStartedMessage = ({
  turboRepoName,
  install,
}: {
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
    logger.info(`${step++}. pnpm install`);
  }

  logger.info(`${step++}. pnpm run dev`);

  console.log();

  logger.success("Happy coding!!");
};
