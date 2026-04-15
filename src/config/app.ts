// Central app config
export const CLIENT_ID = (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_CLIENT_ID) || 'default_client';

// Exported as `let` so it can be updated at runtime by the runtime-config loader
export let API_BASE = (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL) || 'https://jvch-app.jvcpayments.com';

export function setApiBase(url: string) {
	if (url && typeof url === 'string') {
		try {
			// If the site is served over HTTPS, force API base to HTTPS to avoid mixed content
			if (typeof window !== 'undefined' && window.location && window.location.protocol === 'https:' && url.startsWith('http://')) {
				url = url.replace(/^http:\/\//i, 'https://');
			}
			API_BASE = url;
		} catch (e) {
			API_BASE = url;
		}
	}
}
