// Document Verification Types for CrossCore API Integration

export interface DocCaptureRequest {
  requestType: "DocCapture";
  contactDetails: {
    firstName: string;
    lastName: string;
    phone: string; // Raw phone number without formatting
    dateOfBirth?: string; // ISO format: YYYY-MM-DD
    email?: string;
  };
}

export interface DocCaptureResponse {
  success: boolean;
  captureLink?: string;
  sessionId?: string;
  error?: string;
}

export interface VerificationStatusResponse {
  status: "pending" | "completed" | "failed" | "timeout";
  result?: "passed" | "failed";
  sessionId?: string;
  error?: string;
  details?: {
    documentType?: string;
    extractedData?: {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      licenseNumber?: string;
    };
    failureReason?: string;
  };
}

// API Endpoints Documentation
/*
POST /api/verification/document-capture
Body: DocCaptureRequest
Response: DocCaptureResponse

Description: Initiates document capture process via CrossCore API.
The API should:
1. Validate the request data
2. Call CrossCore API with requestType: "DocCapture"
3. CrossCore will send SMS to the provided phone number
4. Return the capture link (if provided by CrossCore)

GET /api/verification/status?sessionId=<sessionId>
Response: VerificationStatusResponse

Description: Polls the verification status from CrossCore.
The API should:
1. Check CrossCore API for the verification status
2. Return current status and result
3. Handle timeout scenarios (stop polling after reasonable time)

Error Handling:
- Network errors: Retry logic on frontend
- Invalid document: Return failed status with reason
- Timeout: Return timeout status
- Rate limiting: Handle 429 responses appropriately
*/

export interface DocumentVerificationState {
  isVerified: boolean;
  attempts: number;
  status: "idle" | "sending" | "sent" | "pending" | "success" | "failed" | "blocked";
  captureLink?: string;
  sessionId?: string;
}