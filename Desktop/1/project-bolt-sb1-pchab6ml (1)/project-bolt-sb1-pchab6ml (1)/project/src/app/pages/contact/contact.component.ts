import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceBannerComponent } from '../../shared/service-banner/service-banner.component';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { fadeInUpAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ServiceBannerComponent, ContactFormComponent],
  template: `
    <div class="contact-page">
      <app-service-banner 
        title="Contactez-nous" 
        subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions">
      </app-service-banner>
      
      <div class="container">
        <div class="contact-container">
          <div class="contact-info" @fadeInUp>
            <h2>Nos informations de contact</h2>
            <div class="info-item">
              <div class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="details">
                <h3>Adresse</h3>
                <p>Rue du Lac Malaren, Les Berges du Lac, Tunis</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="details">
                <h3>Téléphone</h3>
                <p>+216 71 123 456</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="details">
                <h3>Email</h3>
                <p>info&#64;fcrservices.tn</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="details">
                <h3>Heures d'ouverture</h3>
                <p>Lundi - Vendredi: 9h00 - 18h00<br>Samedi: 9h00 - 13h00</p>
              </div>
            </div>
          </div>
          
          <app-contact-form></app-contact-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      color: #e0e0e0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .contact-container {
      display: flex;
      justify-content: space-between;
      gap: 50px;
      margin: 60px 0;
      flex-wrap: wrap;
    }
    
    .contact-info {
      flex: 1;
      min-width: 300px;
    }
    
    .contact-info h2 {
      font-size: 28px;
      color: #ffffff;
      margin-bottom: 30px;
      position: relative;
    }
    
    .contact-info h2:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, #3d84ff, #4da1ff);
    }
    
    .info-item {
      display: flex;
      margin-bottom: 25px;
    }
    
    .icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    .icon i {
      color: white;
      font-size: 20px;
    }
    
    .details h3 {
      color: #ffffff;
      margin-bottom: 5px;
      font-size: 18px;
    }
    
    .details p {
      color: #e0e0e0;
      line-height: 1.6;
    }
    
    @media (max-width: 992px) {
      .contact-container {
        flex-direction: column;
      }
    }
  `],
  animations: [fadeInUpAnimation]
})
export class ContactComponent {}