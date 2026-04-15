// Verification orchestrator: uses Accurint and Bridger (Lexis) provider
// results. Bridger searches are proxied via backend endpoint and invoked
// here with two search types: 'List Screening' and 'World Compliance'.

import { bridgerSearch } from './api';

type EntityType = 'business' | 'individual';

export type EntityCheckResult = {
  entityType: EntityType;
  name: string;
  provider: 'accurint' | 'bridger';
  raw: any; // raw provider response
  entityScores: number[]; // extracted EntityScore values (0-100)
  decision?: 'DENY' | 'MANUAL_REVIEW' | 'APPROVE';
};

export type VerificationSummary = {
  overallDecision: 'DENY' | 'MANUAL_REVIEW' | 'APPROVE';
  highestEntityScore: number;
  results: EntityCheckResult[];
  reason?: string; 
};

// Decision thresholds
const DENY_THRESHOLD = 95;
const MANUAL_THRESHOLD = 80;

// Defensive helper to extract any numeric EntityScore values from an opaque provider response
function extractEntityScoresFromAny(raw: any): number[] {
  const scores: number[] = [];

  const pushIfNumber = (v: any) => {
    if (v === null || v === undefined) return;
    const n = Number(v);
    if (!isNaN(n) && isFinite(n)) scores.push(Math.max(0, Math.min(100, Math.round(n))));
  };

  const walk = (obj: any) => {
    if (!obj) return;
    if (Array.isArray(obj)) {
      for (const it of obj) walk(it);
      return;
    }
    if (typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        const v = obj[k];
        if (k.toLowerCase().includes('entityscore')) {
          pushIfNumber(v);
        }
        walk(v);
      }
      return;
    }
  };

  walk(raw);
  // Remove duplicates and sort descending
  return Array.from(new Set(scores)).sort((a, b) => b - a);
}

function decideFromScores(scores: number[]): 'DENY' | 'MANUAL_REVIEW' | 'APPROVE' {
  console.log("inside decide from scores----");
  if (!scores || scores.length === 0) return 'APPROVE';
  const max = Math.max(...scores);
  if (max >= DENY_THRESHOLD) return 'DENY';
  if (max >= MANUAL_THRESHOLD) return 'MANUAL_REVIEW';
  return 'APPROVE';
}

/**
 * Runs verification using Accurint individuals data provided by the caller
 * merchantData: { business?: { legalName }, owners?: [{ firstName,lastName }], applicants?: [...] }
 */
export async function runEntityVerification(merchantData: any, accurintResponse?: any): Promise<VerificationSummary> {
  const results: EntityCheckResult[] = [];

  // ------Bridger Business calls (list screening + world compliance)
  const businessName = merchantData?.businessInformation?.legalNameOfBusiness || merchantData?.businessName || merchantData?.business?.name;
  if (businessName) {
    try {
      const businessInfo = merchantData?.businessInformation;
      const businessEntity: any = { EntityType: 'Business', Name: { Full: businessName } };

      //add ein/ss
      const businessEin = businessInfo?.einSsnNumber || businessInfo?.ein;
      if (businessEin) {
        businessEntity.EIN = businessEin;
      }

      //add business address
      const businessAddress = businessInfo?.address;
      const businessCity = businessInfo?.city;
      const businessState = businessInfo?.state;
      const businessZipcode = businessInfo?.zipcode || businessInfo?.zipCode;
      if (businessAddress || businessCity || businessState || businessZipcode) {
        businessEntity.Addresses = [{
          Street1: businessAddress,
          City: businessCity,
          StateProvinceDistrict: businessState,
          PostalCode: businessZipcode,
          Country: 'US',
          Type: 'Current'
        }];
      }

      const entities = [
        { Entity: businessEntity }
      ];
      const listResp = await bridgerSearch({ entities, searchType: 'List Screening' }).catch(() => null);
      if (listResp) {
        console.log("Bridger Response---:", JSON.stringify(listResp, null, 2));
        const scores = extractEntityScoresFromAny(listResp.data || listResp);
        const decision = decideFromScores(scores);
        results.push({ entityType: 'business', name: businessName, provider: 'bridger', raw: listResp, entityScores: scores, decision });
      }
    } catch (e) {
      results.push({ entityType: 'business', name: businessName, provider: 'bridger', raw: { error: String(e) }, entityScores: [] });
    }
  }

  // -----get all individuals from merchantData (applicant and owners)
  const individuals: Array<{
    firstName?: string;
    lastName?: string;
    name?: string;
    ssn?: string;
    dob?: string;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  }> = [];

  // check if an individual is a duplicate. Duplicate = BOTH name AND date of birth must match. If either differs, they're separate individuals.
  const isDuplicate = (person: { firstName?: string; lastName?: string; name?: string; ssn?: string; dob?: string }) => {
    const newFirstName = person.firstName?.trim().toLowerCase();
    const newLastName = person.lastName?.trim().toLowerCase();
    const newName = person.name?.trim().toLowerCase();
    const newSSNRaw = person.ssn?.toLowerCase() || '';
    const newSSN = newSSNRaw.replace(/\D/g, '');
    const newDob = person.dob?.trim() || '';

    return individuals.some(existing => {
      const existingFirstName = existing.firstName?.trim().toLowerCase();
      const existingLastName = existing.lastName?.trim().toLowerCase();
      const existingName = existing.name?.trim().toLowerCase();
      // const existingSSNRaw = existing.ssn?.toLowerCase() || '';
      // const existingSSN = existingSSNRaw.replace(/\D/g, '');
      const existingDob = existing.dob?.trim() || '';

      let nameMatch = false;
      //let ssnMatch = false;

      // check name match (firstName + lastName OR full name)
      if (newFirstName && newLastName && existingFirstName && existingLastName) {
        if (newFirstName === existingFirstName && newLastName === existingLastName) {
          nameMatch = true;
        }
      } else if (newName && existingName && newName === existingName) {
        nameMatch = true;
      }

      // check DOB match (both must be present and equal)
      const dobMatch = !!(newDob && existingDob && newDob === existingDob);

      // check SSN match (handles both full and masked SSNs like 05011xxxx)
      // if (newSSN && existingSSN) {
      //   const newHasMask = newSSNRaw.includes('x');
      //   const existingHasMask = existingSSNRaw.includes('x');

      //   if (newHasMask || existingHasMask) {
      //     const newVisible = newSSN.replace(/x/gi, '');
      //     const existingVisible = existingSSN.replace(/x/gi, '');

      //     if (newVisible && existingVisible) {
      //       if (newVisible.length >= 5 && existingVisible.length >= 5) {
      //         if (newVisible.substring(0, 5) === existingVisible.substring(0, 5)) {
      //           ssnMatch = true;
      //         }
      //       }
      //     }
      //   } else {
      //     if (newSSN === existingSSN) {
      //       ssnMatch = true;
      //     }
      //   }
      // }

      // return nameMatch && ssnMatch;

      //return nameMatch && dobMatch;
      return nameMatch;
    });
  };


  const applicant = merchantData?.personalDetails;
  if (applicant && (applicant.firstName || applicant.lastName)) {
    const applicantName = `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim();
    const applicantData = {
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      name: applicantName,
      //ssn: applicant.ssn || applicant.socialSecurityNumber,
      dob: applicant.dob || applicant.dateOfBirth
    };
    if (applicantName && !isDuplicate(applicantData)) {
      individuals.push(applicantData);
    }
  }

  const owners = merchantData?.ownership?.owners || merchantData?.owners || [];
  for (const o of owners) {
    if (o && (o.firstName || o.lastName || o.fullName)) {
      const ownerName = o.fullName || `${o.firstName || ''} ${o.lastName || ''}`.trim();
      const ownerData = {
        firstName: o.firstName,
        lastName: o.lastName,
        name: ownerName,
        //ssn: o.ssn || o.socialSecurityNumber,
        dob: o.dob || o.dateOfBirth,
        street: o.homeAddress || o.address || null,
        city: o.city || null,
        state: o.state || null,
        zip: o.zipCode || o.zipcode || null,
        country: 'US'
      };
      if (ownerName && !isDuplicate(ownerData)) {
        individuals.push(ownerData);
      }
    }
  }

  //------ get individuals from Accurint response
  try {
    if (accurintResponse) {
      const accurintIndividuals = accurintResponse?.data?.individuals || accurintResponse?.individuals || [];
      if (Array.isArray(accurintIndividuals)) {
        for (const person of accurintIndividuals) {
          if (person && (person.firstName || person.lastName)) {
            const personName = `${person.firstName || ''} ${person.lastName || ''}`.trim();
            const individual = {
              firstName: person.firstName,
              lastName: person.lastName,
              name: personName,
              //ssn: person.ssn || person.socialSecurityNumber,
              dob: person.dob,
              city: person.city || null,
              state: person.state || null,
              zip: person.zip5,
              street: [
                person.streetNumber,
                person.streetPreDirection,
                person.streetName,
                person.streetSuffix,
                person.unitDesignation,
                person.unitNumber
              ].filter(Boolean).join(' ') || null,
              country: 'US'
            };
            if (personName && !isDuplicate(individual)) {
              individuals.push(individual);
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore parse errors
  }

  // ----- Bridger Calls for each all individuals (list screening + world compliance)
  for (const person of individuals) {
    const name = person.name || `${person.firstName || ''} ${person.lastName || ''}`.trim();
    if (!name) continue;
    const [firstName, ...rest] = (person.firstName ? [person.firstName] : name.split(' '));
    const lastName = person.lastName || rest.join(' ') || '';

    try {
      const entitiesForPerson: any[] = [];

      const entity: any = {
        EntityType: 'Individual',
        Name: { First: firstName || '', Last: lastName || '' }
      };

      //Add DOB as AdditionalInfo
      if (person.dob) {
        const dobParts = person.dob.split('/');
        if (dobParts.length === 3) {
          entity.AdditionalInfo = [{
            Type: 'DOB',
            Date: {
              Month: parseInt(dobParts[0], 10),
              Day: parseInt(dobParts[1], 10),
              Year: parseInt(dobParts[2], 10)
            }
          }];
        }
      }

      //Add Address
      const hasAddress = !!(person.street || person.city || person.state || person.zip);
      if (hasAddress) {
        const address: any = { Type: 'Current', Country: person.country || 'US' };
        if (person.street) address.Street1 = person.street;
        if (person.city) address.City = person.city;
        if (person.state) address.StateProvinceDistrict = person.state;
        if (person.zip) address.PostalCode = person.zip;
        entity.Addresses = [address];
      }

      entitiesForPerson.push({ Entity: entity });

      const listResp = await bridgerSearch({ entities: entitiesForPerson, searchType: 'List Screening' }).catch(() => null);
      if (listResp) {
        console.log("Bridger Response:", JSON.stringify(listResp, null, 2));
        const scores = extractEntityScoresFromAny(listResp.data || listResp);
        const decision = decideFromScores(scores);
        results.push({ entityType: 'individual', name, provider: 'bridger', raw: listResp, entityScores: scores, decision });
      }
    } catch (e) {
      results.push({ entityType: 'individual', name, provider: 'bridger', raw: { error: String(e) }, entityScores: [] });
    }
  }

  // Aggregate decision: if any result DENY → DENY; else if any MANUAL_REVIEW → MANUAL_REVIEW; else APPROVE
  let overall: 'DENY' | 'MANUAL_REVIEW' | 'APPROVE' = 'APPROVE';
  let highest = 0;
  for (const r of results) {
    if (r.entityScores && r.entityScores.length > 0) {
      console.log("Inside if---");
      highest = Math.max(highest, ...r.entityScores);
      const d = r.decision || decideFromScores(r.entityScores);
      console.log(`[Verification] Entity: ${r.name}, Type: ${r.entityType}, Decision: ${d}, Scores: [${r.entityScores.join(', ')}]`);
      if (d === 'DENY') { overall = 'DENY'; break; }
      if (d === 'MANUAL_REVIEW') overall = 'MANUAL_REVIEW';
    } else {
      console.log(`[Verification] Entity: ${r.name}, Type: ${r.entityType}, No scores available`);
    }
  }

  console.log(`[Verification] Aggregated Decision: ${overall}, Highest Score: ${highest}`);

  //---- Build reason text for DENY or MANUAL_REVIEW
  let reason: string | undefined = undefined;
  if (overall === 'DENY' || overall === 'MANUAL_REVIEW') {
    const reasonParts: string[] = [];

    // add business scores (only if business is DENY or MANUAL_REVIEW)
    const businessResults = results.filter(r =>
      r.entityType === 'business' &&
      (r.decision === 'DENY' || r.decision === 'MANUAL_REVIEW')
    );
    
    if (businessResults.length > 0) {
      for (const businessResult of businessResults) {
        const maxBusinessScore = businessResult.entityScores && businessResult.entityScores.length > 0 
          ? Math.max(...businessResult.entityScores) 
          : 0;
        
        // Extract additional details from Bridger response
        let detailsText = '';
        try {
          const raw = businessResult.raw;
          
          // Extract decision from response
          const decision = raw?.decision || raw?.data?.decision;
          
          // Extract records with details
          const records = raw?.records || raw?.data?.records || [];
          
          if (decision) {
            detailsText += ` [Decision: ${decision}]`;
          }
          
          // Extract match details if available
          if (Array.isArray(records) && records.length > 0) {
            const matchCount = records.length;
            detailsText += ` [${matchCount} match${matchCount > 1 ? 'es' : ''} found]`;
            
            // Extract specific match reasons/categories if available
            const categories = new Set<string>();
            records.forEach((record: any) => {
              const recordDetails = record.recordDetails || record;
              const category = recordDetails.category || recordDetails.matchCategory;
              if (category) categories.add(category);
            });
            
            if (categories.size > 0) {
              detailsText += ` [Categories: ${Array.from(categories).join(', ')}]`;
            }
          }
        } catch (e) {
          console.warn('[Verification] Failed to extract Bridger details:', e);
        }
        
        const businessReason = `Bridger Business "${businessResult.name}" - Score: ${maxBusinessScore}${detailsText}`;
        reasonParts.push(businessReason);
        console.log(`[Verification] Business Reason: ${businessReason}`);
      }
    }

    // add individual scores (only for DENY or MANUAL_REVIEW individuals)
    const individualResults = results.filter(r =>
      r.entityType === 'individual' &&
      (r.decision === 'DENY' || r.decision === 'MANUAL_REVIEW')
    );

    for (const individualResult of individualResults) {
      const maxScore = (individualResult.entityScores && individualResult.entityScores.length > 0) 
        ? Math.max(...(individualResult.entityScores)) 
        : 0;
      
      // Extract additional details from Bridger response
      let detailsText = '';
      try {
        const raw = individualResult.raw;
        const decision = raw?.decision || raw?.data?.decision;
        const records = raw?.records || raw?.data?.records || [];
        
        if (decision) {
          detailsText += ` [Decision: ${decision}]`;
        }
        
        if (Array.isArray(records) && records.length > 0) {
          const matchCount = records.length;
          detailsText += ` [${matchCount} match${matchCount > 1 ? 'es' : ''} found]`;
        }
      } catch (e) {
        console.warn('[Verification] Failed to extract individual Bridger details:', e);
      }
      
      const individualReason = `Bridger Individual "${individualResult.name}" - Score: ${maxScore}${detailsText}`;
      reasonParts.push(individualReason);
      console.log(`[Verification] Individual Reason: ${individualReason}`);
    }

    reason = reasonParts.join(' | ');
    console.log(`[Verification] Final Reason: ${reason || 'No specific reason available'}`);
  }

  return {
    overallDecision: overall,
    highestEntityScore: highest,
    results,
    reason,
  };
}

export default { runEntityVerification };