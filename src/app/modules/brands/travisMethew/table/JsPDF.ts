// Extend jsPDF types
declare module "jspdf" {
    export interface jsPDF {
      autoTable: (
        columns: string[] | object[],
        body: object[],
        options?: object
      ) => jsPDF;
    }
  }
  