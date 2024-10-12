import { PKG_ROOT } from "@/const";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";
import { logger } from "@/utils/logger";
import fs from "fs-extra";
import path from "path";

export const PrismaInstaller = async ({
  destDir,
  packageManager,
  express,
  next,
  name,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
  express: boolean;
  next: boolean;
  name: string | undefined;
}) => {
  try {
    const srcDir = path.join(PKG_ROOT, "src/template/packages/db");
    fs.copySync(srcDir, path.join(destDir, "packages/db"));
    await compileTemplates(path.join(destDir, "packages/db"), {
      props: {
        packageManager,
      },
    });
    if (express) {
      fs.copySync(
        path.join(PKG_ROOT, "src/template/dependencies/prisma-express"),
        path.join(destDir, "apps", name as string, "src")
      );
    }
  } catch (error) {
    logger.error("Error while adding prisma");
    process.exit(1);
  }
};
