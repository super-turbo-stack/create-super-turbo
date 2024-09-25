import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const ReactRouterInstaller = async ({
  destDir,
  appName,
}: {
  destDir: string;
  appName: string;
}) => {
  try {
    const srcDir = path.join(PKG_ROOT, "src/template/dependencies/reactRouter");
    fs.copySync(srcDir, path.join(destDir, `apps/${appName}/src`));
    await compileTemplates(path.join(destDir, `apps/${appName}/src`), {
      props: {},
    });
  } catch (error) {
    logger.error("Error while adding react-router");
    process.exit(1);
  }
};
