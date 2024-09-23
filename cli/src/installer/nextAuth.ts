import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const NextAuthInstaller = async ({
  destDir,
  appName,
}: {
  destDir: string;
  appName: string;
}) => {
  try {
    const spinner = ora("Adding Next-Auth to your Super Turbo...").start();
    const apiSrcDir = path.join(
      PKG_ROOT,
      "src/template/dependencies/nextAuth/api"
    );
    const utilsSrcDir = path.join(
      PKG_ROOT,
      "src/template/dependencies/nextAuth/auth.ts.ejs"
    );
    fs.copySync(apiSrcDir, path.join(destDir, `apps/${appName}/app/api`));
    fs.copyFileSync(
      utilsSrcDir,
      path.join(destDir, `apps/${appName}/utils/auth.ts.ejs`)
    );
    await compileTemplates(path.join(destDir, `apps/${appName}/app/api`), {
      props: {},
    });
    await compileTemplates(path.join(destDir, `apps/${appName}/utils`), {
      props: {},
    });
    spinner.succeed("Successfully added Next-Auth");
  } catch (error) {
    console.log(error);
    logger.error("Error while adding Next-Auth");
    process.exit(1);
  }
};