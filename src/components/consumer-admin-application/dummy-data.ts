// ============================================================
// Consumer Admin Application - API Data Layer
// ============================================================

import { API_BASE } from "@/config/app";

export type OfferType = "Pre-Approved" | "Pre-Qualified" | "Secured" | "N/A";

export type OfferStatus = "Accepted Offer" | "Declined Offer" | "Rejected Offer" | "Pending";

export type ApplicationStatus = "Approved" | "Declined";

// ---------- Credit Card Offers ----------

export interface CreditCardOffer {
  applicationId: string;
  offerDate: string; // ISO date
  offer: OfferType;
  consumer: string;
  state: string;
  referralCode: string;
  status: OfferStatus;
}

export interface CreditCardOffersStats {
  preApprovedOffers: number;
  preQualifiedOffers: number;
  securedCardOffers: number;
  preApprovedAcceptanceRate: string;
  preQualifiedAcceptanceRate: string;
  securedCardAcceptanceRate: string;
}

export interface CreditCardOffersResponse {
  stats: CreditCardOffersStats;
  offers: CreditCardOffer[];
}

// ---------- Completed Applications ----------

export interface CompletedApplication {
  applicationId: string;
  date: string; // ISO date
  offer: OfferType;
  consumer: string;
  state: string;
  cardNumber?: string;
  referralCode: string;
  status: ApplicationStatus;
  reasonForDecline?: string;
}

export interface CompletedApplicationsStats {
  approvedPreApproved: number;
  declinedPreApproved: number;
  lifetimePreApprovedApprovalRate: string;
  approvedPreQualified: number;
  declinedPreQualified: number;
  lifetimePreQualifiedApprovalRate: string;
  approvedSecuredCard: number;
  declinedSecuredCard: number;
  lifetimeSecuredCardApprovalRate: string;
  fundedSecuredCards: number;
  unfundedSecuredCards: number;
}

export interface ApprovedStats {
  preApprovedApprovalRate: string;
  preQualifiedApprovalRate: string;
  securedCardApprovalRate: string;
}

export interface DeclinedStats {
  preApprovedDeclineRate: string;
  preQualifiedDeclineRate: string;
  securedCardDeclineRate: string;
}

export interface CompletedApplicationsResponse {
  stats: CompletedApplicationsStats;
  approvedStats: ApprovedStats;
  declinedStats: DeclinedStats;
  applications: CompletedApplication[];
}

// ============================================================
// Helpers (same pattern as lib/api.ts)
// ============================================================

function getSecureApiBase(): string {
  let base = API_BASE.replace(/\/$/, "");
  if (
    typeof window !== "undefined" &&
    window.location?.protocol === "https:" &&
    base.startsWith("http://")
  ) {
    base = base.replace(/^http:\/\//i, "https://");
  }
  return base;
}

function getAdminToken(): string | null {
  try {
    return localStorage.getItem("admin_access_token");
  } catch {
    return null;
  }
}

async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, { ...options, headers, credentials: "include" });
}

// ============================================================
// API Calls
// ============================================================

/**
 * GET /api/admin/consumer-applications/offers
 * Returns credit card offers data + stats for the Offers tab
 */
export async function fetchCreditCardOffers(): Promise<CreditCardOffersResponse> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/admin/consumer-applications/offers`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    const err: any = new Error(
      `Failed to get credit card offers: ${res.status} ${text}`
    );
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}

/**
 * GET /api/admin/consumer-applications/completed
 * Returns completed applications data + stats for the Completed tab
 */
export async function fetchCompletedApplications(): Promise<CompletedApplicationsResponse> {
  const res = await authenticatedFetch(
    `${getSecureApiBase()}/api/admin/consumer-applications/completed`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    const err: any = new Error(
      `Failed to get completed applications: ${res.status} ${text}`
    );
    err.status = res.status;
    err.responseText = text;
    throw err;
  }

  return res.json();
}
