import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditPaymentComponent } from './credit-payment.component';

const routes: Routes = [
  {
    path: '',
    component: CreditPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditPaymentRoutingModule { } 