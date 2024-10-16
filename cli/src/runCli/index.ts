import { Command } from "commander";
import * as p from "@clack/prompts";
import { validateAppName } from "@/utils/validateAppName";
import { CliResults, defaultOptions } from "@/types/cli";
import { logger } from "@/utils/logger";
import { CREATE_SUPER_TURBO } from "@/const";
import { PackageManager } from "@/utils/getUserPackageManager";
import { checkConflictingAppNames } from "@/helper/checkConflictingAppNames";
import { flagsHelper } from "@/helper/flagsHelper";
import chalk from "chalk";
import { isPackageManagerInstalled } from "@/helper/install";
import { getCSTVersion } from "@/helper/getCSTVersion";

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;
  const program = new Command();
  program
    .name(CREATE_SUPER_TURBO)
    .description(
      "CLI tool to setup TurboRepo with Apps and Packages blazingly fast"
    )
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "--react [reactApps]",
      "Add React App(s) to your Super Turbo. Use without a value for one app, or specify a number for multiple apps.",
      false
    )
    .option(
      "--next [nextApps]",
      "Add Next App(s) to your Super Turbo. Use without a value for one app, or specify a number for multiple apps.",
      false
    )
    .option(
      "--express [expressApps]",
      "Add Express App(s) to your Super Turbo. Use without a value for one app, or specify a number for multiple apps.",
      false
    )
    .option("--pnpm", "Use pnpm Workspaces", false)
    .option("--yarn", "Use yarn Workspaces", false)
    .option("--npm", "Use npm Workspaces", false)
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new super-turbo-app",
      false
    )
    .version(getCSTVersion(), "-v, --version", "Display the version number");

  program.parse(process.argv);
  const cliProvidedName = program.args[0];

  if (cliProvidedName) {
    cliResults.turboRepoName = cliProvidedName;
  }

  const cliFlags = program.opts();
  let cliPackageManager: "npm" | "yarn" | "pnpm" | null = null;
  if (cliFlags.pnpm || cliFlags.yarn || cliFlags.npm) {
    let selected = 0;
    selected =
      (cliFlags.pnpm === true ? 1 : 0) +
      (cliFlags.yarn === true ? 1 : 0) +
      (cliFlags.npm === true ? 1 : 0);
    if (selected > 1) {
      cliPackageManager = "npm";
    } else {
      cliPackageManager = cliFlags.pnpm
        ? "pnpm"
        : cliFlags.yarn
          ? "yarn"
          : "npm";
    }
  }

  if (cliFlags.default) {
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
        if (installationResult === "npm") cliPackageManager = "npm";
        else {
          logger.info(
            `To install ${cliPackageManager} run: npm install -g ${cliPackageManager}`
          );
          logger.info("Install the package manager and try again!");
          process.exit(1);
        }
      }
    }
    return {
      ...cliResults,
      packageManager: cliPackageManager ?? "npm",
      git: cliFlags.noGit ? false : defaultOptions.git,
      install: cliFlags.noInstall ? false : defaultOptions.install,
    };
  }

  if (cliFlags.react || cliFlags.next || cliFlags.express) {
    const result = await flagsHelper({
      cliPackageManager,
      cliName: cliProvidedName,
      isReact: cliFlags.react,
      isNext: cliFlags.next,
      isExpress: cliFlags.express,
      isGit: cliFlags.noGit ? false : true,
      isInstall: cliFlags.noInstall ? false : true,
    });
    return result;
  }

  const project = await p.group(
    {
      ...(!cliProvidedName && {
        turboRepoName: () =>
          p.text({
            message: "What will your project be called?",
            defaultValue: cliProvidedName,
            validate: validateAppName,
          }),
      }),

      packageManager: async ({ results }: { results: any }) => {
        let result;
        if (cliPackageManager === null) {
          result = await p.select({
            message: "Which workspace do you want to use?",
            options: [
              { value: "yarn", label: "yarn workspaces" },
              { value: "npm", label: "npm workspaces" },
              { value: "pnpm", label: "pnpm workspaces" },
            ],
            initialValue: "pnpm",
          });
        } else {
          result = cliPackageManager;
        }
        const ispkgManagerInstalled = await isPackageManagerInstalled(
          result as PackageManager
        );
        if (!ispkgManagerInstalled) {
          const installationResult = await p.select({
            message: `${result.toString()} is not installed`,
            options: [
              { value: "npm", label: "Use npm Workspaces instead" },
              {
                value: "abort",
                label: `Exit Setup (Install ${result.toString()} and then try again)`,
              },
            ],
          });
          if (p.isCancel(installationResult)) process.exit(0);
          if (installationResult === "npm") {
            return "npm";
          }
          if (installationResult === "abort") {
            logger.warn("Aborting installation...");
            logger.info(
              `To install ${result.toString()} run: npm install -g ${result.toString()}`
            );
            process.exit(1);
          }
        }

        if (result === "pnpm") {
          p.log.success(
            chalk.green(
              "Great Choice! Installation with pnpm will be Superrrr Fast! 🏎️💨"
            )
          );
        }
        return result;
      },

      react: () => {
        return p.confirm({
          message: "Do you want to add a React app in your Super Turbo?",
          initialValue: true,
        });
      },
      reactName: ({ results }: { results: any }) =>
        results.react
          ? p.text({
              message: "What will your React App be called?",
              defaultValue: "react-app",
              validate: validateAppName,
            })
          : p.log.info("Skipping React App"),

      reactDependencies: ({ results }: { results: any }) => {
        if (results.react === false) return;
        return p.multiselect({
          message:
            "Select the Dependencies you will be using in React App (Press <space> to select)",
          options: [
            {
              value: "tanstackQuery",
              label: "tanstack Query (React Query)",
            },
            { value: "recoil", label: "Recoil" },
            { value: "shadcnTailwind", label: "Shadcn-ui(Tailwind included)" },
            { value: "tailwind", label: "tailwind" },
            { value: "reactRouter", label: "Reactrouter" },
          ],
          required: false,
        });
      },
      next: () => {
        return p.confirm({
          message: "Do you want to add a Next app in your Super Turbo?",
          initialValue: true,
        });
      },
      nextName: ({ results }: { results: any }) =>
        results.next
          ? p.text({
              message: "What will your Next App be called?",
              defaultValue: "next-app",
              validate: validateAppName,
            })
          : p.log.info("Skipping Next App"),
      nextDependencies: ({ results }: { results: any }) => {
        if (results.next === false) return;
        return p.multiselect({
          message:
            "Select the Dependencies you will be using in Next App (Press <space> to select)",
          options: [
            { value: "nextAuth", label: "NextAuth" },
            {
              value: "tanstackQuery",
              label: "tanstack Query (React Query)",
            },
            { value: "recoil", label: "Recoil" },
            { value: "tailwind", label: "tailwind" },
            { value: "shadcnTailwind", label: "Shadcn-ui(Tailwind included)" },
            { value: "prisma", label: "Prisma" },
          ],
          required: false,
        });
      },
      express: () => {
        return p.confirm({
          message: "Do you want to add an Express app in your Super Turbo? ",
          initialValue: true,
        });
      },
      expressName: ({ results }: { results: any }) =>
        results.express
          ? p.text({
              message: "What will your Express App be called?",
              defaultValue: "express-app",
              validate: validateAppName,
            })
          : p.log.info("Skipping Express App"),
      expressDependencies: ({ results }: { results: any }) => {
        if (results.express === false) return;
        return p.multiselect({
          message:
            "Select the Dependencies you will be using in Express App  (Press <space> to select)",
          options: [
            { value: "prisma", label: "Prisma" },
            { value: "cors", label: "CORS" },
          ],
          required: false,
        });
      },
      ...(!cliFlags.noGit && {
        git: () => {
          return p.confirm({
            message:
              "Should we initialize a Git repository and stage the changes?",
          });
        },
      }),
      ...(!cliFlags.noInstall && {
        install: ({ results }: { results: any }) => {
          return p.confirm({
            message: `Should we run ${results.packageManager} installer`,
          });
        },
      }),
    },
    {
      onCancel: () => {
        logger.info("Operation cancelled.");
        process.exit(0);
      },
    }
  );
  if (!project.reactDependencies) project.reactDependencies = [];
  if (!project.nextDependencies) project.nextDependencies = [];
  if (!project.expressDependencies) project.expressDependencies = [];

  const { expressName, nextName, reactName } = checkConflictingAppNames({
    reactName: project.reactName,
    expressName: project.expressName,
    nextName: project.nextName,
  });

  return {
    turboRepoName: project.turboRepoName ?? cliResults.turboRepoName,
    packageManager: project.packageManager as "yarn" | "npm" | "pnpm",
    // language: project.language as "typescript" | "javascript",
    git: cliFlags.noGit ? false : (project.git as boolean),
    install: cliFlags.noInstall ? false : (project.install as boolean),
    reactApps: 0,
    nextApps: 0,
    expressApps: 0,
    react: !project.react
      ? null
      : {
          reactName: reactName,
          reactDependencies: {
            reactRouter: project.reactDependencies.includes("reactRouter")
              ? true
              : false,
            tailwind:
              project.reactDependencies.includes("tailwind") ||
              project.reactDependencies.includes("shadcnTailwind")
                ? true
                : false,
            shadcnTailwind: project.reactDependencies.includes("shadcnTailwind")
              ? true
              : false,
            recoil: project.reactDependencies.includes("recoil") ? true : false,
            tanstackQuery: project.reactDependencies.includes("tanstackQuery")
              ? true
              : false,
          },
        },
    next: !project.next
      ? null
      : {
          nextName: nextName,
          nextDependencies: {
            nextAuth: project.nextDependencies.includes("nextAuth")
              ? true
              : false,
            tailwind:
              project.nextDependencies.includes("tailwind") ||
              project.nextDependencies.includes("shadcnTailwind")
                ? true
                : false,
            shadcnTailwind: project.nextDependencies.includes("shadcnTailwind")
              ? true
              : false,
            recoil: project.nextDependencies.includes("recoil") ? true : false,
            tanstackQuery: project.nextDependencies.includes("tanstackQuery")
              ? true
              : false,
            prisma: project.nextDependencies.includes("prisma") ? true : false,
          },
        },
    express: !project.express
      ? null
      : {
          expressName: expressName,
          expressDependencies: {
            prisma: project.expressDependencies.includes("prisma")
              ? true
              : false,
            cors: project.expressDependencies.includes("cors") ? true : false,
          },
        },
  };
};
