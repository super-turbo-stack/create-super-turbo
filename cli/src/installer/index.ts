import { expressApp, nextApp, reactApp } from "@/types/packageTypes";
import { PrismaInstaller } from "./prisma";
import { ReactRouterInstaller } from "./reactRouter";
import { RecoilInstaller } from "./recoil";
import { NextAuthInstaller } from "./nextAuth";
import { TailwindInstaller } from "./tailwind";
import { ShadcnInstaller } from "./shadcn";

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
  if (next?.nextDependencies.nextAuth) {
    await NextAuthInstaller({
      destDir,
      appName: next?.nextName,
    });
  }
  if (next?.nextDependencies.tailwind) {
    await TailwindInstaller({
      destDir,
      appName: next.nextName,
      isReact: false,
      isShadcn: false,
      packageManager,
    });
  }
  if (
    next?.nextDependencies.shadcnTailwind ||
    react?.reactDependencies.shadcnTailwind
  ) {
    await ShadcnInstaller({ destDir, packageManager });
  }
  if (react?.reactDependencies.reactRouter) {
    await ReactRouterInstaller({ destDir, appName: react.reactName });
  }
  if (react?.reactDependencies.recoil || next?.nextDependencies.recoil) {
    await RecoilInstaller({ destDir });
  }
  if (react?.reactDependencies.tailwind) {
    await TailwindInstaller({
      destDir,
      appName: react.reactName,
      isShadcn: true,
      isReact: true,
      packageManager,
    });
  }
};
