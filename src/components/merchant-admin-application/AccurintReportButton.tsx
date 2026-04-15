import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { AccurintReportModal } from './AccurintReportModal';
import type { AccurintReportRequest } from '@/lib/api';

interface AccurintReportButtonProps {
  queryParams: AccurintReportRequest;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClassName?: string;
  modalTitle?: string;
  showIcon?: boolean;
}

/**
 * AccurintReportButton Component
 * 
 * A convenient wrapper that combines a button with the AccurintReportModal
 * Use this for quick integration in any admin page
 * 
 * @example
 * // In Manual Review Queue
 * <AccurintReportButton 
 *   queryParams={{ applicationId: 123 }}
 *   buttonText="View Report"
 *   buttonSize="sm"
 * />
 * 
 * @example
 * // In Application Details
 * <AccurintReportButton 
 *   queryParams={{ onboardingSessionId: 456 }}
 *   modalTitle="Business Verification Report"
 * />
 */
export const AccurintReportButton: React.FC<AccurintReportButtonProps> = ({
  queryParams,
  buttonText = 'View Accurint Report',
  buttonVariant = 'default',
  buttonSize = 'default',
  buttonClassName = '',
  modalTitle,
  showIcon = true
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant={buttonVariant}
        size={buttonSize}
        className={buttonClassName}
      >
        {showIcon && <FileText className="h-4 w-4 mr-2" />}
        {buttonText}
      </Button>

      <AccurintReportModal
        open={showModal}
        onOpenChange={setShowModal}
        queryParams={queryParams}
        title={modalTitle}
      />
    </>
  );
};

export default AccurintReportButton;
