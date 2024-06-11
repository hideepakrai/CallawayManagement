declare module 'pptxgenjs' {
    class PptxGenJS {
      writeFile(options: { fileName: string }): Promise<void>;
      tableToSlides(tableId: string): void;
    }
  
    export default PptxGenJS;
  }
  