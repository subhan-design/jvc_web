const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
import { useState, useCallback } from 'react';
import { getAccurintReport, type AccurintReportData, type AccurintReportRequest } from '@/lib/api';
import { toast } from 'sonner';

interface UseAccurintReportReturn {
  reportData: AccurintReportData | null;
  loading: boolean;
  error: string | null;
  fetchReport: (params: AccurintReportRequest) => Promise<void>;
  clearReport: () => void;
  refetch: () => Promise<void>;
}

/**
 * useAccurintReport Hook
 * 
 * Custom React hook for managing Accurint report data fetching and state
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { reportData, loading, error, fetchReport } = useAccurintReport();
 * 
 *   useEffect(() => {
 *     fetchReport({ applicationId: 123 });
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return (
 *     <div>
 *       <h2>Risk Status: {reportData?.evidenceRiskStatus}</h2>
 *       {reportData?.hasPdf && <PDFViewer pdf={reportData.pdfReport} />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAccurintReport(): UseAccurintReportReturn {
  const [reportData, setReportData] = useState<AccurintReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<AccurintReportRequest | null>(null);

  const fetchReport = useCallback(async (params: AccurintReportRequest) => {
    setLoading(true);
    setError(null);
    setLastParams(params);

    try {
      const response = await getAccurintReport(params);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'No report data found');
      }

      setReportData(response.data);
      return;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load report';
      setError(errorMessage);
      toast.error(errorMessage);
      if (isDev) console.error('[useAccurintReport] Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearReport = useCallback(() => {
    setReportData(null);
    setError(null);
    setLastParams(null);
  }, []);

  const refetch = useCallback(async () => {
    if (!lastParams) {
      if (isDev) console.warn('[useAccurintReport] Cannot refetch: no previous parameters');
      return;
    }
    await fetchReport(lastParams);
  }, [lastParams, fetchReport]);

  return {
    reportData,
    loading,
    error,
    fetchReport,
    clearReport,
    refetch
  };
}

export default useAccurintReport;
