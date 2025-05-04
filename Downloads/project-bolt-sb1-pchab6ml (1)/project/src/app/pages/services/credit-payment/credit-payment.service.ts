import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PaiementMensuel {
  id: number;
  montantMensuel: number;
  capitalRestant: number;
  montantInteret: number;
  datePaiement: string;
  transactionId: string;
  developerTrackingId: string | null;
  status?: string | null;
  user?: { id: number };
  creditApplication?: { id: number };
}

export interface PaymentResponse {
  message: string;
  payment_result: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditPaymentService {
  private apiUrl = 'http://localhost:8083/api/paiements';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('HTTP Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  getAllMonthlyPayments(): Observable<PaiementMensuel[]> {
    return this.http.get<PaiementMensuel[]>(`${this.apiUrl}/monthly`)
      .pipe(
        catchError(this.handleError)
      );
  }

  generatePayment(payment: PaiementMensuel): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/generate`, payment)
      .pipe(catchError(this.handleError));
  }

  markPaymentAsPaid(paymentId: number): Observable<PaiementMensuel> {
    return this.http.put<PaiementMensuel>(`${this.apiUrl}/${paymentId}/mark-paid`, {})
      .pipe(catchError(this.handleError));
  }

  checkPaymentStatus(paymentId: number): Observable<PaiementMensuel> {
    return this.http.get<PaiementMensuel>(`${this.apiUrl}/${paymentId}/status`)
      .pipe(catchError(this.handleError));
  }
} 