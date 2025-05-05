import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ahmed B.',
      role: 'Bénéficiaire FCR',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'Grâce à cette plateforme, j\'ai pu importer ma voiture sans frais de douane et offrir une opportunité à un acheteur local. Le processus était simple et transparent.',
      rating: 5
    },
    {
      id: 2,
      name: 'Salma T.',
      role: 'Acheteuse',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'J\'ai économisé plus de 30% sur l\'achat de ma nouvelle voiture. Le service de crédit était rapide et les conditions très avantageuses.',
      rating: 4
    },
    {
      id: 3,
      name: 'Mehdi K.',
      role: 'Bénéficiaire FCR',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'Le service d\'expertise a vérifié minutieusement chaque détail du véhicule avant la transaction. Une tranquillité d\'esprit pour moi et l\'acheteur.',
      rating: 5
    },
    {
      id: 4,
      name: 'Leila H.',
      role: 'Acheteuse',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'La gestion des pièces détachées m\'a évité beaucoup de tracas. Tout est disponible sur la plateforme et livré rapidement.',
      rating: 4
    }
  ];

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }
}