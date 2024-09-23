import path from "path";
import * as p from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { logger } from "@/utils/logger";
import { exec, execSync } from "child_process";
import { execa } from "@esm2cjs/execa";

const isGitInstalled = (dir: string): boolean => {
  try {
    exec("git --version", { cwd: dir });
    return true;
  } catch (error) {
    return false;
  }
};

export const isRootGitRepo = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, ".git"));
};

export const isInsideGitRepo = async (dir: string): Promise<boolean> => {
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: dir,
      stdout: "ignore",
    });
    return true;
  } catch {
    return false;
  }
};

const getGitVersion = () => {
  const stdout = execSync("git --version").toString().trim();
  const gitVersionTag = stdout.split(" ")[2];
  const major = gitVersionTag?.split(".")[0];
  const minor = gitVersionTag?.split(".")[1];
  return { major: Number(major), minor: Number(minor) };
};

const getDefaultBranch = (): string => {
  try {
    const stdout = execSync("git config --global init.defaultBranch")
      .toString()
      .trim();
    return stdout || "main";
  } catch {
    return "main";
  }
};

export const createGitRepo = async (dir: string) => {
  logger.info("Creating git repo...");

  if (!isGitInstalled(dir)) {
    logger.error("Git is not installed. Please install git and try again.");
    return;
  }

  const spinner = ora("Creating git repo...").start();

  const isRoot = isRootGitRepo(dir);
  const isInside = await isInsideGitRepo(dir);
  const dirName = path.parse(dir).name;

  if (isInside && isRoot) {
    spinner.stop();
    const overwriteGit = await p.confirm({
      message: `${chalk.redBright.bold(
        "Warning:"
      )} Git is already initialized in "${dirName}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
      initialValue: false,
    });

    if (!overwriteGit) {
      spinner.info("Skipping Git initialization.");
      return;
    }
    // Deleting the .git folder
    fs.removeSync(path.join(dir, ".git"));
  } else if (isInside && !isRoot) {
    // Dir is inside a git worktree
    spinner.stop();
    const initializeChildGitRepo = await p.confirm({
      message: `${chalk.redBright.bold(
        "Warning:"
      )} "${dirName}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
      initialValue: false,
    });
    if (!initializeChildGitRepo) {
      spinner.info("Skipping Git initialization.");
      return;
    }
  }

  try {
    const branchName = getDefaultBranch();

    // --initial-branch flag was added in git v2.28.0
    const { major, minor } = getGitVersion();
    if (major < 2 || (major == 2 && minor < 28)) {
      await execa("git", ["init"], { cwd: dir });
      await execa("git", ["symbolic-ref", "HEAD", `refs/heads/${branchName}`], {
        cwd: dir,
      });
    } else {
      await execa("git", ["init", `--initial-branch=${branchName}`], {
        cwd: dir,
      });
    }
    await execa("git", ["add", "."], { cwd: dir });
    spinner.succeed(
      `${chalk.green("Successfully initialized and staged")} ${chalk.green.bold(
        "git"
      )}\n`
    );
  } catch (error) {
    spinner.fail(
      `${chalk.bold.red(
        "Failed:"
      )} could not initialize git. Update git to the latest version!\n`
    );
  }
};
