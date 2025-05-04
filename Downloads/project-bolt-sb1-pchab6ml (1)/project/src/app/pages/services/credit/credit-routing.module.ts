// src/app/credit/credit-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';

const routes: Routes = [
  {
    path: '', // Path relative to the parent route that loads this module
    component: CreditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }