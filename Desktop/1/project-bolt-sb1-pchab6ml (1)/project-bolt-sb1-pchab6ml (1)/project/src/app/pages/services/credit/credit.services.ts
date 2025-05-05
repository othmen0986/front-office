import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// --- Interfaces ---

// Interface for Application Data
// This interface reflects the data structure potentially returned by the backend
// after processing a submission, including verification and evaluation results.
// The form will submit a subset of these fields.
interface MicrocreditApplication {
  id?: number;
  personAge: number | null;
  personIncome: number | null;
  personHomeOwnership: number | null | string; // Keeping flexibility for number or string from backend
  personEmpLength: number | null;
  loanIntent: number | null | string; // Keeping flexibility for number or string from backend
  loanGrade: number | null | string; // Keeping flexibility for number | string from backend
  loanAmnt: number | null;
  loanIntRate: number | null;
  dti: number | null;
  creditScore: number | null;
  user_id: number | null; // Assuming this is set by backend
  loanTermMonths: number | null;
  status?: string; // e.g., "SUBMITTED", "PENDING_VERIFICATION", etc. Set by backend

  // Fields populated by backend after processing:
  signed?: boolean;
  comment?: string | null;
  uploadedImage?: string | null;
  isApproved?: boolean;
  geminiResponse?: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class CreditService {
  // Base API URL - ensure this matches your backend
  private apiUrl = 'http://localhost:8083/api/credit';

  constructor(private http: HttpClient) {}

  // Error handling for HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.status) {
       // Server-side error (status code received)
       // Attempt to extract a meaningful message from the backend response body
       const backendError = error.error;
       if (backendError) {
           if (typeof backendError === 'string') {
               errorMessage = `Error ${error.status}: ${backendError}`;
           } else if (typeof backendError === 'object' && (backendError.message || backendError.comment || backendError.error)) {
               // Check for common error message fields from Spring Boot DefaultErrorAttributes or custom errors
               errorMessage = `Error ${error.status}: ${backendError.message || backendError.comment || backendError.error}`;
           } else {
               // Fallback if backend error structure is unexpected
               errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
           }
       } else {
            // Error status without a body
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
    } else {
        // Network error or other issue before getting a response
        errorMessage = `Network Error: ${error.message}`;
    }
    console.error('HTTP Error:', error); // Log the full error object for debugging
    // Re-throw the error with our custom message
    return throwError(() => new Error(errorMessage));
  }

  // --- Two-Step Submission Methods ---

  /**
   * Step 1: Submit the initial application data as JSON.
   * Calls POST /api/credit/apply
   * @param applicationData The initial application data (JSON).
   * @returns Observable of the created MicrocreditApplication entity with ID.
   */
  submitApplication(applicationData: MicrocreditApplication): Observable<MicrocreditApplication> {
      // Send applicationData as JSON body
      // Ensure only fields expected by the backend /apply endpoint are sent
      const dataToSend = {
          personAge: applicationData.personAge,
          personIncome: applicationData.personIncome,
          personHomeOwnership: applicationData.personHomeOwnership,
          personEmpLength: applicationData.personEmpLength,
          loanIntent: applicationData.loanIntent,
          loanGrade: applicationData.loanGrade,
          loanAmnt: applicationData.loanAmnt,
          loanIntRate: applicationData.loanIntRate,
          dti: applicationData.dti,
          creditScore: applicationData.creditScore,
          loanTermMonths: applicationData.loanTermMonths,
          // Do NOT include id, status, signed, comment, uploadedImage, isApproved, user_id here
          // as these are typically set by the backend on creation or subsequent steps.
      };

      return this.http.post<MicrocreditApplication>(`${this.apiUrl}/apply`, dataToSend)
        .pipe(catchError(this.handleError));
  }

  /**
   * Step 2: Upload and verify the document for an existing application.
   * Calls POST /api/credit/{applicationId}/verify-document (Assuming this endpoint exists)
   * @param applicationId The ID of the application.
   * @param file The document file to upload.
   * @returns Observable of the updated MicrocreditApplication entity with verification results.
   */
  verifyDocument(applicationId: number, file: File): Observable<MicrocreditApplication> {
    const formData: FormData = new FormData();
    // Backend expects the file part named 'document'
    formData.append('document', file, file.name);

    // Assuming a backend endpoint like /api/credit/{applicationId}/verify-document exists
    // that accepts multipart/form-data with a 'document' part.
    const verifyEndpoint = `${this.apiUrl}/${applicationId}/verify-document`;

    return this.http.post<MicrocreditApplication>(verifyEndpoint, formData)
      .pipe(catchError(this.handleError));
  }


  // --- Removed Methods (No longer used by the simplified front office form) ---

  /*
   * getApplications(): Observable<MicrocreditApplication[]>; // Removed table view
   * getApplicationById(id: number): Observable<MicrocreditApplication>; // Removed view details
   * deleteApplication(id: number): Observable<void>; // Removed delete functionality
   * evaluateApplication(applicationId: number): Observable<MicrocreditApplication>; // Removed evaluation trigger
   * checkApproval(applicationId: number): Observable<any>; // Removed email trigger
   * submitApplicationWithDocument(): Observable<MicrocreditApplication>; // Removed combined submission
   */

  // Note: If other parts of your application still use the removed methods (like a backend admin panel),
  // you should keep those methods in a separate service or in this service if it's shared.
  // For this specific front office component, these methods are not needed.
}
