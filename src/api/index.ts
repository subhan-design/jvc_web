// API interfaces for type safety (keeping interfaces but removing implementations)
export interface PreScreenSignupRequest {
  title: string;
  firstName: string;
  lastName: string;
  ssnLast4: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
  zipCode: string;
  referralCode?: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: string;
  };
}

export interface PreScreenSignupResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
    preScreenStatus: string;
  };
}

export interface CompleteRegistrationRequest {
  firstName: string;
  lastName: string;
  ssnLast4: string;
  routingNumber: string;
  accountNumber: string;
  driverLicenseFront: string;
  driverLicenseBack: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: string;
  };
}

// Merchant Payment Configuration API routes
export const merchantPaymentApi = {
  // Get payment configuration
  getPaymentConfig: () => fetch('/api/payment-config', { credentials: 'include' }),
  
  // Get payment schedule
  getPaymentSchedule: () => fetch('/api/payment-config/schedule', { credentials: 'include' }),
  
  // Update schedule decision
  updateScheduleDecision: (id: string, decision: 'Accepted' | 'Declined') => 
    fetch(`/api/payment-config/schedule/${encodeURIComponent(id)}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ decision })
    })
};