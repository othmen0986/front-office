import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Service[] = [
    {
      id: 'credit',
      title: 'Crédit Auto',
      description: 'Solutions de financement flexibles pour l\'achat de votre véhicule',
      icon: 'assets/icons/credit.svg',
      route: '/services/credit',
      relatedServices: ['payment', 'insurance']
    },
    {
      id: 'payment',
      title: 'Paiement',
      description: 'Options de paiement sécurisées et simplifiées',
      icon: 'assets/icons/payment.svg',
      route: '/services/payment',
      relatedServices: ['credit', 'insurance']
    },
    {
      id: 'insurance',
      title: 'Microassurance',
      description: 'Protégez votre investissement avec nos contrats d\'assurance sur mesure',
      icon: 'assets/icons/insurance.svg',
      route: '/services/insurance',
      relatedServices: ['credit', 'parts']
    },
    {
      id: 'parts',
      title: 'Pièces Détachées',
      description: 'Gestion et fourniture de pièces détachées authentiques pour votre véhicule',
      icon: 'assets/icons/parts.svg',
      route: '/services/parts',
      relatedServices: ['expertise', 'vehicles']
    },
    {
      id: 'expertise',
      title: 'Expertise',
      description: 'Évaluation professionnelle et certification de l\'état de votre véhicule',
      icon: 'assets/icons/expertise.svg',
      route: '/services/expertise',
      relatedServices: ['parts', 'vehicles']
    },
    {
      id: 'vehicles',
      title: 'Véhicules',
      description: 'Gestion complète de votre véhicule de l\'importation à la livraison',
      icon: 'assets/icons/vehicles.svg',
      route: '/services/vehicles',
      relatedServices: ['expertise', 'parts']
    }
  ];

  getServices(): Service[] {
    return this.services;
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }

  getRelatedServices(id: string): Service[] {
    const service = this.getServiceById(id);
    if (!service) return [];
    
    return service.relatedServices
      .map(relatedId => this.getServiceById(relatedId))
      .filter((s): s is Service => s !== undefined);
  }
}