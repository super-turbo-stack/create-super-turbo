import { logger } from "@/utils/logger";
import ejs from "ejs";
import fs from "fs-extra";
import path from "path";
import { formatContent } from "./FormatContent";

interface Props {
  destDir: string;
  srcDir: string;
  templateCompilationProps: any;
}

export const MoveAndCompileTemplate = async ({
  srcDir,
  destDir,
  templateCompilationProps,
}: Props) => {
  try {
    fs.copySync(srcDir, destDir);
  } catch (error) {
    logger.error("Error while copying template files");
    process.exit(1);
  }
  await compileTemplates(destDir, templateCompilationProps);
};

export const compileTemplates = async (
  dir: string,
  templateCompilationProps: any
) => {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      if (file === ".gitKeep") {
        fs.removeSync(filePath);
        continue;
      }
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await compileTemplates(filePath, templateCompilationProps);
      } else if (
        file.endsWith(".d.ts.ejs") ||
        file === ".gitignore.ejs" ||
        file === "pnpm-workspace.yaml.ejs"
      ) {
        fs.renameSync(filePath, filePath.replace(".ejs", ""));
      } else if (file.endsWith(".ejs")) {
        const compiledContent = await ejs.renderFile(
          filePath,
          templateCompilationProps
        );
        if (file === "next.config.mjs.ejs" || file === ".env.ejs") {
          await fs.writeFile(filePath, compiledContent as string);
          fs.renameSync(filePath, filePath.replace(".ejs", ""));
          continue;
        }

        const formattedContent = await formatContent(
          compiledContent as string,
          file
        );
        await fs.writeFile(filePath, formattedContent as string);
        fs.renameSync(filePath, filePath.replace(".ejs", ""));
      }
    }
  } catch (error) {
    console.error("Error compiling EJS templates:", error);
    throw error;
  }
};
