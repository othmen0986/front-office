import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // <-- Import FormsModule here
import { Router } from '@angular/router';

// Assuming MicrocreditService has been updated or a new method added
// to handle application submission with a document upload (e.g., using FormData)
import { CreditService } from './credit.services'; // <-- Corrected service import

// NgbModal is no longer needed as we removed modals
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule here
import { trigger as ngTrigger, transition, style, animate } from '@angular/animations';
import { switchMap } from 'rxjs/operators'; // <-- Import switchMap for chaining observables


// --- Interfaces ---

// Interface for Application Data (Matches the backend entity structure)
// We keep the fields that might be returned by the backend after processing,
// even if the front office form doesn't collect all of them directly.
interface MicrocreditApplication {
  id?: number;
  personAge: number | null;
  personIncome: number | null;
  // Corrected: Use number | null for these fields to match backend 'int' expectation
  personHomeOwnership: number | null;
  personEmpLength: number | null;
  loanIntent: number | null;
  loanGrade: number | null;
  loanAmnt: number | null;
  loanIntRate: number | null;
  dti: number | null;
  creditScore: number | null;
  user_id: number | null;
  loanTermMonths: number | null;
  status?: string; // e.g., "SUBMITTED", "PENDING_VERIFICATION", etc. Set by backend

  // Verification results - these will be populated by the backend after document upload/verification
  signed?: boolean;
  // Corrected: Allow null and undefined for comment
  comment?: string | null;
  // Corrected: Allow null and undefined for uploadedImage
  uploadedImage?: string | null;

  // Evaluation result - populated by backend after evaluation
  isApproved?: boolean;
  // Added geminiResponse as per service interface and allow null/undefined
  geminiResponse?: string | null;
}

// Interface for select options (remains the same, but values will be numbers)
interface Option {
  value: number; // <-- Changed to number
  label: string;
}


@Component({
  standalone: true,
  selector: 'app-microcredit', // Consider if this should be app-credit based on file name
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  imports: [ // <-- Add imports array for standalone component
    CommonModule, // Needed for directives like ngIf, ngFor
    FormsModule, // Needed for NgForm, ngModel, and other form directives
    // Add other standalone components or modules used in the template here
  ],
  animations: [
    ngTrigger('fadeInRight', [ // Use ngTrigger here
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),

    ngTrigger('fadeInUp', [ // Use ngTrigger here
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]

})
export class CreditComponent implements OnInit {

  // Removed @ViewChild references for modals and table-related elements
  @ViewChild('microcreditForm') microcreditForm!: NgForm;
  @ViewChild('documentFileInput') documentFileInput!: ElementRef; // Reference to the file input in the main form


  // Removed table/list properties
  // applications: MicrocreditApplication[] = [];
  // filteredApplications: MicrocreditApplication[] = [];

  // Property for the form data - holds the data for the single application being submitted
  currentApplication: MicrocreditApplication = this.createEmptyApplication();

  // Removed properties for view/delete/verify actions on specific applications
  // selectedApplication: MicrocreditApplication | null = null;
  // applicationToVerify: MicrocreditApplication | null = null;
  // selectedFileForVerification: File | null = null; // This state is replaced by selectedFile

  // Loading states simplified
  // isLoading = false; // Removed, no table/general load state needed
  isSubmittingData = false; // Only need state for the main form submission

  // Removed other loading states related to old actions
  // isVerifyingDocument = false;
  // isEvaluating = false;

  // Removed error state for table loading
  // error: string | null = null;

  // Removed search and pagination properties
  // searchTerm: string = '';
  // currentPage = 0;
  // pageSize = 10;
  // totalItems = 0;
  // totalPages = 0;


  // Property to hold the file selected for the application submission
  selectedFile: File | null = null;

  // Properties for submission feedback messages
  submissionSuccess: string | null = null;
  submissionError: string | null = null;


  // --- Options for selects (Using numeric values to match backend 'int') ---
  homeOwnershipOptions: Option[] = [
    { value: 0, label: 'Other' },
    { value: 1, label: 'Rent' },
    { value: 2, label: 'Own' },
    { value: 3, label: 'Mortgage' },
  ];

  loanIntentOptions: Option[] = [
     { value: 0, label: 'Personal' },
     { value: 1, label: 'Medical' },
     { value: 2, label: 'Car Purchase' },
     { value: 3, label: 'Other' },
     { value: 4, label: 'Home Improvement' },
     { value: 5, label: 'Debt Consolidation' },
  ];

  loanGradeOptions: Option[] = [
    { value: 1, label: 'A' }, { value: 2, label: 'B' }, { value: 3, label: 'C' },
    { value: 4, label: 'D' }, { value: 5, label: 'E' }, { value: 6, label: 'F' },
    { value: 7, label: 'G' },
  ];


  // Removed NgbModal from constructor
  constructor(
    private microcreditService: CreditService, // <-- Corrected service name in constructor
    private router: Router
  ) {}

  // Simplified ngOnInit - no initial data load needed for the form
  ngOnInit(): void {
    // Initialization logic if needed, but no data loading for the form view
  }

  // Removed loadApplications, applyFilter, pagination methods


  // --- File Selection Handler (For the main form file input) ---

    /**
     * Handles the file selection event from the main form's file input.
     * Performs basic validation (type, size) and stores the selected file.
     */
    onFileSelected(event: any): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          const file = input.files[0];
          const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
          const maxSizeMB = 5; // 5MB
          const maxSizeBytes = maxSizeMB * 1024 * 1024;

          if (!allowedTypes.includes(file.type)) {
              alert('Invalid file type. Only JPG, PNG, and PDF are allowed.');
              this.selectedFile = null;
              input.value = ''; // Clear the file input
              return;
          }

          if (file.size > maxSizeBytes) {
              alert(`File size exceeds the limit of ${maxSizeBytes / 1024 / 1024}MB.`);
              this.selectedFile = null;
              input.value = ''; // Clear the file input
              return;
              }

          this.selectedFile = file;
          console.log('File selected for submission:', this.selectedFile.name);
      } else {
          this.selectedFile = null;
          console.log('No file selected for submission.');
      }
    }


  // --- Form Submission Method ---

  /**
   * Handles the submission of initial application data and then the document.
   * Implements a two-step process: submit data (JSON), then upload document (multipart/form-data).
   * Uses switchMap to chain the observables.
   */
  onSubmitApplicationData(form: NgForm): void {
    // Reset feedback messages
    this.submissionSuccess = null;
    this.submissionError = null;

    if (form.invalid) {
      console.warn('Application form is invalid.');
      this.markFormAsTouched(form); // Mark fields as touched to show validation errors
      this.submissionError = 'Please fill in all required fields.';
      return;
    }

    if (!this.selectedFile) {
           console.warn('No document file selected.');
           this.submissionError = 'Please select a supporting document to upload.';
           return;
    }

    this.isSubmittingData = true; // Start overall submission loading state

    // Step 1: Prepare Application Data (JSON) to send to the /apply endpoint
    // Create a copy of the application data to send, excluding backend-managed fields
    // Ensure values for select fields are numbers to match backend 'int'
    const applicationDataToSend = {
        personAge: this.currentApplication.personAge,
        personIncome: this.currentApplication.personIncome,
        personHomeOwnership: this.currentApplication.personHomeOwnership, // Should be a number
        personEmpLength: this.currentApplication.personEmpLength,
        loanIntent: this.currentApplication.loanIntent, // Should be a number
        loanGrade: this.currentApplication.loanGrade, // Should be a number
        loanAmnt: this.currentApplication.loanAmnt,
        loanIntRate: this.currentApplication.loanIntRate,
        dti: this.currentApplication.dti,
        creditScore: this.currentApplication.creditScore,
        loanTermMonths: this.currentApplication.loanTermMonths,
        // Do NOT include id, status, signed, comment, uploadedImage, isApproved, user_id, geminiResponse here
        // as these are typically set by the backend on creation or subsequent steps.
    };

    console.log('Attempting to submit application data (Step 1). Data being sent:', applicationDataToSend); // <-- Added console log for debugging 400 error


    // Chain the two API calls using pipe and switchMap
    this.microcreditService.submitApplication(applicationDataToSend as MicrocreditApplication).pipe(
      // switchMap waits for the submitApplication observable to complete successfully,
      // then takes its emitted value (the created application with ID)
      // and subscribes to the new observable returned by the inner function (verifyDocument).
      // The result of the verifyDocument observable is then emitted to the final subscribe block.
      switchMap(createdApplication => {
        console.log('Application data submitted successfully (Step 1). Created application:', createdApplication);

        // Check if the created application has an ID returned by the backend
        if (!createdApplication.id) {
           // If backend didn't return an ID, we can't upload the document.
           // Throw an error to be caught by the catchError operator.
           const errorMsg = 'Application created, but no ID received from backend for document upload.';
           console.error(errorMsg);
           // Returning throwError inside switchMap correctly stops the chain
           return throwError(() => new Error(errorMsg));
        }

        // Step 2: Upload Document using the ID from the created application
        const appId = createdApplication.id;
        const fileToUpload = this.selectedFile!; // Use non-null assertion as we checked above

        console.log(`Proceeding to upload document for application ID: ${appId} (Step 2)`);
        // Return the observable for the document upload
        return this.microcreditService.verifyDocument(appId, fileToUpload);
      }),
      // catchError handles errors from *either* the submitApplication or the verifyDocument observable
      catchError((error: HttpErrorResponse) => {
          this.isSubmittingData = false; // Turn off loading state on error
          console.error('Submission process failed:', error);
          let errorMessage = 'An error occurred during the submission process.';
          // Attempt to extract a meaningful error message
          if (error.error && typeof error.error === 'string') {
             // If the backend sends a plain string error message
             errorMessage = error.error;
          } else if (error.error && typeof error.error === 'object' && (error.error.message || error.error.error)) {
             // If the backend sends a structured error object (common in Spring Boot)
             errorMessage = error.error.message || error.error.error;
          }
          else if (error.message) {
             // Fallback to the standard HTTP error message
             errorMessage = error.message;
          } else if (error.statusText) {
             // Fallback to status text
             errorMessage = `Error ${error.status}: ${error.statusText}`;
          } else {
             // Generic error message
             errorMessage = `Error ${error.status || 'Unknown'}: Bad Request`;
          }
          this.submissionError = 'Submission failed: ' + errorMessage;
          // Do not re-throw the error here if we are handling it visually in the component
          // Returning throwError here ensures the final subscribe block is not called after an error
          return throwError(() => new Error(errorMessage));
      })
    )
    // The final subscribe block is executed ONLY if BOTH submitApplication and verifyDocument succeed
    .subscribe(finalApplicationStatus => {
      this.isSubmittingData = false; // Turn off loading state on success
      console.log('Document uploaded successfully. Final application status:', finalApplicationStatus);

      // Display success message based on the final status after document upload
      this.submissionSuccess = `Application #${finalApplicationStatus.id} submitted and document uploaded successfully! Current Status: ${finalApplicationStatus.status}`;

      // Reset the form and selected file after successful submission
      form.resetForm();
      this.currentApplication = this.createEmptyApplication();
      this.selectedFile = null;
      if (this.documentFileInput && this.documentFileInput.nativeElement) {
           this.documentFileInput.nativeElement.value = ''; // Reset file input element
      }
    });
  }


  // Removed all other action methods (viewDetails, confirmDelete, etc.)


  // --- Utility Methods ---

  /**
   * Creates a new empty MicrocreditApplication object for the form.
   */
  createEmptyApplication(): MicrocreditApplication {
    return {
      // id is undefined for new applications
      id: undefined,
      personAge: null,
      personIncome: null,
      personHomeOwnership: null, // Use null for selects before selection (will be number)
      personEmpLength: null,
      loanIntent: null, // Use null for selects before selection (will be number)
      loanGrade: null, // Use null for selects before selection (will be number)
      loanAmnt: null,
      loanIntRate: null,
      dti: null,
      creditScore: null,
      user_id: null, // Assuming this is set by backend
      loanTermMonths: null,
      status: undefined, // Status is set by backend on creation
      // Verification/Evaluation fields are not set on creation
      signed: undefined,
      comment: null, // Initialize as null
      uploadedImage: null, // Initialize as null
      isApproved: undefined,
      geminiResponse: null // Initialize as null
    };
  }

  /**
   * Helper to get the label for a select option value.
   * Kept as it might be useful elsewhere, but not strictly needed for this form-only view.
   */
  getLabel(value: number | string | null | undefined, options: Option[]): string {
      if (value === null || value === undefined) {
          return 'N/A';
      }
      // Convert value to string for consistent comparison with option.value if it's mixed number/string
      const stringValue = String(value);
      const option = options.find(opt => String(opt.value) === stringValue);

      return option ? option.label : `Unknown Value (${value})`;
  }

  /**
   * Marks all form controls as touched to trigger validation messages.
   */
  markFormAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }

  // Removed pagination helper method getPages()
  // Removed isActionLoading helper method


  // Removed checkApproval method

  viewPayments(): void {
    if (this.currentApplication?.id) {
      this.router.navigate(['/services/credit-payment'], {
        queryParams: { creditId: this.currentApplication.id }
      });
    }
  }
}
// Removed the separate 'trigger' function definition outside the class
// as 'trigger' from '@angular/animations' should be used directly or aliased
// within the component's 'animations' array as done above.
