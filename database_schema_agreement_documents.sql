-- ========================================================================
-- Agreement Documents Storage Schema
-- ========================================================================
-- This schema stores the 4 required agreement documents for each merchant
-- ========================================================================

-- Table: agreement_documents
-- Stores metadata and references to the actual document files
CREATE TABLE agreement_documents (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- Foreign Keys
  session_id VARCHAR(255) NOT NULL,
  merchant_id INT NULL,  -- Will be populated after merchant is created

  -- Document Information
  document_type ENUM(
    'consent_electronic_records',
    'merchant_agreement',
    'privacy_policy',
    'operating_guide'
  ) NOT NULL,

  -- File Storage
  file_url VARCHAR(500) NOT NULL,  -- S3/Azure Blob Storage URL or local path
  file_name VARCHAR(255) NOT NULL,
  file_size_bytes INT NULL,
  file_mime_type VARCHAR(100) DEFAULT 'application/pdf',

  -- Document Metadata
  document_version VARCHAR(50) NULL,  -- e.g., "2025.1", "Oct_2025_v1.0"
  signed_at TIMESTAMP NULL,
  signature_data_url TEXT NULL,  -- Base64 signature image for merchant_agreement

  -- Merchant Acceptance
  merchant_full_name VARCHAR(255) NULL,
  merchant_accepted BOOLEAN DEFAULT TRUE,
  accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Audit Fields
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_session_id (session_id),
  INDEX idx_merchant_id (merchant_id),
  INDEX idx_document_type (document_type),

  -- Unique Constraint: One document type per session
  UNIQUE KEY unique_session_document (session_id, document_type)
);

-- Table: onboarding_sessions (update existing table to add document status)
-- Add these columns to your existing onboarding_sessions table:
ALTER TABLE onboarding_sessions
  ADD COLUMN documents_uploaded BOOLEAN DEFAULT FALSE,
  ADD COLUMN documents_upload_count INT DEFAULT 0,
  ADD COLUMN documents_uploaded_at TIMESTAMP NULL;

-- ========================================================================
-- Sample Queries
-- ========================================================================

-- Get all documents for a session
-- SELECT * FROM agreement_documents WHERE session_id = 'merchant_123456';

-- Check if all 4 documents are uploaded for a session
-- SELECT
--   session_id,
--   COUNT(DISTINCT document_type) as uploaded_count,
--   CASE WHEN COUNT(DISTINCT document_type) = 4 THEN TRUE ELSE FALSE END as all_uploaded
-- FROM agreement_documents
-- WHERE session_id = 'merchant_123456'
-- GROUP BY session_id;

-- Get missing documents for a session
-- SELECT 'consent_electronic_records' as missing_doc
-- WHERE 'consent_electronic_records' NOT IN (
--   SELECT document_type FROM agreement_documents WHERE session_id = 'merchant_123456'
-- )
-- UNION
-- SELECT 'merchant_agreement' WHERE 'merchant_agreement' NOT IN (...)
-- UNION
-- SELECT 'privacy_policy' WHERE 'privacy_policy' NOT IN (...)
-- UNION
-- SELECT 'operating_guide' WHERE 'operating_guide' NOT IN (...);
