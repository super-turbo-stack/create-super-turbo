import { PKG_ROOT } from "@/const";
import { compileTemplates } from "@/helper/MoveAndCompileTemplate";
import { logger } from "@/utils/logger";
import fs from "fs-extra";
import path from "path";

export const PrismaInstaller = async ({
  destDir,
  packageManager,
  app,
  name,
}: {
  destDir: string;
  packageManager: "yarn" | "npm" | "pnpm";
  app: "express" | "next";
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
    if (app === "express" && name) {
      fs.copySync(
        path.join(PKG_ROOT, "src/template/dependencies/prisma-express"),
        path.join(destDir, "apps", name, "src")
      );
    }
  } catch (error) {
    logger.error("Error while adding prisma");
    process.exit(1);
  }
};
