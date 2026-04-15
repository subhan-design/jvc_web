/**
 * Add a card for the consumer after hard bureau pull success
 * POST /api/v1/consumer/add-card/{sessionId}
 * No request body required
 */
export interface AddConsumerCardResponse {
  status: string;
  message: string;
  data?: {
    consumerId: string;
    cardNumber: string;
    cardExpiry: string;
  };
}

export async function addConsumerCard(sessionId: string): Promise<AddConsumerCardResponse> {
  if (!sessionId) throw new Error('Missing sessionId for add card');
  const url = `${getSecureApiBase()}/api/v1/consumer/add-card/${encodeURIComponent(sessionId)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
  });
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    let errorMsg = `Add card failed: ${res.status}`;
    if (contentType.includes('application/json')) {
      const errJson = await res.json();
      errorMsg = errJson.message || errorMsg;
    } else {
      errorMsg = await res.text().catch(() => errorMsg);
    }
    throw new Error(errorMsg);
  }
  if (contentType.includes('application/json')) {
    return res.json();
  } else {
    throw new Error('Unexpected response type for add card');
  }
}
// Adverse Action Endpoints
export interface AdverseActionRequest {
  userId: number;
  reason: string;
  details: string;
}

export interface AdverseActionResponse {
  status: string;
  message: string;
}

/**
 * Send soft adverse action (e.g., for validfi bank verification fail)
 * POST /adverse-action/soft
 */
export async function sendSoftAdverse(payload: AdverseActionRequest): Promise<AdverseActionResponse> {
  console.log('[AdverseAction] Sending soft adverse action:', payload);
  const res = await fetch(`${getSecureApiBase()}/adverse-action/soft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    console.error('[AdverseAction] Soft adverse action failed:', res.status, text);
    throw new Error(`Soft adverse action failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  console.log('[AdverseAction] Soft adverse action response:', data);
  return data;
}

/**
 * Send hard adverse action (e.g., for Experian hard bureau fail)
 * POST /adverse-action/hard
 */
export async function sendHardAdverse(payload: AdverseActionRequest): Promise<AdverseActionResponse> {
  console.log('[AdverseAction] Sending hard adverse action:', payload);
  const res = await fetch(`${getSecureApiBase()}/adverse-action/hard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    console.error('[AdverseAction] Hard adverse action failed:', res.status, text);
    throw new Error(`Hard adverse action failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  console.log('[AdverseAction] Hard adverse action response:', data);
  return data;
}
// ─────────────────────────────────────────────────────────────────────────────
// lib/api.ts
// API interfaces (backend integration removed)
// ─────────────────────────────────────────────────────────────────────────────

/* -------------------------------------------------------------------------- */
/*  Type definitions (keeping interfaces for type safety)                    */
/* -------------------------------------------------------------------------- */

export interface PreScreenSignupRequest {
  firstName: string;
  lastName: string;
  ssn: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
  zipCode: string;
  referralCode?: string;
  title?: string;
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

export interface PIDRequest {
  firstName: string;
  lastName: string;
  socialSecurityNo: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  addresses: Array<{
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
}

export interface PIDResponse {
  
  status: string;
  message: string;
  decision: string;
  decisionText: string;
  verified: boolean;
  referenceId: string;

}

export interface ICPreApprovalRequest {
  
  firstName: string,
  lastName: string,
  dob: string,
  ssn: string,
  addressLine1: string,
  city: string,
  state: string,
  zipCode: string,
}

export interface ICPreApprovalResponse {
  
  message: string,
  decisionCategory: string,

}

export interface DuplicateCheckRequest {
  ssn?: string;
  ein?: string;
  einOrSsnNumber?: string;
  email?: string;
  username?: string;
  hasBusinessLicense?: string;
}

export interface DuplicateCheckResponse {
  exists: boolean;
  message?: string;
}

export interface RequestOtpResponse {
  success: boolean;
  message: string;
  data: {
    userExists: boolean;
  };
}

/* -------------------------------------------------------------------------- */
/*  Accurint Report Types                                                     */
/* -------------------------------------------------------------------------- */

export type RiskStatus = 'H' | 'M' | 'L' | 'P'; // High, Moderate, Low, Pass

export interface AccurintReportData {
  id: number;
  businessId: number;
  onboardingSessionId: number;
  transactionId: string;
  queryId: string;
  seleId: number;
  orgId: number;
  ultId: number;
  evidenceRiskStatus: RiskStatus;
  businessRiskStatus: RiskStatus;
  fullResponse: Record<string, any>;
  pdfReport: string; // Base64 encoded PDF
  hasPdf: boolean;
  pdfSize: number;
  createdAt: string;
}

export interface AccurintReportResponse {
  success: boolean;
  message: string;
  data: AccurintReportData | null;
}

export interface AccurintReportRequest {
  applicationId?: number;
  onboardingSessionId?: number;
  businessId?: number;
  sessionId?: string;
}

export interface VerifyOtpResponse {
  userExists: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Application Disclosures Types                                            */
/* -------------------------------------------------------------------------- */

export interface DisclosureRow {
  label: string;
  value: string | React.ReactNode;
}

export interface DisclosureSection {
  name: string;
  rows: DisclosureRow[];
}

export interface DisclosuresData {
  title: string;
  effectiveDate?: string;
  sections: DisclosureSection[];
}

export interface DisclosuresResponse {
  success: boolean;
  message?: string;
  data: DisclosuresData & {
    snapshotId?: number;
    templateId?: number;
    version?: string;
  };
}

export interface AcceptDisclosureRequest {
  snapshotId: number;
  eSignature: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AcceptDisclosureResponse {
  success: boolean;
  message?: string;
  data?: string;
}

// Mock API functions for frontend-only mode
export async function requestOtp(phoneNumber: string): Promise<RequestOtpResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock: phone numbers containing "123" are considered existing users
  const userExists = phoneNumber.includes("123");
  
  return {
    success: true,
    message: "OTP sent successfully",
    data: { userExists }
  };
}

export async function verifyOtp(phoneNumber: string, code: string): Promise<{ userExists: boolean }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock: OTP "123456" is always valid
  if (code !== "123456") {
    throw new Error("Invalid or expired OTP");
  }
  
  // Mock: phone numbers containing "123" are considered existing users
  const userExists = phoneNumber.includes("123");
  
  return { userExists };
}

import { API_BASE } from '@/config/app';

// Helper to get API base URL with HTTPS enforcement on secure pages
function getSecureApiBase(): string {
  let base = API_BASE.replace(/\/$/, '');
  // If the page is served over HTTPS, ensure API calls also use HTTPS
  if (typeof window !== 'undefined' && window.location?.protocol === 'https:' && base.startsWith('http://')) {
    base = base.replace(/^http:\/\//i, 'https://');
  }
  return base;
}

//get the stored admin access token from localStorage
function getAdminToken(): string | null {
  try {
    return localStorage.getItem('admin_access_token');
  } catch (e) {
    console.warn('Failed to get admin token from localStorage:', e);
    return null;
  }
}


//includes the admin Bearer token

async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();

  console.log('[authenticatedFetch] Token from localStorage:', token);

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    console.log('[authenticatedFetch] Authorization header set:', `Bearer ${token.substring(0, 20)}...`);
  } else {
    console.warn('[authenticatedFetch] No token found in localStorage');
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });
}

export async function sendEmailOtp(email: string): Promise<RequestOtpResponse> {
  const response = await fetch(`${getSecureApiBase()}/api/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: email })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send OTP');
  }
  
  return response.json();
}

export async function verifyEmailOtp(email: string, otp: string): Promise<{ userExists: boolean }> {
  const response = await fetch(`${getSecureApiBase()}/api/otp-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: email, otp })
  });
  
  if (!response.ok) {
    throw new Error('Failed to verify OTP');
  }
  
  const result = await response.json();
  return { userExists: result.data.userExists };
}

// Convert US phone format (XXX) XXX-XXXX to +1XXXXXXXXXX
function formatPhoneForAPI(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `+1${digits}`;
}

export async function sendPhoneOtp(phone: string): Promise<RequestOtpResponse> {
  const digits = (phone || '').replace(/\D/g, '');
  const formattedPhone = formatPhoneForAPI(phone); // +1XXXXXXXXXX

  // Try E.164 first, then fallback to plain 10-digit if necessary
  try {
    const response = await fetch(`${getSecureApiBase()}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: formattedPhone })
    });

    if (response.ok) return response.json();
    // if server rejects, try fallback
    console.warn('sendPhoneOtp: E.164 send failed, attempting fallback');
  } catch (err) {
    console.warn('sendPhoneOtp: E.164 attempt errored, attempting fallback', err);
  }

  // Fallback: try 10-digit without country code if available
  if (digits.length === 10) {
    const fallback = digits;
    const response2 = await fetch(`${getSecureApiBase()}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: fallback })
    });

    if (!response2.ok) {
      throw new Error('Failed to send OTP');
    }

    return response2.json();
  }

  throw new Error('Failed to send OTP');
}

export async function verifyPhoneOtp(phone: string, otp: string): Promise<{ userExists: boolean }> {
  const digits = (phone || '').replace(/\D/g, '');
  const formattedPhone = formatPhoneForAPI(phone); // +1XXXXXXXXXX

  // Try E.164 first
  try {
    const response = await fetch(`${getSecureApiBase()}/api/otp-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: formattedPhone, otp })
    });

    if (response.ok) {
      const result = await response.json();
      return { userExists: result.data.userExists };
    }
    console.warn('verifyPhoneOtp: E.164 verify failed, attempting fallback');
  } catch (err) {
    console.warn('verifyPhoneOtp: E.164 attempt errored, attempting fallback', err);
  }

  // Fallback to 10-digit if available
  if (digits.length === 10) {
    const response2 = await fetch(`${getSecureApiBase()}/api/otp-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: digits, otp })
    });

    if (!response2.ok) {
      throw new Error('Failed to verify OTP');
    }

    const result2 = await response2.json();
    return { userExists: result2.data.userExists };
  }

  throw new Error('Failed to verify OTP');
}

// Document Capture API interfaces
export interface DocCaptureInitiateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  notificationRequired?: boolean;
}

export interface DocCaptureInitiateResponse {
  url?: string; 
  expRequestId: string;
  clientReferenceId: string;
}

export interface DocCaptureResultResponse {
  decision: string; // APPROVE, REJECT, etc.
  authResult: string; // PASS, FAIL, etc.
  matchResult: string; // true or false
  extractedData?: {
    fullName?: string;
    dateOfBirth?: string;
    classification?: string;
    issueState?: string;
    address?: string;
    city?: string;
    postal?: string;
  };
}

export async function generateDocCaptureUrl(request: DocCaptureInitiateRequest): Promise<DocCaptureInitiateResponse> {
  const formattedPhone = formatPhoneForAPI(request.phone);

  const response = await fetch(`${getSecureApiBase()}/api/experian/doccapture/generate-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...request,
      phone: formattedPhone,
      notificationRequired: request.notificationRequired ?? false
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to generate document capture URL: ${response.status} ${errorText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to generate document capture URL');
  }

  let captureUrl: string | undefined;
  try {
    const decisionElements = result.data.clientResponsePayload?.decisionElements || [];
    for (const element of decisionElements) {
      const records = element.records || [];
      for (const record of records) {
        const externalLookups = record.externalLookups || [];
        for (const lookup of externalLookups) {
          if (lookup.link?.url) {
            captureUrl = lookup.link.url;
            break;
          }
        }
        if (captureUrl) break;
      }
      if (captureUrl) break;
    }
  } catch (e) {
    console.error('Error extracting doc capture URL:', e);
  }

  // if (!captureUrl) {
  //   throw new Error('Document capture URL not found in response');
  // }

  return {
    url: captureUrl,
    expRequestId: result.data.responseHeader.expRequestId,
    clientReferenceId: result.data.responseHeader.clientReferenceId
  };
}

// export async function generateDocCaptureUrl(request: DocCaptureInitiateRequest): Promise<DocCaptureInitiateResponse> {
//   const formattedPhone = formatPhoneForAPI(request.phone);

//   const response = await fetch(`${getSecureApiBase()}/api/experian/doccapture/generate-url-with-sms`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       ...request,
//       phone: formattedPhone,
//       notificationRequired: request.notificationRequired ?? true  // Changed from false to true
//     })
//   });

//   if (!response.ok) {
//     const errorText = await response.text().catch(() => 'Unknown error');
//     throw new Error(`Failed to generate document capture URL: ${response.status} ${errorText}`);
//   }

//   const result = await response.json();

//   if (!result.success) {
//     throw new Error(result.message || 'Failed to generate document capture URL');
//   }

//   // Extract the URL from the nested structure
//   let captureUrl = '';
//   try {
//     const decisionElements = result.data.clientResponsePayload?.decisionElements || [];
//     for (const element of decisionElements) {
//       const records = element.records || [];
//       for (const record of records) {
//         const externalLookups = record.externalLookups || [];
//         for (const lookup of externalLookups) {
//           if (lookup.link?.url) {
//             captureUrl = lookup.link.url;
//             break;
//           }
//         }
//         if (captureUrl) break;
//       }
//       if (captureUrl) break;
//     }
//   } catch (e) {
//     console.error('Error extracting doc capture URL:', e);
//   }

//   if (!captureUrl) {
//     throw new Error('Document capture URL not found in response');
//   }

//   return {
//     url: captureUrl,
//     expRequestId: result.data.responseHeader.expRequestId,
//     clientReferenceId: result.data.responseHeader.clientReferenceId
//   };
//}

export async function getDocCaptureResults(expRequestId: string, clientReferenceId: string): Promise<DocCaptureResultResponse> {
  const response = await fetch(
    `${getSecureApiBase()}/api/experian/doccapture/results/${encodeURIComponent(expRequestId)}?clientReferenceId=${encodeURIComponent(clientReferenceId)}`
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to get document verification results: ${response.status} ${errorText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to get document verification results');
  }

  // Extract decision and authentication result
  const responseMessage = result.data.responseMessage || result.data.responsePayload || result.data;
  const overallResponse = responseMessage?.responseHeader?.overallResponse;
  const decision = overallResponse?.decision || 'UNKNOWN';
  const decisionReasons = overallResponse?.decisionReasons || [];

  //console.log("Response Message---", responseMessage);

  // Check if DecisionAggregator has completed
  const hasDecisionAggregator = decisionReasons.some((reason: string) =>
    reason.includes('DecisionAggregator')
  );

  // If DecisionAggregator hasn't completed, return PENDING
  if (!hasDecisionAggregator) {
    return {
      decision: 'PENDING',
      authResult: 'PENDING',
      matchResult: null,
      extractedData: {}
    };
  }

  let authResult = 'UNKNOWN';
  let matchResult = 'UNKNOWN';
  let extractedData: any = {};

  try {
    const decisionElements = responseMessage?.clientResponsePayload?.decisionElements || [];
    //console.log("Decision Elements---", decisionElements);
    for (const element of decisionElements) {
      const decisions = element.decisions || [];
      const matches = element.matches || [];

      // Find AUTHENTICATION_RESULT
      const authDecision = decisions.find((d: any) => d.element === 'AUTHENTICATION_RESULT');
      if (authDecision) {
        authResult = authDecision.value;
      }

      //--finds matchValidated result
      const matchDecision = matches.find((m: any) => m.name === 'matchValidated');
      if(matchDecision) {
        matchResult = matchDecision.value;
        //console.log("MatchValidated found:", matchResult);
      }

      //console.log("MatchValue----", matchResult);
      // Extract other fields
      decisions.forEach((d: any) => {
        if (d.element === 'fullName') extractedData.fullName = d.value;
        if (d.element === 'clearDateOfBirth') extractedData.dateOfBirth = d.value;
        if (d.element === 'Classification') extractedData.classification = d.value;
        if (d.element === 'issueState') extractedData.issueState = d.value;
        if (d.element === 'addressLine1') extractedData.address = d.value;
        if (d.element === 'city') extractedData.city = d.value;
        if (d.element === 'postal') extractedData.postal = d.value;
      });
    }
  } catch (e) {
    console.error('Error extracting doc capture results:', e);
  }

  return {
    decision,
    authResult,
    matchResult,
    extractedData
  };
}
// Mock functions for frontend-only mode

export async function createVConnectSession(customerData: any): Promise<{ sessionToken: string; url: string; customerId: string; expiration: string }> {
  const response = await fetch(`${getSecureApiBase()}/api/v1/vconnect/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData)
  });
  
  if (!response.ok) {
    // Try to read response body for diagnostics and extract structured errors
    let text: string | undefined;
    let parsed: any | undefined;
    try { parsed = await response.json(); text = JSON.stringify(parsed); } catch (e) { try { text = await response.text(); } catch (e2) { text = undefined; } }
    // If backend returned an errors array, collect messages
    let backendMsg = '';
    try {
      if (parsed && parsed.errors && Array.isArray(parsed.errors)) {
        backendMsg = parsed.errors.map((er: any) => er.message || JSON.stringify(er)).join('; ');
      } else if (parsed && parsed.message) {
        backendMsg = parsed.message;
      }
    } catch (e) {
      // ignore
    }

    const errMsg = `Failed to create vConnect session: ${response.status} ${response.statusText}${backendMsg ? ' - ' + backendMsg : text ? ' - ' + text : ''}`;
    
    const err: any = new Error(errMsg);
    err.status = response.status;
    err.responseText = text;
    err.responseJson = parsed;
    err.backendErrors = parsed?.errors;
    throw err;
  }

  const result = await response.json();
  // result.data expected to contain { sessionToken, url, customerId, expiration }
  console.log('createVConnectRes----', result);
  return result.data;
}

export async function getVConnectAccount(accountToken: string): Promise<any> {
  if (!accountToken) {
    const err: any = new Error('Missing account token');
    err.status = 400;
    throw err;
  }

  const res = await fetch(`${getSecureApiBase()}/api/v1/vconnect/accounts/${encodeURIComponent(accountToken)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    let text: string | undefined;
    try { const j = await res.json(); text = JSON.stringify(j); } catch (e) { try { text = await res.text(); } catch (e2) { text = undefined; } }
    const err: any = new Error(`Failed to get vConnect account: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const json = await res.json();
  console.log("getVConnectAccountRes------", json);
  // The controller wraps response in BaseResponse with `data` containing account DTO
  return json;
}

/**
 * Retrieve a vConnect session status by sessionToken. The backend webhook will write
 * an accountToken once the provider has linked an account. This endpoint returns
 * any session-level metadata (e.g. accountToken, connectType) so the frontend can
 * poll until the webhook has populated the accountToken.
 */
export async function getVConnectSession(sessionToken: string): Promise<any> {
  if (!sessionToken) {
    const err: any = new Error('Missing session token');
    err.status = 400;
    throw err;
  }

  const res = await fetch(`${getSecureApiBase()}/api/v1/vconnect/session/${encodeURIComponent(sessionToken)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    let text: string | undefined;
    try { const j = await res.json(); text = JSON.stringify(j); } catch (e) { try { text = await res.text(); } catch (e2) { text = undefined; } }
    const err: any = new Error(`Failed to get vConnect session: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    err.responseJson = (() => { try { return JSON.parse(text || 'null'); } catch (e) { return undefined; } })();
    throw err;
  }

  const json = await res.json();
  console.log("getVConnectSessionRes---", json);
  return json;
}

// Validifi VAccount92 verification interfaces
// export interface VAccountVerificationRequest {
//   uniqueID?: string;
//   firstName: string;
//   lastName: string;
//   ssn: string;
//   birthDate: string; // MM/DD/YYYY
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
//   bankAccount: string;
//   bankRouting: string;
// }

// Validifi VAccount113 verification interfaces
export interface VAccountVerificationRequest {
  uniqueID?: string;
  bankRouting: string;
  bankAccount: string;
  ein: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

// OLD v92 Response Structure (deprecated - kept for reference)
// export interface VAccountVerificationResponse {
//   result: string;        // "00" success, "99" error
//   resultCode: string;    // AVC1-AVC9, NV, AVC0
//   message: string;
//   bankName?: string;
// }

// NEW v113 Response Structure (vaccountBusiness)
export interface VAccountVerificationResponse {
  result: string;                    // "00" success, "99" error
  verificationDecision: string;      // "Pass", "Pass - Pattern", "Fail", "No Data"
  authenticationDecision: string;    // "Pass", "Fail", "No Data"
  errorMessage: string;              
  decisionStatus: string;            // "APPROVED" or "DECLINED" (computed by backend)
}

/**
 * Verify bank account information using Validifi VAccount API in Manual Enrollment case
 * POST /api/validifi/vaccount
 */
export async function verifyVAccount(request: VAccountVerificationRequest): Promise<VAccountVerificationResponse> {
  const res = await fetch(`${getSecureApiBase()}/api/validifi/vaccount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!res.ok) {
    let text: string | undefined;
    try {
      const j = await res.json();
      text = JSON.stringify(j);
    } catch (e) {
      try {
        text = await res.text();
      } catch (e2) {
        text = undefined;
      }
    }
    const err: any = new Error(`Failed to verify VAccount: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const json = await res.json();
  console.log("verifyVAccountRes---", json);
  return json;
}

export const postCompleteRegistration = async (userId: string, payload: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Mock registration completion:', { userId, payload });
  
  return {
    success: true,
    message: "Registration completed successfully (Mock)",
    data: {
      userId,
      status: "completed"
    }
  };
};

// Validation endpoints - call backend validation routes
export async function validateEmail(email: string): Promise<any> {
  const res = await fetch(`${getSecureApiBase()}/api/onboarding/validate/email?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Failed to validate email');
  return res.json();
}

export async function validatePhone(phone: string): Promise<any> {
  const digits = (phone || '').replace(/\D/g, '');
  const formatted = formatPhoneForAPI(phone); // +1XXXXXXXXXX

  // Try E.164 first
  try {
  const res = await fetch(`${getSecureApiBase()}/api/onboarding/validate/phone?phone=${encodeURIComponent(formatted)}`);
    if (res.ok) {
      const json = await res.json();
      // If backend indicates exists/available, return result immediately
      if (json && json.data && (json.data.exists === true || json.data.available === true)) {
        return json;
      }
      // If not found and we have a 10-digit number, try without country code
      if (digits.length === 10) {
        try {
          const res2 = await fetch(`${getSecureApiBase()}/api/onboarding/validate/phone?phone=${encodeURIComponent(digits)}`);
          if (res2.ok) {
            const json2 = await res2.json();
            return json2;
          }
        } catch (err) {
          console.warn('Phone fallback validation failed:', err);
        }
      }
      return json;
    } else {
      // Primary call failed; if we have 10 digits, try fallback
      if (digits.length === 10) {
  const res2 = await fetch(`${getSecureApiBase()}/api/onboarding/validate/phone?phone=${encodeURIComponent(digits)}`);
        if (!res2.ok) throw new Error('Failed to validate phone');
        return res2.json();
      }
      throw new Error('Failed to validate phone');
    }
  } catch (err) {
    // If primary throws (network), attempt fallback before giving up
    if (digits.length === 10) {
      try {
  const res2 = await fetch(`${getSecureApiBase()}/api/onboarding/validate/phone?phone=${encodeURIComponent(digits)}`);
        if (!res2.ok) throw new Error('Failed to validate phone');
        return res2.json();
      } catch (err2) {
        console.error('Phone validation both attempts failed', err2);
        throw err2;
      }
    }
    throw err;
  }
}

export async function validateEin(ein: string): Promise<any> {
  const res = await fetch(`${getSecureApiBase()}/api/onboarding/validate/ein?ein=${encodeURIComponent(ein)}`);
  if (!res.ok) throw new Error('Failed to validate EIN');
  return res.json();
}

export async function validateSSN(ssn: string): Promise<any> {
  const res = await fetch(`${getSecureApiBase()}/api/onboarding/validate/ssn?ssn=${encodeURIComponent(ssn)}`);
  if (!res.ok) throw new Error('Failed to validate SSN');
  return res.json();
}

export async function validateReferralCode(code: string): Promise<any> {
  const res = await fetch(`${getSecureApiBase()}/api/consumer/referrals/validate?code=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Failed to validate referral code');
  return res.json();
}

// Onboarding session helpers
export async function createOnboardingSession(clientId: string, sessionId?: string): Promise<any> {
  console.log('[createOnboardingSession] Creating session for clientId:', clientId, 'sessionId:', sessionId);
  const url = `${getSecureApiBase()}/api/onboarding/session`;
  console.log('[createOnboardingSession] URL:', url);

  const body: any = { clientId };
  if (sessionId) body.sessionId = sessionId;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  console.log('[createOnboardingSession] Response status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    console.error('[createOnboardingSession] Error response:', errorText);
    throw new Error('Failed to create onboarding session');
  }
  
  const data = await res.json();
  console.log('[createOnboardingSession] Session created:', data);
  return data;
}

export async function getOnboardingSession(sessionId: string): Promise<any> {
  console.log('[getOnboardingSession] Fetching session for ID:', sessionId);
  const url = `${getSecureApiBase()}/api/onboarding/session/${encodeURIComponent(sessionId)}`;
  console.log('[getOnboardingSession] URL:', url);
  
  const res = await authenticatedFetch(url);
  
  console.log('[getOnboardingSession] Response status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    console.error('[getOnboardingSession] Error response:', errorText);
    throw new Error('Failed to get onboarding session');
  }
  
  const data = await res.json();
  console.log('[getOnboardingSession] Session data:', data);
  return data;
}

/**
 * Get application details by application ID (for admin review)
 */
export async function getApplicationById(applicationId: string | number): Promise<any> {
  console.log('[getApplicationById] Fetching application for ID:', applicationId);
  const url = `${getSecureApiBase()}/api/applications/${encodeURIComponent(applicationId)}`;
  console.log('[getApplicationById] URL:', url);
  
  const res = await authenticatedFetch(url);
  
  console.log('[getApplicationById] Response status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    console.error('[getApplicationById] Error response:', errorText);
    throw new Error('Failed to get application');
  }
  
  const data = await res.json();
  console.log('[getApplicationById] Application data:', data);
  return data;
}

/**
 * Verify a cannabis/psilocybin license via Cannabiz proxy endpoint.
 * Calls GET /verify-license?license_id=...&state=..&country=...
 * Returns the normalized array of license DTOs when successful.
 */
export async function verifyCannabisLicense(licenseId: string, state: string, country = 'USA'): Promise<any> {
  if (!licenseId || !state) {
    const err: any = new Error('Missing licenseId or state for Cannabiz verification');
    err.status = 400;
    throw err;
  }

  const url = `${getSecureApiBase()}/verify-license?license_id=${encodeURIComponent(licenseId)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    // try to read message
    let text: string | undefined;
    try { const j = await res.json(); text = JSON.stringify(j); } catch (e) { try { text = await res.text(); } catch (e2) { text = undefined; } }
    const err: any = new Error(`Cannabiz verification failed: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  // Parse JSON — endpoint may return BaseResponse or raw array
  const json = await res.json();
  const arr = Array.isArray(json) ? json : json?.data || json;
  console.log("-----Cannabis Call successfully made", json);
  return { success: true, data: arr, raw: json };
}

export async function saveOnboardingStep(sessionId: string, step: number, payload: any): Promise<any> {
  // Extract optional applicationStatus, reason, and checkOnly from payload (if present)
  const { applicationStatus, reason, checkOnly, ...stepData } = payload;

  // Map step to endpoint and key
  let path = '';
  let body: any = { sessionId };
  switch (step) {
    case 0:
      path = 'personal';
      body.personalDetails = stepData;
      break;
    case 1:
      path = 'business';
      body.businessInformation = stepData;
      break;
    case 2:
      path = 'ownership';
      body.ownership = stepData;
      break;
    case 3:
      path = 'bank';
      body.bankInformation = stepData;
      break;
    case 4:
      path = 'agreement';
      body.agreement = stepData;
      break;
    default:
      // Unsupported step index — avoid calling a non-existent backend route
      const err: any = new Error(`Unsupported onboarding step index: ${step}`);
      err.status = 400;
      err.responseText = JSON.stringify({ success: false, message: `Unsupported onboarding step index: ${step}` });
      throw err;
  }

  // Basic guard
  if (!sessionId) {
    const err: any = new Error('Missing sessionId when saving onboarding step');
    err.status = 400;
    throw err;
  }

  // Add optional checkOnly flag at the top level if provided
  if (checkOnly !== undefined) {
    body.checkOnly = checkOnly;
  }

  // Add optional applicationStatus and reason at the top level if provided
  if (applicationStatus !== undefined) {
    body.applicationStatus = applicationStatus;
  }
  if (reason !== undefined) {
    body.reason = reason;
  }

  // Debug: log the outgoing payload in dev-mode to help trace 400s
  try {
    // eslint-disable-next-line no-console
    console.debug('[api] saveOnboardingStep', { sessionId, step, path, body });
  } catch (_) {}

  // Include the step in the outgoing body so backend can validate which step this is
  body.step = step;

  const res = await fetch(`${getSecureApiBase()}/api/onboarding/step/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  }

  // Try to read response body for diagnostics
  let text: string | undefined;
  try {
    // Attempt JSON first
    const json = await res.json();
    text = JSON.stringify(json);
  } catch (e) {
    try {
      text = await res.text();
    } catch (e2) {
      text = undefined;
    }
  }

  const err: any = new Error(`Failed to save onboarding step: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
  err.status = res.status;
  err.responseText = text;
  throw err;
}

export async function submitOnboardingSession(
  sessionId: string,
  applicationStatus?: string | null,
  reason?: string | null,
  accurintResult?: any
): Promise<any> {
  const res = await fetch(`${getSecureApiBase()}/api/onboarding/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      ...(applicationStatus && { applicationStatus }),
      ...(reason && { reason }),
      ...(accurintResult && { accurintResult })
    })
  });

  // On success, return parsed JSON
  if (res.ok) {
    try {
      return await res.json();
    } catch (e) {
      // If parsing fails, at least return raw text
      const text = await res.text().catch(() => '');
      return { success: true, raw: text };
    }
  }

  // Read response body (JSON or text) for diagnostics
  let text: string | undefined;
  try {
    const json = await res.json();
    text = JSON.stringify(json);
  } catch (e) {
    try {
      text = await res.text();
    } catch (e2) {
      text = undefined;
    }
  }

  const err: any = new Error(`Failed to submit onboarding session: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
  err.status = res.status;
  err.responseText = text;
  throw err;
}

/**
 * Upload document metadata associated with a session as form-data.
 * The backend expects a POST to /api/onboarding/session/:sessionId/files with form-data
 */
export async function uploadSessionFiles(sessionId: string, files: Array<{ name: string; type?: string; url?: string; dataUrl?: string }>) {
  if (!sessionId) throw new Error('Missing sessionId for file upload');

  // Create form-data with file metadata
  const formData = new FormData();

  // Add files metadata as JSON in a field called 'metadata'
  formData.append('metadata', JSON.stringify(files));

  const res = await fetch(`${getSecureApiBase()}/api/onboarding/session/${encodeURIComponent(sessionId)}/files`, {
    method: 'POST',
    body: formData
  });

  if (res.ok) return res.json();

  let text: string | undefined;
  try { text = JSON.stringify(await res.json()); } catch (e) { try { text = await res.text(); } catch (e2) { text = undefined; } }
  const err: any = new Error(`Failed to upload session files: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
  err.status = res.status;
  err.responseText = text;
  throw err;
}

/**
 * Upload agreement document files using FormData
 * The backend expects a POST to /api/onboarding/session/:sessionId/files with form-data
 */
export async function uploadAgreementFiles(sessionId: string, files: File[]) {
  if (!sessionId) throw new Error('Missing sessionId for file upload');

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const res = await fetch(`${getSecureApiBase()}/api/onboarding/session/${encodeURIComponent(sessionId)}/files`, {
    method: 'POST',
    body: formData
  });

  if (res.ok) return res.json();

  let text: string | undefined;
  try { text = JSON.stringify(await res.json()); } catch (e) { try { text = await res.text(); } catch (e2) { text = undefined; } }
  const err: any = new Error(`Failed to upload agreement files: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
  err.status = res.status;
  err.responseText = text;
  throw err;
}

/**
 * Upload business license file 
 * POST /api/onboarding/session/:sessionId/license-file
 */
export async function uploadLicenseFile(
  sessionId: string,
  licenseFile: File,
): Promise<any> {
  if (!sessionId) throw new Error('Missing sessionId for license file upload');
  if (!licenseFile) throw new Error('Missing license file');

  const formData = new FormData();
  formData.append('licenseFile', licenseFile);

  // console.log('[API] Uploading license file:', {
  //   sessionId,
  //   fileName: licenseFile.name,
  //   fileSize: licenseFile.size,
  // });

  const res = await fetch(
    `${getSecureApiBase()}/api/onboarding/session/${encodeURIComponent(sessionId)}/license-file`,
    {
      method: 'POST',
      body: formData
    }
  );

  if (res.ok) {
    const result = await res.json();
    console.log('[API] License file uploaded successfully:', result);
    return result;
  }

  let text: string | undefined;
  try {
    text = JSON.stringify(await res.json());
  } catch (e) {
    try {
      text = await res.text();
    } catch (e2) {
      text = undefined;
    }
  }

  const err: any = new Error(
    `Failed to upload license file: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`
  );
  err.status = res.status;
  err.responseText = text;
  throw err;
}

/**
 * Upload agreement documents with metadata to backend
 * POST /api/onboarding/session/:sessionId/documents
 */
import type { DocumentMetadata } from './pdfGenerator';

export interface DocumentToUpload {
  file: File;
  metadata: DocumentMetadata;
}

/**
 * Upload a single agreement document
 * Backend expects ONE document per request
 */
async function uploadSingleDocument(
  sessionId: string,
  doc: DocumentToUpload
): Promise<any> {
  const formData = new FormData();

  // Add single file
  formData.append('file', doc.file);

  // Add document type
  formData.append('documentType', doc.metadata.documentType);

  // Add other metadata fields
  formData.append('fileName', doc.metadata.fileName);
  formData.append('documentVersion', doc.metadata.documentVersion);
  formData.append('merchantFullName', doc.metadata.merchantFullName);
  if (doc.metadata.signatureDataUrl) {
    formData.append('signatureDataUrl', doc.metadata.signatureDataUrl);
  }
  formData.append('acceptedAt', doc.metadata.acceptedAt);

  console.log(`[API] Uploading document: ${doc.metadata.documentType}`);

  const res = await fetch(
    `${getSecureApiBase()}/api/onboarding/session/${encodeURIComponent(sessionId)}/documents`,
    {
      method: 'POST',
      body: formData
      // Don't set Content-Type - browser will set it with boundary
    }
  );

  if (res.ok) {
    const result = await res.json();
    console.log(`[API] ✓ Uploaded ${doc.metadata.documentType}:`, result);
    return result;
  }

  // Handle error
  let text: string | undefined;
  try {
    text = JSON.stringify(await res.json());
  } catch (e) {
    try {
      text = await res.text();
    } catch (e2) {
      text = undefined;
    }
  }

  const err: any = new Error(
    `Failed to upload ${doc.metadata.documentType}: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`
  );
  err.status = res.status;
  err.responseText = text;
  throw err;
}

/**
 * Upload multiple agreement documents (one at a time) - MERCHANT VERSION
 * Returns array of successfully uploaded documents
 */
export async function uploadAgreementDocuments(
  sessionId: string,
  documents: DocumentToUpload[]
): Promise<any[]> {
  if (!sessionId) throw new Error('Missing sessionId for document upload');
  if (documents.length === 0) throw new Error('No documents to upload');

  console.log(`[API] Uploading ${documents.length} documents one at a time...`);

  const uploadedDocuments: any[] = [];
  const errors: Array<{ documentType: string; error: any }> = [];

  // Upload each document individually
  for (const doc of documents) {
    try {
      const result = await uploadSingleDocument(sessionId, doc);
      uploadedDocuments.push(result);
    } catch (error) {
      console.error(`[API] ✗ Failed to upload ${doc.metadata.documentType}:`, error);
      errors.push({ documentType: doc.metadata.documentType, error });
    }
  }

  // Report results
  console.log(`[API] Upload complete: ${uploadedDocuments.length}/${documents.length} successful`);

  if (errors.length > 0) {
    const errorMsg = `Failed to upload ${errors.length} document(s): ${errors.map(e => e.documentType).join(', ')}`;
    console.error(`[API] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  return uploadedDocuments;
}


// Uploads single consumer document
async function uploadSingleConsumerDocument(
  consumerId: string,
  doc: DocumentToUpload
): Promise<any> {
  const formData = new FormData();

  // Add single file
  formData.append('file', doc.file);

  console.log(`[API] Uploading consumer document: ${doc.metadata.documentType}`);

  const url = `${getSecureApiBase()}/api/v1/consumer/onboarding/session/${encodeURIComponent(consumerId)}/documents?documentType=${encodeURIComponent(doc.metadata.documentType)}`;

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const result = await res.json();
    console.log(`Uploaded consumer document ${doc.metadata.documentType}:`, result);
    return result;
  }

  let text: string | undefined;
  try {
    text = JSON.stringify(await res.json());
  } catch (e) {
    try {
      text = await res.text();
    } catch (e2) {
      text = undefined;
    }
  }

  const err: any = new Error(
    `Failed to upload consumer document ${doc.metadata.documentType}: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`
  );
  err.status = res.status;
  err.responseText = text;
  throw err;
}


// Uploads multiple consumer agreement documents (one at a time)
export async function uploadConsumerAgreementDocuments(
  consumerId: string,
  documents: DocumentToUpload[]
): Promise<any[]> {
  if (!consumerId) throw new Error('Missing consumerId for document upload');
  if (documents.length === 0) throw new Error('No documents to upload');

  console.log(`[API] Uploading ${documents.length} consumer documents one at a time...`);

  const uploadedDocuments: any[] = [];
  const errors: Array<{ documentType: string; error: any }> = [];

  // Upload each document individually
  for (const doc of documents) {
    try {
      const result = await uploadSingleConsumerDocument(consumerId, doc);
      uploadedDocuments.push(result);
    } catch (error) {
      console.error(`[API] ✗ Failed to upload consumer document ${doc.metadata.documentType}:`, error);
      errors.push({ documentType: doc.metadata.documentType, error });
    }
  }

  // Report results
  console.log(`[API] Upload complete: ${uploadedDocuments.length}/${documents.length} successful`);

  if (errors.length > 0) {
    const errorMsg = `Failed to upload ${errors.length} consumer document(s): ${errors.map(e => e.documentType).join(', ')}`;
    console.error(`[API] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  return uploadedDocuments;
}

// Cannabiz License Verification API interfaces
export interface CannabizLicenseVerificationRequest {
  license_id: string;
  state: string;
  country: string;
}

export interface CannabizViolation {
  $type: string;
  $id: string;
  $cnb_link: string;
  comments: string;
  category: string;
  subcategories: string[];
  value: number;
  date: string;
  last_verified: string;
  associated_via: string | null;
  attachments: any[];
}

export interface CannabizLicenseData {
  $type: string;
  $id: string;
  $cnb_link: string;
  id: string;
  tradename: string;
  license_id: string;
  market: string[];
  normalized_license_id: string;
  state: string;
  country: string;
  country_subdivision: string | null;
  status: string;
  status_description: string;
  license_description: string;
  date_created: string;
  last_updated: string;
  last_verified: string;
  license_start_date: string;
  expiration_date: string;
  state_application_id: string;
  alt_names: string[];
  dba_names: string[];
  business_id: string;
  products: string[];
  website_url: string;
  violations: CannabizViolation[];
  $request: {
    country: string;
    state: string;
    license_id: string;
    id: string | null;
  };
}

export interface CannabizLicenseVerificationResponse {
  success: boolean;
  message: string;
  data: CannabizLicenseData[] | null;
  errors: any[] | null;
}

/**
 * Verify a cannabis/psilocybin license with Cannabiz API
 * GET /verify-license?license_id=ACRE.0015697&state=CT&country=USA
 */
export async function verifyCannabizLicense(
  request: CannabizLicenseVerificationRequest
): Promise<CannabizLicenseVerificationResponse> {
  const params = new URLSearchParams({
    license_id: request.license_id,
    state: request.state,
    country: request.country
  });

  const response = await fetch(
    `${getSecureApiBase()}/api/cannabiz/verify-license?${params.toString()}`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to verify license: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return result;
}

// -----------------------------
// Accurint evaluate endpoint
// -----------------------------

export interface AccurintEvaluateRequest {
  companyName: string;
  streetAddress1?: string;
  city?: string;
  state?: string;
  zip5?: string;
  phone?: string;
  tin?: string;
  businessId?: number; // optional, persisted server-side when present
  sessionId?: string; // session ID to link report to session
}

export interface AccurintEvaluateResponse {
  success: boolean;
  message?: string;
  data?: {
    found?: boolean;
    seleId?: number;
    evidenceIndicator?: string;
    riskIndicator?: string;
    businessInsightSection?: any;
    decision?: string;
    reason?: string;
    individuals?: any[];
    pdf?: string; // Base64-encoded PDF from LexisNexis
  };
}

/**
 * Helper function to convert base64 string to Blob
 */
export function base64ToBlob(base64: string, type: string = 'application/pdf'): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  return new Blob([new Uint8Array(byteArrays)], { type });
}

/**
 * POST /api/v1/business/accurint/evaluate
 * Submits business lookup payload to Accurint evaluate proxy and returns the parsed JSON.
 */
export async function accurintEvaluateBusiness(body: AccurintEvaluateRequest): Promise<AccurintEvaluateResponse> {
  if (!body || !body.companyName) {
    const err: any = new Error('Missing companyName for Accurint evaluate');
    err.status = 400;
    throw err;
  }

  const url = `${getSecureApiBase()}/api/v1/business/accurint/evaluate`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body || {}),
  });

  const text = await res.text().catch(() => '');
  // Try to parse JSON if possible
  let parsed: any = undefined;
  try { parsed = text ? JSON.parse(text) : undefined; } catch (e) { parsed = undefined; }

  if (!res.ok) {
    const err: any = new Error(`Accurint evaluate failed: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    err.responseJson = parsed;
    throw err;
  }

  // When the backend returns success wrapper
  if (parsed && typeof parsed === 'object') {
    return parsed as AccurintEvaluateResponse;
  }

  // Fallback to raw text
  return { success: true, message: text, data: parsed };
}

/**
 * POST /api/merchant/decision/bridger/search/simple
 * Sends a Bridger/WorldCompliance search payload and returns parsed JSON.
 * body: { entities: [...], searchType: 'List Screening' | 'World Compliance' }
 */
export async function bridgerSearch(payload: any): Promise<any> {
  const url = `${getSecureApiBase()}/api/merchant/decision/bridger/search/simple`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload || {}),
  });

  const text = await res.text().catch(() => '');
  let parsed: any = undefined;
  try { parsed = text ? JSON.parse(text) : undefined; } catch (e) { parsed = undefined; }

  if (!res.ok) {
    const err: any = new Error(`Bridger search failed: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    err.status = res.status;
    err.responseText = text;
    err.responseJson = parsed;
    throw err;
  }

  return parsed ?? { success: true, data: text };
}

// Provider integrations (Bridger/WorldCompliance) were removed from the
// frontend API helpers. The only remaining provider helper here is the
// Accurint evaluate helper above. Provider credentials and richer
// integration logic should be implemented server-side.

// -----------------------------
// Payment Configuration API
// -----------------------------

export interface PaymentConfigurationRequest {
  businessId: number;
  feePercentage: number;
  minimumFee: number;
  state: string;
}

export interface PaymentConfigurationResponse {
  id: number;
  businessId: number | null;
  businessName: string | null;
  feePercentage: number;
  minimumFee: number;
  state: string;
  approvalStatus: string;
  isActive: boolean;
  createdDate: string;
  createdByName: string;
  lastModifiedDate: string;
  approvedAt?: string;
  approvedBy?: string;
  activatedAt?: string;
  sessionId?: string;
  applicationStatus?: string | null;
  currentStep?: number | null;
}

export interface SurchargeHistoryItem {
  id: number;
  businessId: number;
  feePercentage: number;
  minimumFee: number;
  state: string;
  effectiveDate: string;
  createdAt: string;
}

export interface ActiveSurchargeResponse {
  id: number;
  businessId: number;
  feePercentage: number;
  minimumFee: number;
  state: string;
  effectiveDate: string;
}

/**
 * POST /api/admin/payment-configuration
 * Create a new payment configuration (Admin only)
 */
export async function createPaymentConfiguration(
  config: PaymentConfigurationRequest
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/payment-configuration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to create payment configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * POST /api/admin/payment-configuration/approve
 * Approve a pending payment configuration (Admin only)
 */
export async function approvePaymentConfiguration(
  configurationId: number,
  approved: boolean = true,
  rejectionReason?: string,
  adminNotes?: string
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/payment-configuration/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      configurationId,
      approved,
      rejectionReason,
      adminNotes
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to approve payment configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * POST /api/admin/payment-configuration/secondary-approve
 * Secondary approval for a payment configuration (Admin only)
 */
export async function secondaryApprovePaymentConfiguration(
  configurationId: number,
  approved: boolean = true,
  rejectionReason?: string,
  adminNotes?: string
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/payment-configuration/secondary-approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      configurationId,
      approved,
      rejectionReason,
      adminNotes,
      isSecondaryApproval: true
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to secondary approve payment configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * PUT /api/admin/payment-configuration/{id}
 * Update a pending payment configuration (Admin only)
 */
export async function updatePaymentConfiguration(
  id: number,
  config: PaymentConfigurationRequest
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/payment-configuration/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to update payment configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/admin/payment-configuration/pending
 * Get all payment configurations including session-only ones (Admin only)
 */
export async function getAllPaymentConfigurations(): Promise<PaymentConfigurationResponse[]> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/payment-configuration/pending`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get configurations: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/admin/payment-configuration/merchant/{businessId}
 * Get all configurations for a specific merchant (Admin only)
 */
export async function getMerchantPaymentConfigurations(
  businessId: number
): Promise<PaymentConfigurationResponse[]> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/admin/payment-configuration/merchant/${businessId}`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get merchant configurations: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/admin/payment-configuration/merchant/{businessId}/active
 * Get active configuration for a specific merchant (Admin only)
 */
export async function getActiveMerchantPaymentConfiguration(
  businessId: number
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/admin/payment-configuration/merchant/${businessId}/active`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get active merchant configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/onboarding/payment-configuration/session/{sessionId}
 * Get payment configuration by onboarding session ID (no auth required — merchant-facing)
 */
export async function getPaymentConfigurationBySession(
  sessionId: string
): Promise<PaymentConfigurationResponse> {
  const res = await fetch(
    `${getSecureApiBase()}/api/onboarding/payment-configuration/session/${encodeURIComponent(sessionId)}`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get payment configuration by session: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const json = await res.json();
  return json.data ?? json;
}

/**
 * POST /api/admin/payment-configuration/{id}/activate
 * Activate an approved payment configuration (Admin only)
 */
export async function activatePaymentConfiguration(
  configurationId: number
): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/admin/payment-configuration/${configurationId}/activate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to activate payment configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/merchant/surcharge/history?page=0&size=10
 * Get surcharge history for a merchant (paginated)
 */
export async function getSurchargeHistory(
  page: number = 0,
  size: number = 10
): Promise<{content: SurchargeHistoryItem[], totalElements: number, totalPages: number}> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/merchant/surcharge/history?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get surcharge history: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

export interface ActiveSurchargeItem {
  id: number;
  merchantName: string;
  state: string;
  feePercentage: number;
  minimumFee: number;
  effectiveDate: string;
  adminNotes?: string;
}

/**
 * GET /api/merchant/surcharge/active/all
 * Get all active surcharge configurations
 */
export async function getAllActiveSurcharges(): Promise<ActiveSurchargeItem[]> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/merchant/surcharge/active/all`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get all active surcharges: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/merchant/surcharge/active
 * Get active surcharge configuration for a merchant
 */
export async function getActiveSurcharge(): Promise<ActiveSurchargeResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/merchant/surcharge/active`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    if (res.status === 404) {
      // No active surcharge found
      const err: any = new Error('No active surcharge found');
      err.status = 404;
      throw err;
    }
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get active surcharge: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/merchant/surcharge/configuration
 * Get current payment configuration for a merchant
 */
export async function getMerchantConfiguration(): Promise<PaymentConfigurationResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/merchant/surcharge/configuration`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get merchant configuration: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/merchant/surcharge/configurations
 * Get all configurations for the merchant
 */
export async function getAllMerchantConfigurations(): Promise<PaymentConfigurationResponse[]> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/merchant/surcharge/configurations`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get merchant configurations: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/merchant/surcharge/history/all
 * Get all surcharge history (non-paginated)
 */
export async function getAllSurchargeHistory(): Promise<SurchargeHistoryItem[]> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/merchant/surcharge/history/all`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get all surcharge history: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * Admin: Get in-progress onboarding sessions
 * GET /api/admin/onboarding-sessions/in-progress
 */
export async function getInProgressOnboardingSessions(): Promise<{
  count: number;
  sessions: Array<{
    id: string;
    created_at: string;
    name: string;
    person:string;
    phone: string;
    current_step: number;
  }>;
}> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/onboarding-sessions/in-progress`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get in-progress sessions: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * Admin: Get completed onboarding sessions, Approved and Declined
 * GET /api/admin/onboarding-sessions/completed
 */
export async function getCompletedOnboardingSessions(): Promise<{
  approved_count: number;
  declined_count: number;
  sessions: Array<{
    state: string;
    person: string;
    id: string;
    created_at: string;
    name: string;
    phone: string;
    application_status: string;
  }>;
}> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/onboarding-sessions/completed`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get completed sessions: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * Admin: Get manual review onboarding sessions
 * GET /api/admin/onboarding-sessions/manual-review
 */
export async function getManualReviewOnboardingSessions(): Promise<{
  sessions: Array<{
    id: string;
    date: string;
    name: string;
    reason: string;
  }>;
}> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/onboarding-sessions/manual-review`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to get manual review sessions: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * Update investigation and decision for an onboarding application
 * POST /api/admin/onboarding-sessions/update-investigation
 */
export async function updateInvestigation(params: {
  applicationId: number;
  investigation: string;
  conclusion: string;
  applicationStatus: 'Approved' | 'Declined';
  updatedBy: string;
}): Promise<any> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/onboarding-sessions/update-investigation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to update investigation: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/* -------------------------------------------------------------------------- */
/*  Accurint Report API                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Get Accurint report for an application/business
 * GET /api/admin/onboarding-sessions/accurint-report
 * Requires admin authentication
 * @param params - Query parameters (use ONE of: applicationId, onboardingSessionId, or businessId)
 */
export async function getAccurintReport(
  params: AccurintReportRequest
): Promise<AccurintReportResponse> {
  // Validate that at least one parameter is provided
  if (!params.sessionId && !params.applicationId && !params.onboardingSessionId && !params.businessId) {
    throw new Error('Please provide sessionId, applicationId, onboardingSessionId, or businessId');
  }

  // Build query string — sessionId (string) takes priority when available
  const queryParams = new URLSearchParams();
  if (params.sessionId) {
    queryParams.set('sessionId', params.sessionId);
  } else if (params.applicationId) {
    queryParams.set('applicationId', params.applicationId.toString());
  } else if (params.onboardingSessionId) {
    queryParams.set('onboardingSessionId', params.onboardingSessionId.toString());
  } else if (params.businessId) {
    queryParams.set('businessId', params.businessId.toString());
  }

  const url = `${getSecureApiBase()}/api/admin/onboarding-sessions/accurint-report?${queryParams}`;
  console.log('[getAccurintReport] Fetching report from:', url);

  const res = await authenticatedFetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ 
      success: false, 
      message: `HTTP ${res.status}: Failed to fetch Accurint report` 
    }));
    
    console.error('[getAccurintReport] Error:', errorData);
    throw new Error(errorData.message || 'Failed to fetch Accurint report');
  }

  const data: AccurintReportResponse = await res.json();

  // Extract PDF from fullResponse if not already in pdfReport
  if (data.data && !data.data.pdfReport && data.data.fullResponse) {
    try {
      // Try to extract PDF from nested structure: fullResponse.response.Header.Pdf
      const pdf= data.data.fullResponse?.TopBusinessReportResponseEx.response?.Pdf;
       console.log('[getAccurintReport] Extracted PDF from TopBusinessReportResponseEx, length:', pdf?.length);
      if (pdf) {
        console.log('[getAccurintReport] Extracted PDF from fullResponse, length:', pdf.length);
        data.data.pdfReport = pdf;
        data.data.hasPdf = true;
        data.data.pdfSize = pdf.length;
      }
    } catch (err) {
      console.warn('[getAccurintReport] Failed to extract PDF from fullResponse:', err);
    }
  }
  
  return data;
}

/* -------------------------------------------------------------------------- */
/*  Admin Authentication                                                      */
/* -------------------------------------------------------------------------- */

export interface AdminLoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: number;
      email: string;
      name?: string;
      role?: string;
    };
    token?: string;
  };
}

//admin login
export async function adminLogin(credentials: AdminLoginRequest): Promise<AdminLoginResponse> {
  const res = await fetch(`${getSecureApiBase()}/api/admin/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Login failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

//admin logout
export async function adminLogout(): Promise<{ success: boolean; message: string }> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/admin/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Logout failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

//-----consumer onboarding endpoints
export async function preScreenVerification(payload: PreScreenSignupRequest): Promise<PreScreenSignupResponse> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/v1/consumer/pre-screen-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Pre screen verification failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

export async function pid20Verification(payload: PIDRequest): Promise<any> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/v1/crosscore-test/verify-pid20`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`PID20 verification failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

export async function pid06Verification(payload: PIDRequest): Promise<any> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/v1/crosscore-test/verify-pid06`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`PID06 verification failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

export async function icPreApprovalVerification(payload: ICPreApprovalRequest): Promise<any> {
  const res = await authenticatedFetch(`${getSecureApiBase()}/api/v1/consumer/pre-approval-ic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`PreApproval verification failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}


// Save consumer onboarding step data, signup, offer, bank, agreements

export async function saveConsumerOnboardingStep(
  stepName: 'signup' | 'offer' | 'bank' | 'agreements',
  sessionId: string,
  stepData: any,
  userId?: number
): Promise<any> {
  const payload: any = {
    sessionId,
    [stepName]: stepData
  };

  //adds userId(for signup step after prescreen)
  if (userId !== undefined) {
    payload.userId = userId;
  }

  console.log(`[API] Saving consumer onboarding step: ${stepName}`, payload);

  const res = await fetch(`${getSecureApiBase()}/api/v1/consumer/onboarding/step/${stepName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to save consumer onboarding step ${stepName}: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log(`Saved consumer onboarding step ${stepName}:`, result);
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Verified 1-Click Signup API Functions                                    */
/* -------------------------------------------------------------------------- */

/**
 * Create a Verified session for 1-Click signup
 * Returns a sessionKey for initializing the Verified SDK
 */
export async function createVerifiedSession(): Promise<{ sessionKey: string; sessionId?: string }> {
  console.log('[API] Creating Verified session...');

  const res = await fetch(`${getSecureApiBase()}/api/verified/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to create Verified session: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('Verified session created:', result);

  // Extract sessionKey and sessionId from nested data structure
  if (result.success && result.data && result.data.sessionKey) {
    return {
      sessionKey: result.data.sessionKey,
      sessionId: result.data.sessionId,
    };
  }

  throw new Error('Invalid session response: sessionKey not found');
}

/**
 * Complete Verified signup after user shares credentials
 * @param identityUuid - The identity UUID from Verified SDK
 * @param referralCode - Optional referral code
 * @returns Response with rewardsUserId, prescreenStatus, and optional offer
 */
export interface VerifiedSignupCompleteRequest {
  identityUuid: string;
  referralCode?: string;
}

export interface VerifiedSignupCompleteResponse {
  success: boolean;
  message: string;
  data: {
    rewardsUserId: string;
    prescreenStatus: 'PREAPPROVED' | 'NOT_PREAPPROVED';
    message: string;
    offer?: {
      creditLimit: number;
      apr: number;
      annualFee: number;
      rewardRate: number;
      introApr: number;
      introAprPeriodMonths: number;
      offerCode: string;
      offerExpiry: string;
      programName: string;
    };
  };
}

export async function completeVerifiedSignup(
  payload: VerifiedSignupCompleteRequest
): Promise<VerifiedSignupCompleteResponse> {
  console.log('[API] Completing Verified signup...', payload);

  const res = await fetch(`${getSecureApiBase()}/api/verified/signup/verified-complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to complete Verified signup: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('Verified signup completed:', result);
  return result;
}

/**
 * Fetch verified user data by identity UUID
 * Calls backend to get user credentials from Verified API v2
 * @param identityUuid - The identity UUID from Verified SDK
 * @returns Response with VerifiedIdentityDTO structure
 */

// Verified API v2 response structure (matches VerifiedIdentityDTO.java)
export interface VerifiedUserData {
  identifiers?: {
    phone?: string;
  };
  credentials?: {
    fullName?: {
      firstName?: string;
      lastName?: string;
    };
    phone?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    birthDate?: string;
    ssn?: string;
  };
  metadata?: {
    identifiers?: {
      riskSignals?: {
        overall?: {
          score?: number;
          level?: string;
          recommendation?: string;
        };
      };
      verificationMethod?: {
        phone?: string;
      };
    };
    credentials?: {
      verificationMethod?: {
        fullName?: {
          firstName?: string;
          lastName?: string;
        };
        phone?: string;
        address?: {
          line1?: string;
          city?: string;
          country?: string;
          state?: string;
          zipCode?: string;
        };
        birthDate?: string;
        ssn?: string;
      };
    };
  };
}

export interface GetVerifiedUserResponse {
  success: boolean;
  message: string;
  data?: VerifiedUserData;
}

export async function getVerifiedUserByIdentity(
  identityUuid: string,
  sessionId?: string
): Promise<GetVerifiedUserResponse> {
  console.log('[API] Fetching verified identity and saving user...', identityUuid, 'sessionId:', sessionId);

  // This endpoint fetches from Verified API AND saves to jvc_user table
  const url = sessionId
    ? `${getSecureApiBase()}/api/verified/identity/${identityUuid}?sessionId=${encodeURIComponent(sessionId)}`
    : `${getSecureApiBase()}/api/verified/identity/${identityUuid}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    // Try to parse JSON so callers can inspect structured error bodies (e.g. MARKET_AREA_RESTRICTED)
    let parsed: any = text;
    try { parsed = JSON.parse(text); } catch { /* keep raw text */ }
    const msg = typeof parsed === 'object' && parsed?.message ? parsed.message : `Failed to fetch verified identity: ${res.status}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('Verified identity fetched and user saved:', result);
  return result;
}

/**
 * Pre-screen consumer after Verified 1-Click flow
 * Calls PID06, PID20, and Experian to determine approval status
 */
export interface PrescreenVerifiedRequest {
  phone: string;         // Phone number (10 digits, no formatting)
  password: string;      // Password for the account
  email: string;         // Email address
  refCode?: string;      // Optional referral code
  sessionId?: string;    // Consumer onboarding session ID
  prequalifyAllow?: boolean;
  preapprovalAllow?: boolean;
}

export interface PrescreenVerifiedResponse {
  success: boolean;
  message: string;
  data: {
    status: 'APPROVED' | 'PREQUALIFY' | 'FAILED';
    message: string;
    downloadApp: boolean;
    prequalifyAllow: boolean;
    preapprovalAllow: boolean;
    creditLimit: number | null;
    pid06Status: 'PASS' | 'FAIL' | 'NOT_ATTEMPTED';
    pid20Status: 'PASS' | 'FAIL' | 'NOT_ATTEMPTED';
    experianStatus: 'APPROVED' | 'DECLINED' | 'NOT_ATTEMPTED';
    userId: number;
    details: string;
  } | null;
}

export async function prescreenVerifiedConsumer(
  payload: PrescreenVerifiedRequest
): Promise<PrescreenVerifiedResponse> {
  console.log('[API] Pre-screening verified consumer...', { email: payload.email });

  const res = await fetch(`${getSecureApiBase()}/api/verified/consumer/prescreen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      phone: payload.phone,
      password: payload.password,
      email: payload.email,
      refCode: payload.refCode || null,
      sessionId: payload.sessionId || null,
      prequalifyAllow: payload.prequalifyAllow ?? true,
      preapprovalAllow: payload.preapprovalAllow ?? false,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    // Try to parse JSON so callers can inspect structured error bodies (e.g. MARKET_AREA_RESTRICTED)
    let parsed: any = text;
    try { parsed = JSON.parse(text); } catch { /* keep raw text */ }
    const msg = typeof parsed === 'object' && parsed?.message ? parsed.message : `Pre-screen failed: ${res.status}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('Pre-screen result:', result);
  return result;
}

// Get consumer details by sessionId
export interface ConsumerDetailsResponse {
  success: boolean;
  message: string;
  data: {
    fullName: string;
    ssn: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export async function getConsumerDetailsBySessionId(
  sessionId: string
): Promise<ConsumerDetailsResponse> {
  console.log('[API] Fetching consumer details for session:', sessionId);

  const res = await fetch(
    `${getSecureApiBase()}/api/applications/${sessionId}/consumer-details`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to fetch consumer details: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('[API] Consumer details response:', result);
  return result;
}

// Get onboarding session status (current step & application status)
export async function getOnboardingSessionStatus(sessionId: string) {
  console.log('[API] Fetching onboarding session status for session:', sessionId);

  const res = await fetch(
    `${getSecureApiBase()}/api/onboarding/check-status?session_id=${sessionId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    const err: any = new Error(`Failed to fetch session status: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('[API] Onboarding session status response:', result);
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Application Disclosures API                                              */
/* -------------------------------------------------------------------------- */

/**
 * Fetches application disclosures from the backend
 * Backend determines tier and state based on application data
 * @param applicationId - The sessionId string (e.g., "consumer_1767730688744_xbtvaqoat")
 * @returns Disclosures data with sections and rows
 */
export async function fetchApplicationDisclosures(
  applicationId: string | number
): Promise<DisclosuresResponse> {
  console.log('[API] Fetching application disclosures for sessionId:', applicationId);

  const response = await fetch(
    `${getSecureApiBase()}/api/applications/${applicationId}/disclosures`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to fetch disclosures: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  console.log('[API] Application disclosures response:', result);

  return result;
}

/**
 * Accept and sign an application disclosure.
 *
 * @param request - Acceptance request with snapshotId and eSignature
 * @returns Success response
 */
export async function acceptDisclosure(
  request: AcceptDisclosureRequest
): Promise<AcceptDisclosureResponse> {
  console.log('[API] Accepting disclosure:', request.snapshotId);

  const response = await fetch(
    `${getSecureApiBase()}/api/disclosures/accept`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to accept disclosure: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  console.log('[API] Accept disclosure response:', result);

  return result;
}

/* -------------------------------------------------------------------------- */
/*  IC Hard Bureau Pull                                                      */
/* -------------------------------------------------------------------------- */

export interface ICHardBureauPullResponse {
  success: boolean;
  message: string;
  data: {
    decisionCategory: 'APPROVE' | 'DECLINE' | 'REFER' | string;
    decisionName: string;
    reasonCodes: string[];
    vantageScoreV4: number | null;
    riskEvaluation: string;
    highRisk: boolean;
    scoreFactors: Array<{ code: string; importance: string }>;
    creditLimit: number | null;
    transactionId: string;
    productId: string;
  } | null;
}

export async function icHardBureauPull(
  sessionId: string
): Promise<ICHardBureauPullResponse> {
  console.log('[API] IC Hard Bureau Pull - sessionId:', sessionId);
  console.log('[API] IC Hard Bureau Pull - URL:', `${getSecureApiBase()}/api/v1/consumer/applications/${sessionId}/ic-hard-bureau-pull`);

  const res = await fetch(
    `${getSecureApiBase()}/api/v1/consumer/applications/${encodeURIComponent(sessionId)}/ic-hard-bureau-pull`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    }
  );

  console.log('[API] IC Hard Bureau Pull - response status:', res.status);

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    console.error('[API] IC Hard Bureau Pull - error response:', text);
    const err: any = new Error(`IC Hard Bureau Pull failed: ${res.status} ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  const result = await res.json();
  console.log('[API] IC Hard Bureau Pull - success:', result.success);
  console.log('[API] IC Hard Bureau Pull - message:', result.message);
  if (result.data) {
    console.log('[API] IC Hard Bureau Pull - decisionCategory:', result.data.decisionCategory);
    console.log('[API] IC Hard Bureau Pull - creditLimit:', result.data.creditLimit);
    console.log('[API] IC Hard Bureau Pull - vantageScoreV4:', result.data.vantageScoreV4);
    console.log('[API] IC Hard Bureau Pull - highRisk:', result.data.highRisk);
    console.log('[API] IC Hard Bureau Pull - reasonCodes:', result.data.reasonCodes);
    console.log('[API] IC Hard Bureau Pull - transactionId:', result.data.transactionId);
  }
  console.log('[API] IC Hard Bureau Pull - full response:', result);
  return result;
}

export async function getConsumerOnboardingSession(sessionId: string): Promise<any> {
  console.log('[getConsumerOnboardingSession] Fetching session for ID:', sessionId);
  const url = `${getSecureApiBase()}/api/v1/consumer/onboarding/session/resume/${encodeURIComponent(sessionId)}`;
  console.log('[getConsumerOnboardingSession] URL:', url);

  const res = await authenticatedFetch(url);

  console.log('[getConsumerOnboardingSession] Response status:', res.status);

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    console.error('[getConsumerOnboardingSession] Error response:', errorText);
    throw new Error('Failed to get onboarding session');
  }

  const data = await res.json();
  console.log('[getOnboardingSession] Session data:', data);
  return data;
}

/**
 * Get PII-masked application detail for admin view.
 * Calls the admin detail endpoint that returns masked SSN/DOB/account numbers.
 */
export async function getAdminSessionDetail(sessionId: string): Promise<any> {
  const url = `${getSecureApiBase()}/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/detail`;

  const res = await authenticatedFetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    const err: any = new Error(`Failed to get session detail: ${res.status} ${errorText}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
}

/**
 * Get disclosures for a merchant application (admin context).
 */
export async function getAdminSessionDisclosures(sessionId: string): Promise<any> {
  const url = `${getSecureApiBase()}/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/disclosures`;

  const res = await authenticatedFetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error');
    const err: any = new Error(`Failed to get session disclosures: ${res.status} ${errorText}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
}

/* ───────────────── Admin Edit Endpoints (Phase 2) ───────────────── */

async function adminEditRequest(path: string, method: string, data?: Record<string, any>): Promise<any> {
  const url = `${getSecureApiBase()}${path}`;
  const res = await authenticatedFetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    const err: any = new Error(errorText || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function adminEditPersonalDetails(sessionId: string, data: Record<string, any>) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/personal-details`, 'PUT', data);
}

export function adminEditBusinessInformation(sessionId: string, data: Record<string, any>) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/business-information`, 'PUT', data);
}

export function adminEditOwnership(sessionId: string, data: Record<string, any>) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/ownership`, 'PUT', data);
}

export function adminAddOwner(sessionId: string, owner: Record<string, any>) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/add-owner`, 'POST', owner);
}

export function adminEditAgreement(sessionId: string, data: Record<string, any>) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/agreement`, 'PUT', data);
}

export function adminUpdateOwnerIntent(sessionId: string, ownerIntent: string) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/owner-intent`, 'PUT', { ownerIntent });
}

export function getAdminEditHistory(sessionId: string) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/edit/history`, 'GET');
}

// Fetch all versioned Accurint reports for a session (newest first)
export function getAccurintReports(sessionId: string) {
  return adminEditRequest(`/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/accurint-reports`, 'GET');
}

// Admin-only: update application status + reason WITHOUT triggering merchant signup flow
export function adminUpdateApplicationStatus(
  sessionId: string,
  applicationStatus: string,
  reason?: string | null,
  accurintResult?: any,
  source?: string
) {
  return adminEditRequest(
    `/api/admin/onboarding-sessions/${encodeURIComponent(sessionId)}/update-status`,
    'PUT',
    {
      applicationStatus,
      ...(reason && { reason }),
      ...(accurintResult && { accurintResult }),
      ...(source && { source }),
    }
  );
}