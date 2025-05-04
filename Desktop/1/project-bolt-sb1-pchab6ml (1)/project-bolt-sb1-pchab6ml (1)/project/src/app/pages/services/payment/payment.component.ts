import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceBannerComponent } from '../../../shared/service-banner/service-banner.component';
import { RelatedServicesComponent } from '../../../shared/related-services/related-services.component';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../../core/animations/fade.animation';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ServiceBannerComponent, RelatedServicesComponent],
  template: `
    <div class="service-page">
      <app-service-banner 
        title="Solutions de Paiement" 
        subtitle="Des options de paiement sécurisées et flexibles pour l'achat de votre véhicule">
      </app-service-banner>
      
      <div class="container">
        <div class="service-content">
          <div class="main-content" @fadeInLeft>
            <h2>Simplifiez vos transactions avec nos solutions de paiement</h2>
            
            <div class="payment-options">
              <div class="payment-option">
                <div class="option-icon">
                  <img src="https://img.icons8.com/fluency-systems-regular/96/ffffff/bank-card-front-side.png" alt="Carte bancaire">
                </div>
                <h3>Paiement par carte</h3>
                <p>Réglez vos acomptes ou mensualités directement par carte bancaire sur notre plateforme sécurisée.</p>
              </div>
              
              <div class="payment-option">
                <div class="option-icon">
                  <img src="https://img.icons8.com/fluency-systems-regular/96/ffffff/bank-building.png" alt="Virement bancaire">
                </div>
                <h3>Virement bancaire</h3>
                <p>Effectuez des virements bancaires pour des transactions de montants importants en toute sécurité.</p>
              </div>
              
              <div class="payment-option">
                <div class="option-icon">
                  <img src="https://img.icons8.com/fluency-systems-regular/96/ffffff/mobile-payment.png" alt="Paiement mobile">
                </div>
                <h3>Paiement mobile</h3>
                <p>Utilisez les solutions de paiement mobile pour des transactions rapides et sécurisées depuis votre smartphone.</p>
              </div>
              
              <div class="payment-option">
                <div class="option-icon">
                  <img src="https://img.icons8.com/fluency-systems-regular/96/ffffff/check.png" alt="Paiement échelonné">
                </div>
                <h3>Paiement échelonné</h3>
                <p>Divisez le coût de votre achat en plusieurs paiements pour plus de flexibilité financière.</p>
              </div>
            </div>
            
            <div class="service-description">
              <p>Notre plateforme offre des solutions de paiement variées pour répondre à tous les besoins. Nous garantissons la sécurité de vos transactions et assurons un suivi transparent de tous vos paiements.</p>
              
              <p>Que vous soyez détenteur du privilège FCR ou acheteur, nos options de paiement sont conçues pour faciliter les transactions entre les deux parties et assurer une expérience fluide et sécurisée.</p>
            </div>
            
            <div class="security-features">
              <h3>Sécurité garantie</h3>
              <div class="security-features-grid">
                <div class="security-feature">
                  <span class="security-icon">🔒</span>
                  <span class="security-text">Transactions cryptées</span>
                </div>
                <div class="security-feature">
                  <span class="security-icon">🔐</span>
                  <span class="security-text">Authentification à deux facteurs</span>
                </div>
                <div class="security-feature">
                  <span class="security-icon">📊</span>
                  <span class="security-text">Suivi des transactions en temps réel</span>
                </div>
                <div class="security-feature">
                  <span class="security-icon">🛡️</span>
                  <span class="security-text">Protection contre la fraude</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sidebar" @fadeInRight>
            <div class="info-card">
              <h3>Avantages</h3>
              <ul class="benefits-list">
                <li>
                  <strong>Sécurité maximale</strong>
                  <p>Toutes les transactions sont sécurisées et conformes aux normes bancaires</p>
                </li>
                <li>
                  <strong>Flexibilité</strong>
                  <p>Choisissez le mode de paiement qui vous convient le mieux</p>
                </li>
                <li>
                  <strong>Transparence</strong>
                  <p>Suivez en temps réel l'état de vos paiements et transactions</p>
                </li>
                <li>
                  <strong>Rapidité</strong>
                  <p>Traitements rapides pour accélérer l'acquisition de votre véhicule</p>
                </li>
              </ul>
            </div>
            
            <div class="info-card cta-card">
              <h3>Besoin d'assistance?</h3>
              <p>Notre équipe de conseillers financiers est disponible pour vous aider à choisir la meilleure option de paiement pour votre situation.</p>
              <a href="#" class="primary-btn">Contacter un conseiller</a>
            </div>
            
            <app-related-services serviceId="payment"></app-related-services>
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
    
    .payment-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }
    
    .payment-option {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .payment-option:hover {
      background: linear-gradient(145deg, rgba(26, 43, 71, 0.7), rgba(25, 25, 25, 0.7));
      border-color: rgba(77, 161, 255, 0.3);
      transform: translateY(-5px);
    }
    
    .option-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    
    .option-icon img {
      width: 35px;
      height: 35px;
      filter: brightness(0) invert(1);
    }
    
    .payment-option h3 {
      color: #ffffff;
      margin-bottom: 10px;
      font-size: 18px;
    }
    
    .payment-option p {
      color: #e0e0e0;
      line-height: 1.6;
      font-size: 14px;
    }
    
    .service-description {
      margin: 40px 0;
    }
    
    .service-description p {
      margin-bottom: 20px;
      line-height: 1.7;
    }
    
    .security-features {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 25px;
      margin-top: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .security-features h3 {
      color: #ffffff;
      margin-bottom: 20px;
      font-size: 20px;
      text-align: center;
    }
    
    .security-features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .security-feature {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 10px 15px;
      border-radius: 8px;
    }
    
    .security-icon {
      font-size: 20px;
      margin-right: 10px;
    }
    
    .security-text {
      font-size: 14px;
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
    
    .benefits-list {
      list-style: none;
      padding: 0;
    }
    
    .benefits-list li {
      margin-bottom: 15px;
    }
    
    .benefits-list li strong {
      display: block;
      color: #4da1ff;
      margin-bottom: 5px;
    }
    
    .benefits-list li p {
      font-size: 14px;
      line-height: 1.5;
    }
    
    .cta-card {
      text-align: center;
    }
    
    .cta-card p {
      margin-bottom: 20px;
    }
    
    .primary-btn {
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      padding: 12px 25px;
      border-radius: 30px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(77, 161, 255, 0.2);
      display: inline-block;
    }
    
    .primary-btn:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
      box-shadow: 0 7px 20px rgba(77, 161, 255, 0.3);
    }
    
    @media (max-width: 992px) {
      .service-content {
        flex-direction: column;
      }
      
      .payment-options {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
    
    @media (max-width: 576px) {
      .payment-options {
        grid-template-columns: 1fr;
      }
      
      .security-features-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation]
})
export class PaymentComponent {}