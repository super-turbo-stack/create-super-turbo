import { expressApp, nextApp, reactApp } from "./packageTypes";

export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  react: boolean;
  express: boolean;
  next: boolean;
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
      tailwind: true,
      shadcnTailwind: true,
      tanstackQuery: true,
    },
  },
  next: {
    nextName: "next-app",
    nextDependencies: {
      tanstackQuery: true,
      recoil: true,
      tailwind: true,
      shadcnTailwind: true,
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
