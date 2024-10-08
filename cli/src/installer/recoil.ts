import { PKG_ROOT } from "@/const";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";
import { logger } from "@/utils/logger";
import fs from "fs-extra";
import path from "path";

export const RecoilInstaller = async ({
  destDir,
  packageManager,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
}) => {
  try {
    const srcDir = path.join(PKG_ROOT, "src/template/packages/store");
    fs.copySync(srcDir, path.join(destDir, "packages/store"));
    await compileTemplates(path.join(destDir, "packages/store"), {
      props: {
        packageManager,
      },
    });
  } catch (error) {
    logger.error("Error while adding recoil");
    process.exit(1);
  }
};
