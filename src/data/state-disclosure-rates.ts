export interface StateDisclosureConfig {
  apr: string;
  latePayment: string;
  returnedPayment: string;
}

export const STATE_Interest_RATES: Record<string, StateDisclosureConfig> = {
  AZ: {
    apr: '21.99%, 26.99%, 31.99%',
    latePayment: '5% of payment amount due',
    returnedPayment: '$15',
  },
  CO: {
    apr: '21%',
    latePayment: '$15',
    returnedPayment: '$15',
  },
  OR: {
    apr: '21.99%, 26.99%, 31.99%',
    latePayment: '$15',
    returnedPayment: '$15',
  },
  DEFAULT: {
    apr: '0%',
    latePayment: '$0',
    returnedPayment: '$0',
  },

};

export const getStateDisclosureConfig = (stateCode: string | null | undefined): StateDisclosureConfig => {
  if (!stateCode) {
    return STATE_Interest_RATES.DEFAULT;
  }

  return STATE_Interest_RATES[stateCode] || STATE_Interest_RATES.DEFAULT;
};