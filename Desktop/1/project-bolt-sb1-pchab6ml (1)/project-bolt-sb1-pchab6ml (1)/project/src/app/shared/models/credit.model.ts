// src/app/shared/models/credit-application.model.ts
export interface CreditApplication {
    personAge: number | null;
    personIncome: number | null;
    personHomeOwnership: string;
    personEmpLength: number | null;
    loanIntent: string;
    loanAmnt: number | null;
    dti: number | null;
    creditScore: number | null;
    // Note: File uploads are typically handled separately using FormData
    // and are not part of this core data model for non-file fields.
    // nationalId?: File;
    // payslips?: File[];
    // employmentCertificate?: File;
    // bankStatements?: File[];
    // proofOfResidence?: File;
  }