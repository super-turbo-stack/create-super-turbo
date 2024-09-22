import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "@/const";
import { logger } from "@/utils/logger";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";

export const PrismaInstaller = async ({
  destDir,
  packageManager,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
}) => {
  try {
    const spinner = ora("Adding prisma to your Super Turbo...").start();
    const srcDir = path.join(PKG_ROOT, "src/template/packages/db");
    fs.copySync(srcDir, path.join(destDir, "packages/db"));
    await compileTemplates(path.join(destDir, "packages/db"), {
      props: {
        packageManager,
      },
    });
    spinner.succeed("Successfully installed prisma");
  } catch (error) {
    console.log(error);
    logger.error("Error while installing prisma");
    process.exit(1);
  }
};
