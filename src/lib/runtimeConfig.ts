import { setApiBase } from '@/config/app';

type RuntimeConfig = {
  apiBaseUrl?: string;
  [key: string]: any;
};

let cached: RuntimeConfig | null = null;

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (cached) return cached;
  try {
    const res = await fetch('/runtime-config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch runtime-config.json: ${res.status}`);
    const json = (await res.json()) as RuntimeConfig;
    cached = json;
    
    // Check if environment-based config exists
    const env = json.environment || 'production';
    const envConfig = json[env] || {};
    
    // Use environment-specific apiBaseUrl or fall back to top-level
    const apiBaseUrl = envConfig.apiBaseUrl || json.apiBaseUrl;
    
    if (apiBaseUrl) {
      // Ensure HTTPS is used to avoid mixed content errors in production
      let apiUrl = apiBaseUrl;
      if (typeof window !== 'undefined' && window.location?.protocol === 'https:' && apiUrl.startsWith('http://')) {
        apiUrl = apiUrl.replace(/^http:\/\//i, 'https://');
      }
      setApiBase(apiUrl);
      console.log(`[Runtime Config] Using ${env} environment with API base: ${apiUrl}`);
    }
    // Also expose on window for debugging/other libs
    try {
      (window as any).__RUNTIME_CONFIG__ = json;
    } catch (e) {
      // ignore
    }
    return json;
  } catch (err) {
    // If runtime config isn't available, we silently continue using build-time env.
    // Log a warning so it's visible in browser devtools.
    // eslint-disable-next-line no-console
    console.warn('Could not load runtime-config.json, using build-time env values.', err);
    cached = {};
    return cached;
  }
}

export function getRuntimeConfig(): RuntimeConfig | null {
  return cached;
}
