import { logger } from "@/utils/logger";
import chalk from "chalk";
import {
  expressAppDependencies,
  nextAppDependencies,
  reactAppDependencies,
} from "@/types/packageTypes";

export const PackageInstallationLogs = ({
  expressAppDependencies,
  nextAppDependencies,
  reactAppDependencies,
}: {
  reactAppDependencies: reactAppDependencies | undefined;
  nextAppDependencies: nextAppDependencies | undefined;
  expressAppDependencies: expressAppDependencies | undefined;
}) => {
  let dependencies = new Set();
  if (reactAppDependencies?.reactRouter) {
    dependencies.add("react-router-dom");
  }
  if (reactAppDependencies?.recoil) {
    dependencies.add("recoil");
  }
  if (reactAppDependencies?.shadcnTailwind) {
    dependencies.add("shadcn-ui");
  }
  if (reactAppDependencies?.tailwind) {
    dependencies.add("tailwindcss");
  }
  if (reactAppDependencies?.tanstackQuery) {
    dependencies.add("@tanstack/react-query");
  }

  if (nextAppDependencies?.tanstackQuery) {
    dependencies.add("@tanstack/react-query");
  }
  if (nextAppDependencies?.recoil) {
    dependencies.add("recoil");
  }
  if (nextAppDependencies?.shadcnTailwind) {
    dependencies.add("shadcn-ui");
  }
  if (nextAppDependencies?.tailwind) {
    dependencies.add("tailwindcss");
  }
  if (nextAppDependencies?.nextAuth) {
    dependencies.add("next-auth");
  }
  if (nextAppDependencies?.prisma) {
    dependencies.add("prisma");
  }

  if (expressAppDependencies?.cors) {
    dependencies.add("cors");
  }
  if (expressAppDependencies?.prisma) {
    dependencies.add("prisma");
  }
  if (
    nextAppDependencies?.shadcnTailwind ||
    reactAppDependencies?.shadcnTailwind
  ) {
    dependencies.add("shadcn-ui");
  }

  const dependenciesArray = Array.from(dependencies) as string[];
  const tick = chalk.green.bold("✔");
  dependenciesArray.forEach((dependency) => {
    logger.success(`${tick} successfully added ${chalk.cyan.bold(dependency)}`);
  });
};
