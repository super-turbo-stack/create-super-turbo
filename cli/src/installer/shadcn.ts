import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const ShadcnInstaller = async ({
  destDir,
  packageManager,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
}) => {
  try {
    const spinner = ora("Adding Shadcn to your Super Turbo...").start();
    const srcDir = path.join(PKG_ROOT, "src/template/packages/shadcnui");
    fs.copySync(srcDir, path.join(destDir, `packages/ui`));
    await compileTemplates(path.join(destDir, `packages/ui`), {
      props: {
        packageManager,
      },
    });
    spinner.succeed("Successfully added Shadcn");
  } catch (error) {
    console.log(error);
    logger.error("Error while adding Shadcn");
    process.exit(1);
  }
};
