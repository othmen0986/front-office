import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { CreditPaymentService, PaiementMensuel, PaymentResponse } from './credit-payment.service';
import { trigger as ngTrigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-credit-payment',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="credit-payment-container" @fadeInRight>
      <div class="header">
        <button class="back-button" (click)="goBack()">
          <fa-icon [icon]="faArrowLeft"></fa-icon> Back
        </button>
        <h2>Credit Payments</h2>
      </div>
      
      <div class="content" @fadeInUp>
        <!-- Loading State -->
        <div class="loading-container" *ngIf="loading">
          <p>Loading payments...</p>
        </div>

        <!-- Error State -->
        <div class="error-container" *ngIf="error">
          <p class="error-message">{{ error }}</p>
          <button (click)="loadPayments()">Retry</button>
        </div>

        <!-- Payment Processing State -->
        <div class="loading-container" *ngIf="processingPayment">
          <p>Generating payment link...</p>
        </div>

        <!-- Payment Error State -->
        <div class="error-container" *ngIf="paymentError">
          <p class="error-message">{{ paymentError }}</p>
          <button (click)="paymentError = null">Close</button>
        </div>

        <!-- Payments Table -->
        <div class="payments-table-container" *ngIf="!loading && !error && !processingPayment">
          <table class="payments-table">
            <thead>
              <tr>
                <th>Payment Date</th>
                <th>Monthly Amount</th>
                <th>Remaining Capital</th>
                <th>Interest Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let payment of payments" @fadeInUp>
                <td>{{payment.datePaiement | date:'MM/dd/yyyy'}}</td>
                <td>{{payment.montantMensuel | currency:'USD'}}</td>
                <td>{{payment.capitalRestant | currency:'USD'}}</td>
                <td>{{payment.montantInteret | currency:'USD'}}</td>
                <td>{{ getStatusLabel(payment.status) }}</td>
                <td>
                  <button class="pay-button"
                          (click)="initiatePayment(payment)"
                          [disabled]="processingPayment || payment.status === 'COMPLETED'">
                    <fa-icon [icon]="faCreditCard"></fa-icon>
                    {{payment.status === 'COMPLETED' ? 'Paid' : 'Pay'}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="no-payments" *ngIf="payments.length === 0">
            No payments found
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .credit-payment-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2.5rem 2rem 2rem 2rem;
      background: linear-gradient(135deg, #0a1833 0%, #142850 100%);
      min-height: 100vh;
      border-radius: 32px;
      box-shadow: 0 12px 48px 0 rgba(10,24,51,0.55), 0 1.5px 8px 0 #00eaff33;
      position: relative;
      overflow: hidden;
    }

    .credit-payment-container::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -120px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, #00eaff55 0%, transparent 70%);
      filter: blur(24px);
      z-index: 0;
    }

    .credit-payment-container::after {
      content: '';
      position: absolute;
      bottom: -100px;
      left: -100px;
      width: 260px;
      height: 260px;
      background: radial-gradient(circle, #009ffd44 0%, transparent 70%);
      filter: blur(32px);
      z-index: 0;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      .back-button {
        background: none;
        border: none;
        color: #1a237e;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem;
        margin-right: 1rem;

        &:hover {
          color: #0d47a1;
        }
      }

      h2 {
        color: #7ecfff;
        margin: 0;
        font-weight: 600;
        text-shadow: 0 0 12px #009ffd99;
        letter-spacing: 0.04em;
      }
    }

    .content {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .loading-container {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .error-container {
      background-color: #ffebee;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;

      .error-message {
        color: #c62828;
        margin-bottom: 1rem;
      }

      button {
        background-color: #c62828;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #b71c1c;
        }
      }
    }

    .payments-table-container {
      overflow-x: auto;
      border-radius: 20px;
      box-shadow: 0 6px 32px 0 #00eaff22;
      background: rgba(20, 40, 80, 0.92);
      backdrop-filter: blur(10px) saturate(1.2);
      margin-bottom: 2.5rem;
      position: relative;
      z-index: 1;
    }

    .payments-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: none;
      font-size: 1.08rem;
      letter-spacing: 0.025em;
    }

    .payments-table thead {
      background: linear-gradient(90deg, #0a1833 60%, #00eaff 100%);
      color: #e0f7fa;
      text-shadow: 0 0 12px #00eaff66;
    }

    .payments-table th {
      padding: 1.3rem 1.1rem;
      text-align: left;
      font-weight: 800;
      border-bottom: 2.5px solid #00eaff;
      white-space: nowrap;
      background: none;
      color: #e0f7fa;
      letter-spacing: 0.06em;
      text-shadow: 0 0 10px #00eaff55;
      font-size: 1.08rem;
    }

    .payments-table tbody tr {
      transition: background 0.3s, box-shadow 0.3s;
    }

    .payments-table tbody tr:nth-child(even) {
      background: rgba(20, 40, 80, 0.93);
    }

    .payments-table tbody tr:nth-child(odd) {
      background: rgba(10, 24, 51, 0.93);
    }

    .payments-table tbody tr:hover {
      background: #00eaff22;
      box-shadow: 0 0 24px 0 #00eaff77;
    }

    .payments-table td {
      padding: 1.15rem 1.1rem;
      border-bottom: 1.5px solid #142850;
      color: #e0f7fa;
      white-space: nowrap;
      background: none;
      font-weight: 600;
      font-size: 1.05rem;
      text-shadow: 0 0 6px #00eaff22;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      display: inline-block;
    }

    .status-pending {
      background-color: #ff9800;
      color: white;
    }

    .status-completed {
      background-color: #4caf50;
      color: white;
    }

    .status-failed {
      background-color: #c62828;
      color: white;
    }

    .pay-button {
      background: linear-gradient(90deg, #00eaff 0%, #142850 100%);
      color: #e0f7fa;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 800;
      font-size: 1.05rem;
      box-shadow: 0 0 18px 0 #00eaff55;
      transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      text-shadow: 0 0 8px #00eaff44;
      letter-spacing: 0.04em;
    }

    .pay-button:disabled {
      background: linear-gradient(90deg, #142850 0%, #0a1833 100%);
      color: #7ecfff;
      cursor: not-allowed;
      box-shadow: none;
      opacity: 0.7;
    }

    .no-payments {
      text-align: center;
      padding: 2.2rem;
      color: #00eaff;
      background: none;
      border-radius: 16px;
      margin-top: 1.2rem;
      font-size: 1.13rem;
      letter-spacing: 0.04em;
      text-shadow: 0 0 8px #00eaff55;
    }

    .header, .content, .error-container, .loading-container {
      background: none;
      color: #e0f7fa;
    }

    .error-message {
      color: #ff6b6b;
      text-shadow: 0 0 10px #ff6b6b55;
    }

    .credit-payment-container h2, .credit-payment-container h1 {
      color: #00eaff;
      text-shadow: 0 0 18px #00eaff99;
      letter-spacing: 0.07em;
      font-weight: 900;
      font-size: 2.2rem;
      margin-bottom: 1.2rem;
    }
  `],
  animations: [
    ngTrigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    ngTrigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CreditPaymentComponent implements OnInit {
  payments: PaiementMensuel[] = [];
  loading = false;
  error: string | null = null;
  processingPayment = false;
  paymentError: string | null = null;

  faArrowLeft = faArrowLeft;
  faCreditCard = faCreditCard;

  constructor(
    private router: Router,
    private creditPaymentService: CreditPaymentService
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.error = null;

    this.creditPaymentService.getAllMonthlyPayments()
      .subscribe({
        next: (payments) => {
          console.log('Received payments from backend:', payments);
          this.payments = payments;
          this.loading = false;
        },
        error: (error: Error) => {
          console.error('Error loading payments:', error);
          this.error = 'Failed to load payments. Please try again later.';
          this.loading = false;
        }
      });
  }

  initiatePayment(payment: PaiementMensuel): void {
    this.processingPayment = true;
    this.paymentError = null;

    console.log('Initiating payment for:', payment);

    // Create a complete payment request with all required fields
    const paymentRequest: PaiementMensuel = {
      ...payment,
      transactionId: `PAY-${payment.id}-${Date.now()}`,
      developerTrackingId: `DEV-${payment.id}-${Date.now()}`,
      user: {
        id: 1 // Replace with actual user ID from your auth service
      },
      creditApplication: {
        id: payment.creditApplication?.id || 1 // Use existing ID or default to 1
      }
    };

    console.log('Sending payment request:', paymentRequest);

    this.creditPaymentService.generatePayment(paymentRequest)
      .subscribe({
        next: (response: PaymentResponse) => {
          console.log('Payment response:', response);
          if (response.payment_result) {
            try {
              const linkMatch = response.payment_result.match(/link=([^,]+)/);
              if (linkMatch && linkMatch[1]) {
                const paymentLink = linkMatch[1];
                // Open the payment link in the same window
                window.location.href = paymentLink;
              } else {
                this.paymentError = 'Could not extract payment link from response';
              }
            } catch (error) {
              this.paymentError = 'Error parsing payment response';
              console.error('Error parsing payment response:', error);
            }
          } else {
            this.paymentError = 'No payment link received from the server';
          }
          this.processingPayment = false;
        },
        error: (error: Error) => {
          console.error('Payment error:', error);
          this.paymentError = error.message;
          this.processingPayment = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/services']);
  }

  getStatusLabel(status: string | null | undefined): string {
    if (!status) return 'N/A';
    switch (status) {
      case 'PENDING': return 'Pending';
      case 'COMPLETED': return 'Paid';
      case 'FAILED': return 'Failed';
      default: return status;
    }
  }
} 