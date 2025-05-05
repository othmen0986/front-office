import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Or just provideHttpClient if not using fetch API explicitly
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), provideHttpClient()
  ]
});