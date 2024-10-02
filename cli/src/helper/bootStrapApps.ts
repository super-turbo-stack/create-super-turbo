import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import ora from "ora";
import type { expressApp, nextApp, reactApp } from "@/types/packageTypes";
import { MoveAndCompileTemplate } from "./MoveAndCompileTemplate";

type Props = {
  turboRepoName: string;
  superTurboDir: string;
  templateCompilationProps: any; //TODO: type this
} & (
  | { type: "express"; app: expressApp }
  | { type: "next"; app: nextApp }
  | { type: "react"; app: reactApp }
);

export const bootStrapApps = async ({
  turboRepoName,
  superTurboDir,
  type,
  app,
  templateCompilationProps,
}: Props) => {
  let appName: string;
  if (type === "express") appName = app.expressName;
  else if (type === "next") appName = app.nextName;
  else if (type === "react") appName = app.reactName;
  else throw new Error("Invalid type");

  const srcDir = path.join(PKG_ROOT, "src/template/base/", type);
  const destDir = path.join(superTurboDir, "apps", appName);
  const spinner = ora(`Adding ${appName} in ${turboRepoName}...\n`).start();

  await MoveAndCompileTemplate({
    destDir,
    srcDir,
    templateCompilationProps,
  });

  if (
    templateCompilationProps.props.react?.reactDependencies?.tailwind ||
    templateCompilationProps.props.react?.reactDependencies?.shadcnTailwind
  ) {
    fs.removeSync(path.join(destDir, `/src/App.css`));
  }
  spinner.succeed();
};
