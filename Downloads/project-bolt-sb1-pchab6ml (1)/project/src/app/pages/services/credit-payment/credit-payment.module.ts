import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditPaymentComponent } from './credit-payment.component';
import { CreditPaymentService } from './credit-payment.service';

const routes: Routes = [
  {
    path: '',
    component: CreditPaymentComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CreditPaymentComponent
  ],
  providers: [CreditPaymentService],
  exports: [RouterModule]
})
export class CreditPaymentModule { } 