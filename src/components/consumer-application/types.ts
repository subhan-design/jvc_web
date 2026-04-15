import type { SignUpFormData } from "./steps/SignUpStep";
import type { TermsFormData } from "./steps/TermsAndConditionsSteps";
import type { BankFormData } from "./steps/BankAccountSteps";
import type { AgreementFormData } from "./steps/AgreementSteps";

export interface ConsumerApplicationData {
  signUp?: SignUpFormData;
  terms?: TermsFormData;
  bank?: BankFormData;
  agreement?: AgreementFormData;
}
