import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { RiskStatus } from '@/lib/api';

interface RiskStatusBadgeProps {
  status: RiskStatus;
  label?: string;
  className?: string;
}

const RISK_CONFIG: Record<RiskStatus, { label: string; variant: string; className: string }> = {
  H: {
    label: 'High Risk',
    variant: 'destructive',
    className: 'bg-red-600 hover:bg-red-700 text-white'
  },
  M: {
    label: 'Moderate Risk',
    variant: 'warning',
    className: 'bg-orange-500 hover:bg-orange-600 text-white'
  },
  L: {
    label: 'Low Risk',
    variant: 'secondary',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-white'
  },
  P: {
    label: 'Pass',
    variant: 'success',
    className: 'bg-green-600 hover:bg-green-700 text-white'
  }
};

/**
 * RiskStatusBadge Component
 * Displays a color-coded badge for Accurint risk status levels
 * 
 * @param status - Risk status: H (High), M (Moderate), L (Low), P (Pass)
 * @param label - Optional custom label to override default
 * @param className - Additional CSS classes
 */
export const RiskStatusBadge: React.FC<RiskStatusBadgeProps> = ({ 
  status, 
  label,
  className = '' 
}) => {
  const config = RISK_CONFIG[status] || RISK_CONFIG.M;
  const displayLabel = label || config.label;

  return (
    <Badge className={`${config.className} ${className} font-semibold`}>
      {displayLabel}
    </Badge>
  );
};

export default RiskStatusBadge;
