import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  AlertCircle, 
  Calendar,
  Hash,
  Building,
  FileBarChart,
  X,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { getAccurintReport, type AccurintReportData, type AccurintReportRequest } from '@/lib/api';
import { RiskStatusBadge } from './RiskStatusBadge';
import { 
  downloadPdf, 
  openPdfInNewTab, 
  createPdfUrl, 
  formatFileSize 
} from '@/lib/pdfUtils';

interface AccurintReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queryParams: AccurintReportRequest;
  title?: string;
}

/**
 * AccurintReportModal Component
 * 
 * A comprehensive modal for displaying Accurint business verification reports
 * Features:
 * - Fetches report data from API
 * - Displays risk indicators with color-coded badges
 * - Shows detailed report metadata
 * - Provides PDF viewing options (inline, new tab, download)
 * - Handles loading and error states
 * 
 * @param open - Controls modal visibility
 * @param onOpenChange - Callback when modal open state changes
 * @param queryParams - Query parameters to fetch report (applicationId, onboardingSessionId, or businessId)
 * @param title - Optional custom modal title
 */
export const AccurintReportModal: React.FC<AccurintReportModalProps> = ({
  open,
  onOpenChange,
  queryParams,
  title = 'Accurint Business Report'
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<AccurintReportData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Fetch report when modal opens
  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setReportData(null);
      setError(null);
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
      return;
    }

    fetchReport();
  }, [open, queryParams]);

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAccurintReport(queryParams);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'No report data found');
      }

      setReportData(response.data);

      // Create PDF URL for iframe display - check for pdfReport regardless of hasPdf flag
      if (response.data.pdfReport) {
        console.log('[AccurintReportModal] PDF found, length:', response.data.pdfReport.length);
        console.log('[AccurintReportModal] PDF base64 (first 100 chars):', response.data.pdfReport.substring(0, 100));
        const url = createPdfUrl(response.data.pdfReport);
        setPdfUrl(url);
        console.log('[AccurintReportModal] PDF URL created:', url);
      } else {
        console.warn('[AccurintReportModal] No PDF report found in response');
      }

      toast.success('Report loaded successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load report';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('[AccurintReportModal] Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!reportData?.pdfReport) return;

    const filename = `accurint-report-${reportData.transactionId || reportData.id}.pdf`;
    downloadPdf(reportData.pdfReport, filename);
    toast.success('PDF download started');
  };

  const handleOpenInNewTab = () => {
    if (!reportData?.pdfReport) return;

    openPdfInNewTab(
      reportData.pdfReport, 
      `Accurint Report - ${reportData.transactionId}`
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileBarChart className="h-6 w-6 text-blue-600" />
            {title}
          </DialogTitle>
          <DialogDescription>
            LexisNexis Accurint business verification and risk assessment report
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay error={error} onRetry={fetchReport} />
        ) : reportData ? (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              {/* Risk Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Evidence Risk Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskStatusBadge 
                      status={reportData.evidenceRiskStatus} 
                      className="text-lg px-4 py-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Business Risk Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskStatusBadge 
                      status={reportData.businessRiskStatus} 
                      className="text-lg px-4 py-2"
                    />
                  </CardContent>
                </Card> */}
              </div>

              {/* Quick Info Card */}
               {/*      <Card>
                <CardHeader>
                  <CardTitle>Report Information</CardTitle>
                  <CardDescription>Key identifiers and metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoRow 
                    icon={<Hash className="h-4 w-4" />}
                    label="Transaction ID" 
                    value={reportData.transactionId} 
                  />
                  <InfoRow 
                    icon={<FileText className="h-4 w-4" />}
                    label="Query ID" 
                    value={reportData.queryId} 
                  />
                  <InfoRow 
                    icon={<Building className="h-4 w-4" />}
                    label="Business ID" 
                    value={reportData.businessId.toString()} 
                  />
                  <InfoRow 
                    icon={<Calendar className="h-4 w-4" />}
                    label="Created" 
                    value={formatDate(reportData.createdAt)} 
                  />
                  {reportData.pdfReport && (
                    <InfoRow 
                      icon={<FileText className="h-4 w-4" />}
                      label="PDF Size" 
                      value={formatFileSize(reportData.pdfSize)} 
                    />
                  )}
                </CardContent>
              </Card> */}

              {/* PDF Actions */}
              {reportData.pdfReport && (
                <Card>
                  <CardHeader>
                    <CardTitle>PDF Actions</CardTitle>
                    <CardDescription>View or download the full report</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button 
                      onClick={handleOpenInNewTab}
                      variant="default"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in New Tab
                    </Button>
                      <Button 
                      onClick={handleOpenInNewTab}
                      variant="default"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                    View PDF
                    </Button>
                    <Button 
                      onClick={handleDownloadPdf}
                      variant="outline"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No report data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Helper Components

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 py-6">
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <Skeleton className="h-48" />
    <Skeleton className="h-24" />
  </div>
);

const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <Alert variant="destructive" className="my-6">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription className="flex items-center justify-between">
      <span>{error}</span>
      <Button onClick={onRetry} variant="outline" size="sm">
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ 
  icon, 
  label, 
  value 
}) => (
  <div className="flex items-center justify-between py-2 border-b last:border-0">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-sm text-gray-900 font-mono">{value}</span>
  </div>
);

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ 
  title, 
  children 
}) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string | number | boolean }> = ({ 
  label, 
  value 
}) => (
  <div className="flex items-center justify-between py-2 text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-900 font-mono">{String(value)}</span>
  </div>
);

export default AccurintReportModal;
