import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const ReactRouterInstaller = async ({
  destDir,
    appName
}: {
  destDir: string;
  appName: string;
}) => {
  try {
    const spinner = ora("Adding react-router to your super react ...").start();
    const srcDir = path.join(PKG_ROOT, "src/template/dependencies/reactRouter");
    fs.copySync(srcDir, path.join(destDir, `apps/${appName}/src`));
    await compileTemplates(path.join(destDir, `apps/${appName}/src`), {
      props: {      },
    });
    spinner.succeed("Successfully installed react-router");
  } catch (error) {
    console.log(error);
    logger.error("Error while installing react-router");
    process.exit(1);
  }
};
