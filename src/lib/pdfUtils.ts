/**
 * PDF Utility Functions
 * Helper functions for handling PDF operations (base64 conversion, display, download)
 */

/**
 * Convert base64 string to Blob
 * @param base64 - Base64 encoded string
 * @param mimeType - MIME type (default: application/pdf)
 * @returns Blob object
 */
export function base64ToBlob(base64: string, mimeType: string = 'application/pdf'): Blob {
  // Remove data URI prefix if present
  const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
  
  // Decode base64 string
  const byteCharacters = atob(base64Data);
  const byteArrays: Uint8Array[] = [];
  
  // Convert to byte array in chunks for better performance
  const chunkSize = 512;
  for (let offset = 0; offset < byteCharacters.length; offset += chunkSize) {
    const chunk = byteCharacters.slice(offset, offset + chunkSize);
    const byteNumbers = new Array(chunk.length);
    
    for (let i = 0; i < chunk.length; i++) {
      byteNumbers[i] = chunk.charCodeAt(i);
    }
    
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  
  return new Blob(byteArrays as BlobPart[], { type: mimeType });
}

/**
 * Create object URL from base64 PDF
 * @param base64Pdf - Base64 encoded PDF string
 * @returns Object URL that can be used in iframe or window.open()
 */
export function createPdfUrl(base64Pdf: string): string {
  const blob = base64ToBlob(base64Pdf, 'application/pdf');
  return URL.createObjectURL(blob);
}

/**
 * Download PDF file from base64 string
 * @param base64Pdf - Base64 encoded PDF string
 * @param filename - Name for the downloaded file
 */
export function downloadPdf(base64Pdf: string, filename: string = 'report.pdf'): void {
  const blob = base64ToBlob(base64Pdf, 'application/pdf');
  const url = URL.createObjectURL(blob);
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up object URL
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Open PDF in new browser tab
 * @param base64Pdf - Base64 encoded PDF string
 * @param title - Optional window title
 */
export function openPdfInNewTab(base64Pdf: string, title: string = 'PDF Report'): void {
  const pdfUrl = createPdfUrl(base64Pdf);
  const newWindow = window.open(pdfUrl, '_blank');
  
  if (newWindow) {
    newWindow.document.title = title;
    // Clean up URL after window is loaded
    newWindow.addEventListener('load', () => {
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
    });
  } else {
    // Fallback: trigger download if popup was blocked
    console.warn('Popup blocked, falling back to download');
    downloadPdf(base64Pdf, `${title}.pdf`);
    URL.revokeObjectURL(pdfUrl);
  }
}

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.2 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Get PDF data URI from base64
 * Useful for iframe src attribute
 * @param base64Pdf - Base64 encoded PDF string
 * @returns Data URI string
 */
export function getPdfDataUri(base64Pdf: string): string {
  // Check if already has data URI prefix
  if (base64Pdf.startsWith('data:')) {
    return base64Pdf;
  }
  return `data:application/pdf;base64,${base64Pdf}`;
}

/**
 * Validate base64 PDF string
 * @param base64Pdf - String to validate
 * @returns true if valid base64 string
 */
export function isValidBase64Pdf(base64Pdf: string): boolean {
  if (!base64Pdf || typeof base64Pdf !== 'string') {
    return false;
  }
  
  try {
    // Remove data URI prefix if present
    const base64Data = base64Pdf.replace(/^data:[^;]+;base64,/, '');
    
    // Check if it's valid base64
    const decoded = atob(base64Data);
    
    // Check for PDF magic number (%PDF)
    return decoded.startsWith('%PDF');
  } catch {
    return false;
  }
}
