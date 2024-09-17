import { expressApp, nextApp, reactApp } from "./packageTypes";

export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

export interface CliResults {
  turboRepoName: string;
  packageManager: "yarn" | "npm" | "pnpm";
  isTS: boolean;
  react: reactApp;
  next: nextApp;
  express: expressApp;
  flags: CliFlags;
}

export const defaultOptions: CliResults = {
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
