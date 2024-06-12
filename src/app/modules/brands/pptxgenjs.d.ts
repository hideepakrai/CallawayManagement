declare module 'pptxgenjs' {
  interface TableOptions {
    x: number;
    y: number;
    w: number;
    colW?: number[];
    border?: { pt: number; color: string };
    fill?: string;
    fontSize?: number;
  }

  interface ImageOptions {
    path: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }

  interface WriteFileOptions {
    fileName: string;
  }

  class PptxGenJS {
    tableToSlides: (htmlElementId: string, options: TableOptions) => void;
    writeFile: (options: WriteFileOptions) => Promise<void>;
    addSlide: () => Slide;
    addTable: (rows: (string | { text: string; options?: { bold?: boolean } })[][], options: TableOptions) => void;
    addImage: (options: ImageOptions) => void;
  }

  class Slide {
    addTable: (rows: (string | { text: string; options?: { bold?: boolean } })[][], options: TableOptions) => void;
    addImage: (options: ImageOptions) => void;
  }

  export default PptxGenJS;
}
