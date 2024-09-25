import { Command } from "commander";
import * as p from "@clack/prompts";
import { validateAppName } from "@/utils/validateAppName";
import { CliResults, defaultOptions } from "@/types/cli";
import { logger } from "@/utils/logger";
import { CREATE_SUPER_TURBO } from "@/const";
import { getUserPackageManager } from "@/utils/getUserPackageManager";
import { checkConflictingAppNames } from "@/helper/checkConflictingAppNames";
import { flagsHelper } from "@/helper/flagsHelper";

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
      "--react",
      "Add React App with React's default options to your Super Turbo",
      false
    )
    .option(
      "--next",
      "Add Next App with Next's default options to your Super Turbo",
      false
    )
    .option(
      "--express",
      "Add Express App with Express's default options to your Super Turbo",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new super-turbo-app",
      false
    )
    .version("1.0.0", "-v, --version", "Display the version number");

  program.parse(process.argv);
  const cliProvidedName = program.args[0];

  if (cliProvidedName) {
    cliResults.turboRepoName = cliProvidedName;
  }

  const cliFlags = program.opts();

  if (cliFlags.default) {
    return cliResults;
  }

  if (cliFlags.react || cliFlags.next || cliFlags.express) {
    const result = await flagsHelper({
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
      packageManager: () => {
        return p.select({
          message: "Which package manager do you want to use?",
          options: [
            { value: "yarn", label: "Yarn" },
            { value: "npm", label: "npm" },
            { value: "pnpm", label: "pnpm" },
          ],
          initialValue: "pnpm",
        });
      },
      // language: () => {
      //   return p.select({
      //     message: "Will you be using TypeScript or JavaScript?",
      //     options: [
      //       { value: "typescript", label: "TypeScript" },
      //       { value: "javascript", label: "JavaScript" },
      //     ],
      //     initialValue: "typescript",
      //   });
      // },
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
          : p.note("Skipping React App"),
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
          : p.note("Skipping Next App"),
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
          : p.note("Skipping Express App"),
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
