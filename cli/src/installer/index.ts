import { expressApp, nextApp, reactApp } from "@/types/packageTypes";
import { PrismaInstaller } from "./prisma";
import { ReactRouterInstaller } from "./reactRouter";

interface Props {
  packageManager: "yarn" | "npm" | "pnpm";
  next: nextApp | null;
  react: reactApp | null;
  express: expressApp | null;
  destDir: string;
}

export const InstallPackages = async ({
  packageManager,
  destDir,
  next,
  react,
  express,
}: Props) => {
  if (next?.nextDependencies.prisma || express?.expressDependencies.prisma) {
    await PrismaInstaller({ destDir, packageManager });
  }
    if (react?.reactDependencies.reactRouter){
        await ReactRouterInstaller({destDir, appName: react.reactName});
    }
};
