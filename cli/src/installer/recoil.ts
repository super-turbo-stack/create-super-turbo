import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const RecoilInstaller = async ({ destDir }: { destDir: string }) => {
  try {
    const spinner = ora("Adding recoil to your Super Turbo...").start();
    const srcDir = path.join(PKG_ROOT, "src/template/packages/store");
    fs.copySync(srcDir, path.join(destDir, "packages/store"));
    await compileTemplates(path.join(destDir, "packages/store"), {
      props: {},
    });
    spinner.succeed("Successfully installed recoil");
  } catch (error) {
    console.log(error);
    logger.error("Error while installing recoil");
    process.exit(1);
  }
};
