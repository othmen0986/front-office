import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceBannerComponent } from '../../../shared/service-banner/service-banner.component';
import { RelatedServicesComponent } from '../../../shared/related-services/related-services.component';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../../core/animations/fade.animation';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule, ServiceBannerComponent, RelatedServicesComponent],
  template: `
    <div class="service-page">
      <app-service-banner 
        title="Microassurance Automobile" 
        subtitle="Des solutions d'assurance adaptées pour protéger votre véhicule et votre investissement">
      </app-service-banner>
      
      <div class="container">
        <div class="service-content">
          <div class="main-content" @fadeInLeft>
            <h2>Une protection optimale pour votre véhicule</h2>
            
            <div class="insurance-plans">
              <div class="plan-card">
                <div class="plan-header">
                  <h3>Formule Essentielle</h3>
                  <div class="plan-price">À partir de <span>50 DT</span>/mois</div>
                </div>
                <div class="plan-features">
                  <ul>
                    <li>Responsabilité civile</li>
                    <li>Assistance de base</li>
                    <li>Garantie conducteur</li>
                    <li class="not-included">Bris de glace</li>
                    <li class="not-included">Vol et incendie</li>
                    <li class="not-included">Dommages tous accidents</li>
                  </ul>
                </div>
                <a href="#" class="plan-btn">En savoir plus</a>
              </div>
              
              <div class="plan-card recommended">
                <div class="recommended-badge">Recommandé</div>
                <div class="plan-header">
                  <h3>Formule Intermédiaire</h3>
                  <div class="plan-price">À partir de <span>80 DT</span>/mois</div>
                </div>
                <div class="plan-features">
                  <ul>
                    <li>Responsabilité civile</li>
                    <li>Assistance premium</li>
                    <li>Garantie conducteur</li>
                    <li>Bris de glace</li>
                    <li>Vol et incendie</li>
                    <li class="not-included">Dommages tous accidents</li>
                  </ul>
                </div>
                <a href="#" class="plan-btn">En savoir plus</a>
              </div>
              
              <div class="plan-card">
                <div class="plan-header">
                  <h3>Formule Tous Risques</h3>
                  <div class="plan-price">À partir de <span>120 DT</span>/mois</div>
                </div>
                <div class="plan-features">
                  <ul>
                    <li>Responsabilité civile</li>
                    <li>Assistance premium</li>
                    <li>Garantie conducteur étendue</li>
                    <li>Bris de glace</li>
                    <li>Vol et incendie</li>
                    <li>Dommages tous accidents</li>
                  </ul>
                </div>
                <a href="#" class="plan-btn">En savoir plus</a>
              </div>
            </div>
            
            <div class="service-description">
              <p>Nos formules d'assurance sont spécialement conçues pour les véhicules importés sous privilège FCR. Nous collaborons avec les meilleures compagnies d'assurance pour vous proposer des contrats sur mesure avec des tarifs préférentiels.</p>
              
              <p>Notre équipe vous accompagne dans le choix de la formule la plus adaptée à vos besoins et à votre budget, en tenant compte des spécificités de votre véhicule et de votre profil de conducteur.</p>
            </div>
            
            <div class="insurance-benefits">
              <h3>Les avantages de notre microassurance</h3>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <div class="benefit-icon">🔄</div>
                  <h4>Flexibilité</h4>
                  <p>Des contrats adaptables selon vos besoins et votre budget</p>
                </div>
                
                <div class="benefit-item">
                  <div class="benefit-icon">⚡</div>
                  <h4>Rapidité</h4>
                  <p>Souscription en ligne et obtention immédiate de votre attestation</p>
                </div>
                
                <div class="benefit-item">
                  <div class="benefit-icon">💼</div>
                  <h4>Simplicité</h4>
                  <p>Gestion simplifiée de votre contrat via notre plateforme</p>
                </div>
                
                <div class="benefit-item">
                  <div class="benefit-icon">🛡️</div>
                  <h4>Protection</h4>
                  <p>Couverture complète adaptée aux véhicules importés</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sidebar" @fadeInRight>
            <div class="info-card">
              <h3>FAQ Assurance</h3>
              <div class="faq-list">
                <div class="faq-item">
                  <h4>Quelles sont les garanties essentielles pour mon véhicule?</h4>
                  <p>Les garanties essentielles comprennent la responsabilité civile (obligatoire), l'assistance, et idéalement le vol et l'incendie pour les véhicules importés.</p>
                </div>
                
                <div class="faq-item">
                  <h4>Comment est calculée ma prime d'assurance?</h4>
                  <p>La prime est calculée en fonction de plusieurs critères: la valeur du véhicule, votre profil de conducteur, les garanties choisies et l'usage du véhicule.</p>
                </div>
                
                <div class="faq-item">
                  <h4>Puis-je souscrire une assurance pour un véhicule importé?</h4>
                  <p>Oui, nous proposons des formules spécifiques pour les véhicules importés sous privilège FCR, avec des garanties adaptées.</p>
                </div>
              </div>
            </div>
            
            <div class="info-card">
              <h3>Demande de devis gratuit</h3>
              <p>Recevez un devis personnalisé en quelques minutes</p>
              <a href="#" class="primary-btn">Obtenir un devis</a>
            </div>
            
            <app-related-services serviceId="insurance"></app-related-services>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .service-page {
      color: #e0e0e0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .service-content {
      display: flex;
      gap: 40px;
      margin: 60px 0;
      flex-wrap: wrap;
    }
    
    .main-content {
      flex: 2;
      min-width: 300px;
    }
    
    .sidebar {
      flex: 1;
      min-width: 280px;
    }
    
    h2 {
      font-size: 32px;
      color: #ffffff;
      margin-bottom: 30px;
      position: relative;
    }
    
    h2:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #3d84ff, #4da1ff);
    }
    
    .insurance-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }
    
    .plan-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }
    
    .plan-card:hover {
      transform: translateY(-5px);
      border-color: rgba(77, 161, 255, 0.3);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    
    .plan-card.recommended {
      border-color: #4da1ff;
      transform: scale(1.05);
      z-index: 1;
    }
    
    .plan-card.recommended:hover {
      transform: scale(1.05) translateY(-5px);
    }
    
    .recommended-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #4da1ff;
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .plan-header {
      padding: 25px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .plan-header h3 {
      color: #ffffff;
      margin-bottom: 10px;
      font-size: 20px;
    }
    
    .plan-price {
      color: #e0e0e0;
      font-size: 16px;
    }
    
    .plan-price span {
      color: #4da1ff;
      font-size: 24px;
      font-weight: 600;
    }
    
    .plan-features {
      padding: 25px;
    }
    
    .plan-features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .plan-features li {
      padding: 10px 0;
      position: relative;
      padding-left: 25px;
    }
    
    .plan-features li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #4da1ff;
    }
    
    .plan-features li.not-included {
      opacity: 0.6;
    }
    
    .plan-features li.not-included:before {
      content: '✕';
      color: #ff4d4d;
    }
    
    .plan-btn {
      display: block;
      text-align: center;
      background: transparent;
      color: #4da1ff;
      padding: 12px 0;
      text-decoration: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .plan-btn:hover {
      background: rgba(77, 161, 255, 0.1);
    }
    
    .service-description {
      margin: 40px 0;
    }
    
    .service-description p {
      margin-bottom: 20px;
      line-height: 1.7;
    }
    
    .insurance-benefits {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 30px;
      margin-top: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .insurance-benefits h3 {
      color: #ffffff;
      margin-bottom: 25px;
      font-size: 22px;
      text-align: center;
    }
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .benefit-item {
      text-align: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .benefit-item:hover {
      background: rgba(77, 161, 255, 0.1);
    }
    
    .benefit-icon {
      font-size: 30px;
      margin-bottom: 15px;
    }
    
    .benefit-item h4 {
      color: #ffffff;
      margin-bottom: 10px;
    }
    
    .benefit-item p {
      font-size: 14px;
      line-height: 1.5;
    }
    
    .info-card {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .info-card h3 {
      color: #ffffff;
      font-size: 20px;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }
    
    .faq-list {
      margin-top: 15px;
    }
    
    .faq-item {
      margin-bottom: 20px;
    }
    
    .faq-item h4 {
      color: #4da1ff;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 600;
    }
    
    .faq-item p {
      font-size: 14px;
      line-height: 1.6;
    }
    
    .info-card p {
      margin-bottom: 20px;
    }
    
    .primary-btn {
      display: block;
      text-align: center;
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .primary-btn:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
    }
    
    @media (max-width: 992px) {
      .service-content {
        flex-direction: column;
      }
      
      .plan-card.recommended {
        transform: scale(1);
      }
      
      .plan-card.recommended:hover {
        transform: translateY(-5px);
      }
    }
    
    @media (max-width: 768px) {
      .insurance-plans {
        grid-template-columns: 1fr;
      }
      
      .benefits-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation]
})
export class InsuranceComponent {}