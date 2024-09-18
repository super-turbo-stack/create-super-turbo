import { expressApp, nextApp, reactApp } from "./packageTypes";

export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

export interface CliResults {
  turboRepoName: string;
  packageManager: "yarn" | "npm" | "pnpm";
  // language: "typescript" | "javascript";
  react: reactApp | null;
  next: nextApp | null;
  express: expressApp | null;
  git: boolean;
  install: boolean;
}

export const defaultOptions: CliResults = {
  turboRepoName: "my-super-turbo",
  packageManager: "npm",
  // language: "typescript",
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
      prisma: true,
    },
  },
  git: true,
  install: true,
};
