import { CliResults } from "@/types/cli";
import * as p from "@clack/prompts";
import { defaultOptions } from "@/types/cli";

export const flagsHelper = async ({
  cliName,
  isExpress,
  isNext,
  isReact,
  isGit,
  isInstall,
}: {
  isReact: boolean;
  isNext: boolean;
  isExpress: boolean;
  cliName: string;
  isGit: boolean;
  isInstall: boolean;
}): Promise<CliResults> => {
  const CliPackageManager = await p.select({
    message: "Which package manager do you want to use?",
    options: [
      { value: "yarn", label: "Yarn" },
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
    ],
    initialValue: "pnpm",
  });
  return {
    turboRepoName: cliName ?? defaultOptions.turboRepoName,
    packageManager: (CliPackageManager as "yarn" | "npm" | "pnpm") ?? "npm",
    react: isReact ? defaultOptions.react : null,
    next: isNext ? defaultOptions.next : null,
    express: isExpress ? defaultOptions.express : null,
    git: isGit ? true : false,
    install: isInstall ? true : false,
  };
};
