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
  reactApps: number;
  nextApps: number;
  expressApps: number;
}

export const InstallPackages = async ({
  packageManager,
  destDir,
  next,
  react,
  express,
  expressApps,
  nextApps,
  reactApps,
}: Props) => {
  if (expressApps > 0 || nextApps > 0 || reactApps > 0) {
    if (expressApps > 0) {
      let expressNum = expressApps;
      while (expressNum--) {
        await PrismaInstaller({
          destDir,
          packageManager,
          express: true,
          next: false,
          name: `express-app-${expressNum}`,
        });
      }
    }
    if (reactApps > 0) {
      let reactNum = reactApps;
      await RecoilInstaller({ destDir, packageManager });
      while (reactNum--) {
        await TailwindInstaller({
          destDir,
          appName: `react-app-${reactNum}`,
          isShadcn: true,
          isReact: true,
          packageManager,
        });
        await ReactRouterInstaller({
          destDir,
          appName: `react-app-${reactNum}`,
        });
      }
    }

    if (nextApps > 0) {
      let nextNum = nextApps;
      await RecoilInstaller({ destDir, packageManager });
      await ShadcnInstaller({ destDir, packageManager });
      while (nextNum--) {
        await PrismaInstaller({
          destDir,
          packageManager,
          express: false,
          next: true,
          name: "express-app",
        });
        await NextAuthInstaller({
          destDir,
          appName: `next-app-${nextNum}`,
        });
        await TailwindInstaller({
          destDir,
          appName: `next-app-${nextNum}`,
          isReact: false,
          isShadcn: true,
          packageManager,
        });
      }
    }
  } else {
    if (next?.nextDependencies.prisma || express?.expressDependencies.prisma) {
      let app: "express" | "next";
      if (next) app = "next";
      else app = "express";

      await PrismaInstaller({
        destDir,
        packageManager,
        express: express ? true : false,
        next: next ? true : false,
        name: express?.expressName,
      });
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
        isShadcn: !!next.nextDependencies.shadcnTailwind,
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
      await RecoilInstaller({ destDir, packageManager });
    }
    if (react?.reactDependencies.tailwind) {
      await TailwindInstaller({
        destDir,
        appName: react.reactName,
        isShadcn: !!react.reactDependencies.shadcnTailwind,
        isReact: true,
        packageManager,
      });
    }
  }
};
