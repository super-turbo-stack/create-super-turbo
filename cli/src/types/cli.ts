import { expressApp, nextApp, reactApp } from "./packageTypes";

export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  react: boolean;
  express: boolean;
  next: boolean;
}

export const defaultReact = {
  reactName: "react-app",
  reactDependencies: {
    reactRouter: true,
    recoil: true,
    tailwind: true,
    shadcnTailwind: true,
    tanstackQuery: true,
  },
};

export const defaultNext = {
  nextName: "next-app",
  nextDependencies: {
    tanstackQuery: true,
    recoil: true,
    tailwind: true,
    shadcnTailwind: true,
    nextAuth: true,
    prisma: true,
  },
};

export const defaultExpress = {
  expressName: "express-app",
  expressDependencies: {
    cors: true,
    prisma: true,
  },
};

export interface CliResults {
  turboRepoName: string;
  packageManager: "yarn" | "npm" | "pnpm";
  // language: "typescript" | "javascript";
  reactApps: number;
  nextApps: number;
  expressApps: number;
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
  reactApps: 0,
  nextApps: 0,
  expressApps: 0,
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
