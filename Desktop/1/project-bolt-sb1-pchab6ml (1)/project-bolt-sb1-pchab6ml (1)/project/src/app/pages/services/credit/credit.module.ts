import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Add this for ngForm

import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <--- Import BrowserAnimationsModule
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, // <-- Required for template-driven forms
    CreditRoutingModule,
    BrowserAnimationsModule,
    CreditComponent, // <-- Import standalone component
  ]
  // Don't put components in imports array
})
export class MicrocreditModule {}