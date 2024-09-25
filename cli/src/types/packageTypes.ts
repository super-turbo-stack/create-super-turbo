export interface reactApp {
  reactName: string;
  reactDependencies: reactAppDependencies;
}

export interface nextApp {
  nextName: string;
  nextDependencies: nextAppDependencies;
}

export interface expressApp {
  expressName: string;
  expressDependencies: expressAppDependencies;
}

export interface reactAppDependencies {
  tanstackQuery: boolean;
  recoil: boolean;
  shadcnTailwind: boolean;
  tailwind: boolean;
  reactRouter: boolean;
}

export interface nextAppDependencies {
  tanstackQuery: boolean;
  recoil: boolean;
  shadcnTailwind: boolean;
  tailwind: boolean;
  nextAuth: boolean;
  prisma: boolean;
}

export interface expressAppDependencies {
  prisma: boolean;
  cors: boolean;
}
