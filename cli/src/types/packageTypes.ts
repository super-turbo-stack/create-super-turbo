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

interface reactAppDependencies {
  tanstackQuery: boolean;
  recoil: boolean;
  tailwindShadcn: boolean;
  reactRouter: boolean;
}

interface nextAppDependencies {
  tanstackQuery: boolean;
  recoil: boolean;
  tailwindShadcn: boolean;
  nextAuth: boolean;
  prisma: boolean;
}

interface expressAppDependencies {
  prisma: boolean;
  cors: boolean;
}
