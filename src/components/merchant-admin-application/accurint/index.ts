/**
 * Accurint Report Components - Index
 * 
 * Central export point for all Accurint-related components, hooks, and utilities.
 * Import from this file for cleaner, more maintainable code.
 * 
 * @example
 * ```tsx
 * // Instead of multiple imports:
 * import { AccurintReportButton } from './AccurintReportButton';
 * import { RiskStatusBadge } from './RiskStatusBadge';
 * import { AccurintReportModal } from './AccurintReportModal';
 * 
 * // Use single import:
 * import { 
 *   AccurintReportButton, 
 *   RiskStatusBadge, 
 *   AccurintReportModal 
 * } from '@/components/merchant-admin-application/accurint';
 * ```
 */


// Hooks
export { useAccurintReport } from '@/hooks/useAccurintReport';

// Types (re-exported from api for convenience)
export type { 
  AccurintReportData, 
  AccurintReportRequest, 
  AccurintReportResponse,
  RiskStatus 
} from '@/lib/api';

// Utilities (re-exported from pdfUtils for convenience)
export {
  base64ToBlob,
  createPdfUrl,
  downloadPdf,
  openPdfInNewTab,
  formatFileSize,
  getPdfDataUri,
  isValidBase64Pdf
} from '@/lib/pdfUtils';
