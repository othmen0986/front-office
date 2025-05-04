import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditPaymentComponent } from './credit-payment.component';
import { Router } from '@angular/router';
import { CreditPaymentService } from './credit-payment.service';
import { of, throwError } from 'rxjs';
import { PaiementMensuel } from './credit-payment.service';

describe('CreditPaymentComponent', () => {
  let component: CreditPaymentComponent;
  let fixture: ComponentFixture<CreditPaymentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let creditPaymentServiceSpy: jasmine.SpyObj<CreditPaymentService>;

  const mockPayments: PaiementMensuel[] = [
    {
      id: 1,
      montantMensuel: 1000,
      capitalRestant: 5000,
      montantInteret: 100,
      datePaiement: '2024-05-01',
      transactionId: '123',
      developerTrackingId: '123',
      Status: 'EN_ATTENT',
      user: { id: 1 },
      creditApplication: { id: 1 }
    }
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    creditPaymentServiceSpy = jasmine.createSpyObj('CreditPaymentService', ['getAllMonthlyPayments']);

    await TestBed.configureTestingModule({
      imports: [CreditPaymentComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CreditPaymentService, useValue: creditPaymentServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditPaymentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load payments on init', () => {
    creditPaymentServiceSpy.getAllMonthlyPayments.and.returnValue(of(mockPayments));
    fixture.detectChanges();
    expect(component.payments).toEqual(mockPayments);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should handle error when loading payments', () => {
    const errorMessage = 'Error loading payments';
    creditPaymentServiceSpy.getAllMonthlyPayments.and.returnValue(throwError(() => new Error(errorMessage)));
    fixture.detectChanges();
    expect(component.error).toBe(errorMessage);
    expect(component.loading).toBeFalse();
    expect(component.payments).toEqual([]);
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/services']);
  });

  it('should reload payments when retry button is clicked', () => {
    creditPaymentServiceSpy.getAllMonthlyPayments.and.returnValue(of(mockPayments));
    component.error = 'Some error';
    component.loadPayments();
    expect(component.error).toBeNull();
    expect(component.loading).toBeTrue();
    expect(creditPaymentServiceSpy.getAllMonthlyPayments).toHaveBeenCalled();
  });

  it('should log payment initiation', () => {
    spyOn(console, 'log');
    component.initiatePayment(mockPayments[0]);
    expect(console.log).toHaveBeenCalledWith('Initiating payment for:', mockPayments[0]);
  });
}); 