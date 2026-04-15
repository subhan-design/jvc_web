/**
 * PDF Generator for Agreement Documents
 * Generates PDFs from HTML preview pages
 */

import html2pdf from 'html2pdf.js';

export type DocumentType =
  | 'consent_electronic_records'
  | 'merchant_agreement'
  | 'privacy_policy'
  | 'operating_guide'
  | 'application_disclosures'
  | 'credit_card_agreement'
  | 'financial_privacy_notice'
  | 'credit_card_online_agreement'
  | 'online_privacy_policy_consumer';

export interface DocumentConfig {
  documentType: DocumentType;
  fileName: string;
  documentVersion: string;
  previewUrl: string;
}

export interface DocumentMetadata {
  fileName: string;
  documentType: DocumentType;
  documentVersion: string;
  merchantFullName: string;
  signatureDataUrl: string | null;
  acceptedAt: string;
}

/**
 * Generate a single PDF from a preview page
 */
export async function generatePdfFromUrl(
  url: string,
  fileName: string,
  merchantData?: any
): Promise<Blob> {
  try {
    console.log(`[PDF Generator] Generating PDF from: ${url}`);

    // Create a hidden iframe to load the preview page
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = '8.5in'; // US Letter width
    iframe.style.height = '11in'; // US Letter height
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // Load the preview page with merchant data in query params if needed
    iframe.src = url;

    // Wait for iframe to load
    await new Promise<void>((resolve, reject) => {
      iframe.onload = () => resolve();
      iframe.onerror = () => reject(new Error(`Failed to load ${url}`));
      // Timeout after 10 seconds
      setTimeout(() => reject(new Error(`Timeout loading ${url}`)), 10000);
    });

    // Poll for data-pdf-ready attribute set by the preview page once its async data has loaded
    await new Promise<void>((resolve) => {
      const maxWaitMs = 20000;
      const pollMs = 200;
      const started = Date.now();
      const poll = () => {
        const body = iframe.contentDocument?.body;
        if (body?.dataset?.pdfReady === 'true') {
          resolve();
          return;
        }
        if (Date.now() - started >= maxWaitMs) {
          console.warn('[PDF Generator] data-pdf-ready timeout — capturing anyway');
          resolve();
          return;
        }
        setTimeout(poll, pollMs);
      };
      setTimeout(poll, pollMs);
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    // Get the document content from iframe
    const element = iframe.contentDocument?.body;
    if (!element) {
      throw new Error('Failed to access iframe content');
    }

    console.log(`[PDF Generator] Content loaded, generating PDF...`);

    // Configure PDF generation options
    const options = {
      // margin: [0.5, 0.5, 0.5, 0.5], // inches: top, right, bottom, left
       filename: fileName,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2, // Higher scale = better quality
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'in' as const,
        format: 'letter' as const,
        orientation: 'portrait' as const,
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Generate PDF blob
    const pdfBlob = (await html2pdf()
      .from(element)
      .set(options)
      .outputPdf('blob')) as Blob;

    // Cleanup iframe
    document.body.removeChild(iframe);

    console.log(`[PDF Generator] PDF generated successfully: ${fileName} (${pdfBlob.size} bytes)`);

    return pdfBlob;
  } catch (error) {
    console.error(`[PDF Generator] Failed to generate PDF from ${url}:`, error);
    throw error;
  }
}

/**
 * Generate all 4 merchant agreement documents as PDF files
 */
export async function generateAllAgreementPdfs(
  merchantData: any,
  signatureDataUrl?: string,
  onProgress?: (current: number, total: number, docType: string) => void
): Promise<{ files: File[]; metadata: DocumentMetadata[] }> {
  const timestamp = Date.now();
  const fullName = `${merchantData.personalDetails?.firstName || ''} ${merchantData.personalDetails?.lastName || ''}`.trim();

  const configs: DocumentConfig[] = [
    {
      documentType: 'consent_electronic_records',
      fileName: `consent_electronic_records_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/consent-electronic-records-2025/preview'
    },
    {
      documentType: 'merchant_agreement',
      fileName: `merchant_agreement_${timestamp}.pdf`,
      documentVersion: 'Oct_2025_v1.0',
      previewUrl: '/docs/merchant-agreement/preview'
    },
    {
      documentType: 'privacy_policy',
      fileName: `privacy_policy_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/online-privacy-policy/preview'
    },
    {
      documentType: 'operating_guide',
      fileName: `operating_guide_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/merchant-operating-guide/preview'
    }
  ];

  console.log(`[PDF Generator] Starting generation of ${configs.length} documents...`);

  const files: File[] = [];
  const metadata: DocumentMetadata[] = [];

  // Generate PDFs sequentially to avoid overwhelming the browser
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];

    if (onProgress) {
      onProgress(i + 1, configs.length, config.documentType);
    }

    try {
      const blob = await generatePdfFromUrl(
        config.previewUrl,
        config.fileName,
        merchantData
      );

      // Convert blob to File
      const file = new File([blob], config.fileName, {
        type: 'application/pdf',
        lastModified: Date.now()
      });

      files.push(file);

      // Create metadata for this document
      metadata.push({
        fileName: config.fileName,
        documentType: config.documentType,
        documentVersion: config.documentVersion,
        merchantFullName: fullName,
        signatureDataUrl: config.documentType === 'merchant_agreement' ? (signatureDataUrl || null) : null,
        acceptedAt: new Date().toISOString()
      });

      console.log(`[PDF Generator] ✓ Generated ${config.documentType} (${i + 1}/${configs.length})`);
    } catch (error) {
      console.error(`[PDF Generator] ✗ Failed to generate ${config.documentType}:`, error);
      throw new Error(`Failed to generate ${config.documentType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  console.log(`[PDF Generator] All ${files.length} documents generated successfully`);
  console.log(`[PDF Generator] Total size: ${files.reduce((sum, f) => sum + f.size, 0)} bytes`);

  return { files, metadata };
}

// Generate consumer agreement documents as PDF files
export async function generateConsumerAgreementPdfs(
  consumerData: any,
  signatureDataUrl?: string,
  onProgress?: (current: number, total: number, docType: string) => void
): Promise<{ files: File[]; metadata: DocumentMetadata[] }> {
  const timestamp = Date.now();
  const fullName = `${consumerData.personalDetails?.firstName || consumerData.signUp?.firstName || ''} ${consumerData.personalDetails?.lastName || consumerData.signUp?.lastName || ''}`.trim();
  const state = consumerData.bank?.state || consumerData.signUp?.state || 'Arizona';

  const configs: DocumentConfig[] = [
    {
      documentType: 'consent_electronic_records',
      fileName: `consumer_consent_electronic_records_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/consent-electronic-records/preview'
    },
    {
      documentType: 'application_disclosures',
      fileName: `consumer_application_disclosures_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: `/docs/application-disclosures/${state}/preview`
    },
    {
      documentType: 'credit_card_agreement',
      fileName: `consumer_credit_card_agreement_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/credit-card-agreement/preview'
    },
    {
      documentType: 'financial_privacy_notice',
      fileName: `consumer_financial_privacy_notice_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/financial-privacy-notice/preview'
    },
   
    {
      documentType: 'online_privacy_policy_consumer',
      fileName: `consumer_online_privacy_policy_${timestamp}.pdf`,
      documentVersion: '2025.1',
      previewUrl: '/docs/online-privacy-policy-consumer/preview'
    }
  ];

  console.log(`[PDF Generator] Starting generation of ${configs.length} consumer documents...`);

  const files: File[] = [];
  const metadata: DocumentMetadata[] = [];

  // Generate PDFs sequentially
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];

    if (onProgress) {
      onProgress(i + 1, configs.length, config.documentType);
    }

    try {
      const blob = await generatePdfFromUrl(
        config.previewUrl,
        config.fileName,
        consumerData
      );

      // Convert blob to File
      const file = new File([blob], config.fileName, {
        type: 'application/pdf',
        lastModified: Date.now()
      });

      files.push(file);

      // Create metadata for this document
      metadata.push({
        fileName: config.fileName,
        documentType: config.documentType,
        documentVersion: config.documentVersion,
        merchantFullName: fullName,
        signatureDataUrl: signatureDataUrl || null,
        acceptedAt: new Date().toISOString()
      });

      console.log(`[PDF Generator] ✓ Generated ${config.documentType} (${i + 1}/${configs.length})`);
    } catch (error) {
      console.error(`[PDF Generator] ✗ Failed to generate ${config.documentType}:`, error);
      throw new Error(`Failed to generate ${config.documentType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  console.log(`[PDF Generator] All ${files.length} consumer documents generated successfully`);
  console.log(`[PDF Generator] Total size: ${files.reduce((sum, f) => sum + f.size, 0)} bytes`);

  return { files, metadata };
}

/**
 * Validate PDF file
 */
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: `File size must not exceed 10MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)` };
  }

  // Check file name
  if (!file.name.endsWith('.pdf')) {
    return { valid: false, error: 'File must have .pdf extension' };
  }

  return { valid: true };
}
