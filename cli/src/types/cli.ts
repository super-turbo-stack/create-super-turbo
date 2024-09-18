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
    reactName: "react-app",
    reactDependencies: {
      reactRouter: true,
      recoil: true,
      tailwindShadcn: true,
      tanstackQuery: true,
    },
  },
  next: {
    nextName: "next-app",
    nextDependencies: {
      tanstackQuery: true,
      recoil: true,
      tailwindShadcn: true,
      nextAuth: true,
      prisma: true,
    },
  },
  express: {
    expressName: "express-app",
    expressDependencies: {
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
