import { CliResults } from "@/types/cli";
import * as p from "@clack/prompts";
import { defaultOptions } from "@/types/cli";
import { isPackageManagerInstalled } from "./install";
import { PackageManager } from "@/utils/getUserPackageManager";
import { logger } from "@/utils/logger";

export const flagsHelper = async ({
  cliName,
  isExpress,
  isNext,
  isReact,
  isGit,
  isInstall,
  cliPackageManager,
}: {
  isReact: boolean;
  isNext: boolean;
  isExpress: boolean;
  cliName: string;
  isGit: boolean;
  isInstall: boolean;
  cliPackageManager: string | null;
}): Promise<CliResults> => {
  let SelectedPackageManager;
  if (cliPackageManager !== null) {
    const ispkgManagerInstalled = await isPackageManagerInstalled(
      cliPackageManager as PackageManager
    );
    if (!ispkgManagerInstalled) {
      const installationResult = await p.select({
        message: `${cliPackageManager} is not installed`,
        options: [
          { value: "npm", label: "Use npm Workspaces instead" },
          {
            value: "abort",
            label: `Exit Setup (Install ${cliPackageManager} and then try again)`,
          },
        ],
      });
      if (installationResult === "npm") {
        cliPackageManager = "npm";
      } else {
        logger.warn("Aborting installation...");
        logger.info(
          `To install ${cliPackageManager} run: npm install -g ${cliPackageManager}`
        );
        process.exit(1);
      }
    }
  } else {
    SelectedPackageManager = await p.select({
      message: "Which package manager do you want to use?",
      options: [
        { value: "yarn", label: "Yarn" },
        { value: "npm", label: "npm" },
        { value: "pnpm", label: "pnpm" },
      ],
      initialValue: "npm",
    });
  }
  return {
    turboRepoName: cliName ?? defaultOptions.turboRepoName,
    packageManager: cliPackageManager
      ? (cliPackageManager as "yarn" | "npm" | "pnpm")
      : (SelectedPackageManager as "yarn" | "npm" | "pnpm") ?? "npm",
    react: isReact ? defaultOptions.react : null,
    next: isNext ? defaultOptions.next : null,
    express: isExpress ? defaultOptions.express : null,
    git: isGit ? true : false,
    install: isInstall ? true : false,
  };
};
