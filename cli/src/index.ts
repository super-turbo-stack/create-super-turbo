#!/usr/bin/env node
import { Command } from "commander";
import * as p from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import { reactApp, nextApp, expressApp } from "./types/packageTypes";
import { getVersion } from "./utils/getCSTVersion";
import { validateAppName } from "./utils/validateAppName";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

interface CliResults {
  turboRepoName: string;
  packageManager: "yarn" | "npm" | "pnpm";
  isTS: boolean;
  react: reactApp;
  next: nextApp;
  express: expressApp;
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  turboRepoName: "my-super-turbo",
  packageManager: "pnpm",
  isTS: true,
  react: {
    name: "react-app",
    dependencies: {
      reactRouter: true,
      recoil: true,
      tailwindShadcn: true,
      tanstackQuery: true,
    },
  },
  next: {
    name: "next-app",
    dependencies: {
      tanstackQuery: true,
      recoil: true,
      tailwindShadcn: true,
      nextAuth: true,
      prisma: true,
    },
  },
  express: {
    name: "express-app",
    dependencies: {
      cors: true,
      express: true,
      prisma: true,
    },
  },
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
  },
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;
  const program = new Command();
  program
    .name("CREATE_SUPER_TURBO")
    .description(
      "CLI tool to setup TurboRepo with Apps and Packages blazingly fast",
    )
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false,
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false,
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new super-turbo-app",
      false,
    )
    .version(getVersion(), "-v, --version", "Display the version number");

  program.parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.turboRepoName = cliProvidedName;
  }

  cliResults.flags = program.opts();
  if (cliResults.flags.default) {
    return cliResults;
  }

  const project = await p.group({
    ...(!cliProvidedName && {
      name: () =>
        p.text({
          message: "What will your project be called?",
          defaultValue: cliProvidedName,
          validate: validateAppName,
        }),
      language: () => {
        return p.select({
          message: "Will you be using TypeScript or JavaScript?",
          options: [
            { value: "typescript", label: "TypeScript" },
            { value: "javascript", label: "JavaScript" },
          ],
          initialValue: "typescript",
        });
      },
      react: () => {
        return p.confirm({
          message: "Do you want to add a React app in your Super Turbo?",
          initialValue: true,
        });
      },
      isReact: ({ results }: { results: any }) => {
        results.react && {
          reactName: () =>
            p.text({
              message: "What will your React App be called?",
              defaultValue: "react-app",
              validate: validateAppName,
            }),
          reactDependencies: () => {
            return p.select({
              message: "Select the Dependencies you will be using in React App",
              options: [
                {
                  value: "tanstackQuery",
                  label: "tanstack Query (React Query)",
                },
                { value: "recoil", label: "Recoil" },
                { value: "tailwindShadcn", label: "tailwind+Shadcn-ui" },
                { value: "reactRouter", label: "Reactrouter" },
              ],
            });
          },
        };
      },
      next: () => {
        return p.confirm({
          message: "Do you want to add a Next app in your Super Turbo?",
          initialValue: true,
        });
      },
      isNext: ({ results }: { results: any }) => {
        results.next && {
          nextName: () =>
            p.text({
              message: "What will your Next App be called?",
              defaultValue: "next-app",
              validate: validateAppName,
            }),
          nextDependencies: () => {
            return p.select({
              message: "Select the Dependencies you will be using in Next App",
              options: [
                { value: "nextAuth", label: "NextAuth" },
                {
                  value: "tanstackQuery",
                  label: "tanstack Query (React Query)",
                },
                { value: "recoil", label: "Recoil" },
                { value: "tailwindShadcn", label: "tailwind+Shadcn-ui" },
                { value: "reactRouter", label: "Reactrouter" },
                { value: "prisma", label: "Prisma" },
              ],
            });
          },
        };
      },
      express: () => {
        return p.confirm({
          message: "Do you want to add a Express app in your Super Turbo?",
          initialValue: true,
        });
      },
      isExpress: ({ results }: { results: any }) => {
        results.express && {
          expressName: () =>
            p.text({
              message: "What will your Express App be called?",
              defaultValue: "express-app",
              validate: validateAppName,
            }),
          nextDependencies: () => {
            return p.select({
              message:
                "Select the Dependencies you will be using in Express App",
              options: [
                { value: "express", label: "Express" },
                { value: "prisma", label: "Prisma" },
                { value: "cors", label: "CORS" },
              ],
            });
          },
        };
      },
    }),
  });
};
