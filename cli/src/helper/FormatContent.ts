import prettier from 'prettier';

export async function formatContent(content: string, fileExtension: string): Promise<string> {
    try {
      let parser;
      switch (fileExtension) {
        case '.js':
        case '.jsx':
          parser = 'babel';
          break;
        case '.ts':
        case '.tsx':
          parser = 'typescript';
          break;
        case '.css':
          parser = 'css';
          break;
        case '.json':
          parser = 'json';
          break;
        default:
          parser = 'html';
      }
  
      // Format the content
      const formattedContent = await prettier.format(content, {
        parser: parser,
        semi: false,
        singleQuote: true,
      });
  
      return formattedContent;
    } catch (error) {
      console.error('Error formatting content:', error);
      return content; // Return original content if formatting fails
    }
  }