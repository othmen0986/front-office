import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3> CarHabty</h3>
            <p>Facilitant la connexion entre détenteurs de privilège FCR et acheteurs tunisiens pour des véhicules à prix réduits.</p>
          </div>
          
          <div class="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a routerLink="/services/credit">Crédit</a></li>
              <li><a routerLink="/services/credit-payment">Paiements Crédit</a></li>
              <li><a routerLink="/services/payment">Paiement</a></li>
              <li><a routerLink="/services/insurance">Microassurance</a></li>
              <li><a routerLink="/services/parts">Pièces Détachées</a></li>
              <li><a routerLink="/services/expertise">Expertise</a></li>
              <li><a routerLink="/services/vehicles">Véhicules</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contact</h4>
            <ul class="contact-info">
            <li><span>Email:</span> info&#64;CarHabty.tn</li>
            <li><span>Téléphone:</span> +216 71 123 456</li>
              <li><span>Adresse:</span> Rue du Lac Malaren, Les Berges du Lac, Tunis</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 CarHabty. Tous droits réservés.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #1a2b47;
      color: #e0e0e0;
      padding: 60px 0 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    
    .footer-section h3 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 20px;
      position: relative;
    }
    
    .footer-section h3:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 40px;
      height: 2px;
      background: #4da1ff;
    }
    
    .footer-section h4 {
      color: #ffffff;
      font-size: 18px;
      margin-bottom: 20px;
      position: relative;
    }
    
    .footer-section h4:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 30px;
      height: 2px;
      background: #4da1ff;
    }
    
    .footer-section p {
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 10px;
    }
    
    .footer-section ul li a {
      color: #e0e0e0;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-section ul li a:hover {
      color: #4da1ff;
    }
    
    .contact-info li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    
    .contact-info li span {
      font-weight: 600;
      color: #4da1ff;
      margin-right: 8px;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .social-links {
      display: flex;
      gap: 15px;
    }
    
    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      transition: all 0.3s ease;
    }
    
    .social-links a:hover {
      background: #4da1ff;
      transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
      .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}