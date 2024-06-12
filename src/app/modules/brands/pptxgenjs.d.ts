declare module 'pptxgenjs' {
  class PptxGenJS {
    tableToSlides: (htmlElementId: string, options: { x: number; y: number; w: number }) => void;
    writeFile: (options: { fileName: string }) => Promise<void>;
    addSlide: () => void; // Add the addSlide method
  }
  export default PptxGenJS;
}
