import { PKG_ROOT } from "@/const";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";
import { logger } from "@/utils/logger";
import fs from "fs-extra";
import path from "path";

export const TailwindInstaller = async ({
  destDir,
  appName,
  isReact,
  isShadcn,
  packageManager,
}: {
  destDir: string;
  appName: string;
  isReact: boolean;
  isShadcn: boolean;
  packageManager: "yarn" | "npm" | "pnpm";
}) => {
  try {
    const srcDir = path.join(PKG_ROOT, "src/template/dependencies/tailwind");
    const pkgDir = path.join(PKG_ROOT, "src/template/packages/config-tailwind");
    fs.copyFileSync(
      `${srcDir}/postcss.config.mjs.ejs`,
      path.join(destDir, `apps/${appName}/postcss.config.mjs`)
    );
    if (isReact) {
      fs.copyFileSync(
        `${srcDir}/react-tailwind.config.ts.ejs`,
        path.join(destDir, `apps/${appName}/tailwind.config.ts`)
      );
    } else {
      fs.copyFileSync(
        `${srcDir}/next-tailwind.config.ts.ejs`,
        path.join(destDir, `apps/${appName}/tailwind.config.ts`)
      );
    }
    fs.copySync(pkgDir, path.join(destDir, "packages/config-tailwind"));
    await compileTemplates(path.join(destDir, `apps/${appName}`), {
      props: {},
    });
    await compileTemplates(path.join(destDir, `packages/config-tailwind`), {

      props: {
                packageManager,
                isShadcn,
            },

    });
  } catch (error) {
    logger.error("Error while adding TailwindCSS");
    process.exit(1);
  }
};
