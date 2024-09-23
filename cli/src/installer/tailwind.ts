import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const TailwindInstaller = async ({
  destDir,
  appName,
  isReact,
  packageManager,
}: {
  destDir: string;
  appName: string;
  isReact: boolean;
  packageManager: "yarn" | "npm" | "pnpm";
}) => {
  try {
    const spinner = ora("Adding Tailwind to your Super Turbo...").start();
    const srcDir = path.join(PKG_ROOT, "src/template/dependencies/tailwind");
    const pkgDir = path.join(PKG_ROOT, "src/template/packages/config-tailwind");
    fs.copyFileSync(
      `${srcDir}/postcss.config.ts.ejs`,
      path.join(destDir, `apps/${appName}/postcss.config.ts`),
    );
    if (isReact) {
      fs.copyFileSync(
        `${srcDir}/react-tailwind.config.ts.ejs`,
        path.join(destDir, `apps/${appName}/tailwind.config.ts`),
      );
    } else {
      fs.copyFileSync(
        `${srcDir}/next-tailwind.config.ts.ejs`,
        path.join(destDir, `apps/${appName}/tailwind.config.ts`),
      );
    }
    fs.copySync(pkgDir, path.join(destDir, "packages/config-tailwind"));
    await compileTemplates(path.join(destDir, `apps/${appName}`), {
      props: {},
    });
    await compileTemplates(path.join(destDir, `packages/config-tailwind`), {
      props: {packageManager},
    });
    spinner.succeed("Successfully added TailwindCSS");
  } catch (error) {
    console.log(error);
    logger.error("Error while adding TailwindCSS");
    process.exit(1);
  }
};
