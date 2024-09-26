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
    const apiSrcDir = path.join(
      PKG_ROOT,
      "src/template/dependencies/nextAuth/api"
    );
    const utilsSrcDir = path.join(
      PKG_ROOT,
      "src/template/dependencies/nextAuth/auth.ts.ejs"
    );
    fs.copySync(apiSrcDir, path.join(destDir, `apps/${appName}/src/app/api`));
    fs.copyFileSync(
      utilsSrcDir,
      path.join(destDir, `apps/${appName}/src/utils/auth.ts.ejs`)
    );
    await compileTemplates(path.join(destDir, `apps/${appName}/src/app/api`), {
      props: {},
    });
    await compileTemplates(path.join(destDir, `apps/${appName}/src/utils`), {
      props: {},
    });
  } catch (error) {
    logger.error("Error while adding Next-Auth");
    process.exit(1);
  }
};
