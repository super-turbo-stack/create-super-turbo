import { Command } from "commander";
import * as p from "@clack/prompts";
import { validateAppName } from "@/utils/validateAppName";
import { CliResults, defaultOptions } from "@/types/cli";
import { logger } from "@/utils/logger";
import { getUserPackageManager } from "@/utils/getUserPackageManager";

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
    //TODO:get Version from package.json
    .version("1.0.0", "-v, --version", "Display the version number");

  program.parse(process.argv);
  console.log(program.args);
  console.log(program.opts());
  const cliProvidedName = program.args[0];

  if (cliProvidedName) {
    console.log("cliProvidedName", cliProvidedName);
    cliResults.turboRepoName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  if (cliResults.flags.default) {
    return cliResults;
  }

  const pkgManager = getUserPackageManager();

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
            { value: "tailwindShadcn", label: "tailwind+Shadcn-ui" },
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
            { value: "tailwindShadcn", label: "tailwind+Shadcn-ui" },
            { value: "prisma", label: "Prisma" },
          ],
          required: false,
        });
      },
      express: () => {
        return p.confirm({
          message: "Do you want to add a Express app in your Super Turbo? ",
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
            { value: "express", label: "Express" },
            { value: "prisma", label: "Prisma" },
            { value: "cors", label: "CORS" },
          ],
          required: false,
        });
      },
      ...(!cliResults.flags.noGit && {
        git: () => {
          return p.confirm({
            message:
              "Should we initialize a Git repository and stage the changes?",
            initialValue: !defaultOptions.flags.noGit,
          });
        },
      }),
      ...(!cliResults.flags.noInstall && {
        install: () => {
          return p.confirm({
            message:
              `Should we run '${pkgManager}` +
              (pkgManager === "yarn" ? `'?` : ` install' for you?`),
            initialValue: !defaultOptions.flags.noInstall,
          });
        },
      }),
    },
    {
      onCancel: () => {
        logger.info("Operation cancelled.");
        process.exit(0);
      },
    },
  );
  console.log("cliResults", cliResults);
  console.log(project);
  return {
    ...cliResults,
  };
};
