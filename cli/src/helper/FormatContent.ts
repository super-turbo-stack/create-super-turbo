import prettier from "prettier";

export async function formatContent(
  content: string,
  file: string
): Promise<string> {
  const extensions = file.split(".");
  let fileExtension;
  if (file === ".env.ejs") {
    fileExtension = "env";
  } else {
    fileExtension = extensions[extensions.length - 2];
  }
  try {
    let parser;
    switch (fileExtension) {
      case "js":
      case "jsx":
        parser = "babel";
        break;
      case "ts":
      case "tsx":
        parser = "typescript";
        break;
      case "css":
        parser = "css";
        break;
      case "json":
        parser = "json";
        break;
      default:
        parser = "html";
    }

    let formattedContent = await prettier.format(content, {
      parser: parser,
      semi: false,
      singleQuote: true,
    });
    formattedContent = formattedContent.replace(/^\s*[\r\n]/gm, "");
    return formattedContent;
  } catch (error) {
    console.error("Error formatting content:", error);
    console.log("file", file);
    return content;
  }
}
