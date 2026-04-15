import type { PersonalDetailsFormData } from "./steps/PersonalDetailsStep";
import type { BusinessDetailsFormData } from "./steps/BusinessDetailsStep";
import type { LocationStepsFormData } from "./steps/LocationSteps";
import type { OwnerFormData } from "./steps/OwnerSteps";
import type { BankFormData } from "./steps/BankSteps";
import type { AgreementFormData } from "./steps/AgreementSteps";

export interface MerchantSignupData {
  personalDetails?: PersonalDetailsFormData;
  businessInformation?: BusinessDetailsFormData;
  locations?: LocationStepsFormData;
  ownership?: OwnerFormData;
  bankInformation?: BankFormData;
  agreement?: AgreementFormData;
}
