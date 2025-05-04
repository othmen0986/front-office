import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Or just provideHttpClient if not using fetch API explicitly
import { FormsModule } from '@angular/forms'; // <-- Add this for ngForm
@Component({
  selector: 'app-root',
  imports: [FormsModule,RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 140px);
    }
  `]
})
export class AppComponent {
  title = 'CarHabty';
}