export interface reactApp {
  name: string;
  dependencies: reactAppDependencies;
}

export interface nextApp {
  name: string;
  dependencies: nextAppDependencies;
}

export interface expressApp {
  name: string;
  dependencies: expressAppDependencies;
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
  express: boolean;
  prisma: boolean;
  cors: boolean;
}
