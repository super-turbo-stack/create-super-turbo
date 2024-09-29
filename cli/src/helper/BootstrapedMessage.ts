import { logger } from "@/utils/logger";
import chalk from "chalk";

export const BootStappedMessage = ({
  express,
  next,
  react,
  turboRepoName,
  destDir,
}: {
  turboRepoName: string;
  destDir: string;
  next: boolean;
  react: boolean;
  express: boolean;
}) => {
  let logName = chalk.cyan.bold(turboRepoName);
  if (turboRepoName === ".") {
    const appName = destDir.split("/");
    if (appName.length > 1) {
      logName = chalk.cyan.bold(appName[appName.length - 1]);
    } else {
      logName = chalk.cyan.bold("Super Turbo");
    }
  }
  if (next && react && express) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with Next, React and Express apps.`
    );
  } else if (next && react) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with Next and React apps.`
    );
  } else if (next && express) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with Next and Express apps.`
    );
  } else if (react && express) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with React and Express apps.`
    );
  } else if (next) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with Next app.`
    );
  } else if (react) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with React app.`
    );
  } else if (express) {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName} with Express app.`
    );
  } else {
    logger.success(
      `🎉 Congratulations! You have successfully bootstrapped ${logName}`
    );
  }
};
