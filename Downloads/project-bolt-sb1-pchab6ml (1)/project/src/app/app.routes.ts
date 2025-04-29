import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'services/credit',
    loadComponent: () => import('./pages/services/credit/credit.component').then(m => m.CreditComponent)
  },
  {
    path: 'services/payment',
    loadComponent: () => import('./pages/services/payment/payment.component').then(m => m.PaymentComponent)
  },
  {
    path: 'services/insurance',
    loadComponent: () => import('./pages/services/insurance/insurance.component').then(m => m.InsuranceComponent)
  },
  {
    path: 'services/vehicles',
    loadComponent: () => import('./pages/services/vehicles/vehicles.component').then(m => m.VehiclesComponent)
  },
  {
    path: 'services/vehicles/:id',
    loadComponent: () => import('./pages/services/vehicles/vehicle-details/vehicle-details.component')
      .then(m => m.VehicleDetailsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];