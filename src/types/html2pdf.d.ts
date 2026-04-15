declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number] | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      logging?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
    pagebreak?: {
      mode?: string[];
    };
  }

  interface Html2Pdf {
    from(element: HTMLElement): Html2Pdf;
    set(options: Html2PdfOptions): Html2Pdf;
    outputPdf(type: 'blob' | 'datauristring' | 'datauri' | 'dataurlnewwindow' | 'bloburi' | 'bloburl'): Promise<Blob | string>;
    save(): Promise<void>;
    toPdf(): Html2Pdf;
    output(type: string): Promise<any>;
  }

  function html2pdf(): Html2Pdf;

  export default html2pdf;
}
