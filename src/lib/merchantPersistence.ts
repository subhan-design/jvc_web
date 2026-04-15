import type { MerchantSignupData } from "@/components/merchant-application/types";

const MERCHANT_DATA_KEY = 'merchant_onboarding_data';
const MERCHANT_STEP_KEY = 'merchant_onboarding_step';
const MERCHANT_SESSION_KEY = 'merchant_onboarding_session';

export interface MerchantPersistenceData {
  data: MerchantSignupData;
  currentStep: number;
  sessionId: string;
  timestamp: number;
  isComplete: boolean;
}

/**
 * Generate a unique session ID for the current onboarding session
 */
export function generateSessionId(): string {
  return `merchant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Save merchant data to localStorage
 */
export function saveMerchantData(data: MerchantSignupData, currentStep: number): void {
  try {
    const sessionId = getCurrentSessionId() || generateSessionId();
    const persistenceData: MerchantPersistenceData = {
      data,
      currentStep,
      sessionId,
      timestamp: Date.now(),
      isComplete: false,
    };
    
    localStorage.setItem(MERCHANT_DATA_KEY, JSON.stringify(persistenceData));
    localStorage.setItem(MERCHANT_STEP_KEY, currentStep.toString());
    localStorage.setItem(MERCHANT_SESSION_KEY, sessionId);
  } catch (error) {
    console.error('Failed to save merchant data:', error);
  }
}

/**
 * Load merchant data from localStorage
 */
export function loadMerchantData(): MerchantPersistenceData | null {
  try {
    const saved = localStorage.getItem(MERCHANT_DATA_KEY);
    if (!saved) return null;
    
    const persistenceData: MerchantPersistenceData = JSON.parse(saved);
    
    // Check if data is not too old (7 days)
    const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    if (Date.now() - persistenceData.timestamp > MAX_AGE) {
      clearMerchantData();
      return null;
    }
    
    return persistenceData;
  } catch (error) {
    console.error('Failed to load merchant data:', error);
    return null;
  }
}

/**
 * Get current step from localStorage
 */
export function getCurrentStep(): number {
  try {
    const step = localStorage.getItem(MERCHANT_STEP_KEY);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Failed to get current step:', error);
    return 0;
  }
}

/**
 * Get current session ID
 */
export function getCurrentSessionId(): string | null {
  try {
    return localStorage.getItem(MERCHANT_SESSION_KEY);
  } catch (error) {
    console.error('Failed to get session ID:', error);
    return null;
  }
}

/**
 * Persist the current session id immediately to localStorage and update stored data if present
 */
export function setCurrentSessionId(sessionId: string): void {
  try {
    localStorage.setItem(MERCHANT_SESSION_KEY, sessionId);
    const saved = localStorage.getItem(MERCHANT_DATA_KEY);
    if (saved) {
      try {
        const parsed: MerchantPersistenceData = JSON.parse(saved);
        parsed.sessionId = sessionId;
        localStorage.setItem(MERCHANT_DATA_KEY, JSON.stringify(parsed));
      } catch (e) {
        // ignore parse errors
      }
    }
  } catch (error) {
    console.error('Failed to set current session id:', error);
  }
}

/**
 * Check if there's a saved onboarding session
 * Returns false if the session is older than 30 minutes
 */
export function hasSavedSession(): boolean {
  const data = loadMerchantData();
  if (!data || data.isComplete) {
    return false;
  }

  // Check if session is older than 30 minutes (1800000 ms)
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const timeSinceLastSave = Date.now() - data.timestamp;

  if (timeSinceLastSave > THIRTY_MINUTES) {
    // Session is too old, clear it and return false
    clearMerchantData();
    return false;
  }

  return true;
}

/**
 * Mark the current session as complete
 */
export function markSessionComplete(): void {
  try {
    const data = loadMerchantData();
    if (data) {
      data.isComplete = true;
      localStorage.setItem(MERCHANT_DATA_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Failed to mark session complete:', error);
  }
}

/**
 * Clear all merchant data from localStorage
 */
export function clearMerchantData(): void {
  try {
    localStorage.removeItem(MERCHANT_DATA_KEY);
    localStorage.removeItem(MERCHANT_STEP_KEY);
    localStorage.removeItem(MERCHANT_SESSION_KEY);
    localStorage.removeItem('vconnect_session_token');
  } catch (error) {
    console.error('Failed to clear merchant data:', error);
  }
}

/**
 * Get formatted time since last save
 */
export function getTimeSinceLastSave(): string {
  const data = loadMerchantData();
  if (!data) return '';

  const now = Date.now();
  const diff = now - data.timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Get step name for display
 */
export function getStepName(step: number): string {
  const stepNames = [
    'Personal Details',
    'Business Information', 
    'Location Details',
    'Ownership Information',
    'Bank Information',
    'Agreement & Terms'
  ];
  
  return stepNames[step] || 'Unknown Step';
}