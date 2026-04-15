// Add at the top, after imports
const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
// ─────────────────────────────────────────────────────────────────────────────
// hooks/useApplicationDisclosures.ts
// Custom hook for fetching application disclosures using React Query
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query';
import { fetchApplicationDisclosures, type DisclosuresResponse } from '@/lib/api';

interface UseApplicationDisclosuresOptions {
  /** The sessionId string (e.g., "consumer_1767730688744_xbtvaqoat") */
  applicationId: string | number | null;
  enabled?: boolean;
}

/**
 * Custom hook to fetch application disclosures
 * Uses React Query for caching, loading states, and error handling
 *
 * @param options - Configuration options
 * @param options.applicationId - The sessionId string (e.g., "consumer_1767730688744_xbtvaqoat")
 * @param options.enabled - Whether the query should run automatically (default: true when applicationId exists)
 * @returns React Query result with data, loading, and error states
 */
export function useApplicationDisclosures({
  applicationId,
  enabled = true,
}: UseApplicationDisclosuresOptions) {
  // DEBUG: Log hook call
  if (isDev) console.log('[useApplicationDisclosures] Called with:', {
    applicationId,
    enabled,
    willFetch: enabled && !!applicationId
  });

  return useQuery<DisclosuresResponse, Error>({
    queryKey: ['applicationDisclosures', applicationId],
    queryFn: async () => {
      if (isDev) console.log('[useApplicationDisclosures] queryFn executing for applicationId:', applicationId);
      if (!applicationId) {
        throw new Error('Application ID is required');
      }
      return fetchApplicationDisclosures(applicationId);
    },
    enabled: enabled && !!applicationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
