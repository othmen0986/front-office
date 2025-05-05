import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { ServiceService } from '../../core/services/service.service';
import { CarSliderComponent } from '../../shared/car-slider/car-slider.component';
import { TestimonialCarouselComponent } from '../../shared/testimonial-carousel/testimonial-carousel.component';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { Service } from '../../core/models/service.model';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ServiceCardComponent, 
    CarSliderComponent, 
    TestimonialCarouselComponent,
    ContactFormComponent
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 @fadeInUp>Privilège CarHabty</h1>
          <p @fadeInUp>
            Nous connectons les détenteurs du privilège FCR avec les citoyens tunisiens pour l'achat de véhicules à prix réduits.
          </p>
          <div class="cta-buttons" @fadeInUp>
            <a routerLink="/services/vehicles" class="primary-btn">Découvrir les véhicules</a>
            <a routerLink="/contact" class="secondary-btn">Nous contacter</a>
          </div>
        </div>
        <div class="hero-image" @fadeInRight>
          <img src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Luxury car">
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section" id="about">
        <div class="container">
          <div class="section-header" @fadeInUp>
            <h2>Comment ça fonctionne</h2>
            <p>Notre plateforme simplifie les démarches pour bénéficier du privilège FCR</p>
          </div>
          
          <div class="steps-container">
            <div class="step" @fadeInLeft>
              <div class="step-number">1</div>
              <h3>Connexion</h3>
              <p>Nous connectons les détenteurs de FCR avec des acheteurs tunisiens intéressés</p>
            </div>
            
            <div class="step" @fadeInUp>
              <div class="step-number">2</div>
              <h3>Services Complets</h3>
              <p>Nous fournissons tous les services nécessaires: crédit, paiement, assurance, et plus</p>
            </div>
            
            <div class="step" @fadeInRight>
              <div class="step-number">3</div>
              <h3>Économies</h3>
              <p>Les acheteurs économisent sur les frais de douane, les détenteurs FCR bénéficient d'avantages</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services-section" id="services">
        <div class="container">
          <div class="section-header" @fadeInUp>
            <h2>Nos Services</h2>
            <p>Une gamme complète de services pour faciliter votre expérience automobile</p>
          </div>
          
          <div class="services-grid">
            <app-service-card *ngFor="let service of services" [service]="service"></app-service-card>
          </div>
        </div>
      </section>

      <!-- Car Slider Section -->
      <section class="slider-section">
        <div class="container">
          <app-car-slider></app-car-slider>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <app-testimonial-carousel></app-testimonial-carousel>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section" id="contact">
        <div class="container">
          <div class="contact-wrapper">
            <div class="contact-info" @fadeInLeft>
              <h2>Prêt à commencer?</h2>
              <p>Découvrez comment nous pouvons vous aider à bénéficier du privilège FCR ou à trouver le véhicule de vos rêves à un prix réduit.</p>
              <div class="contact-cta">
                <a href="#" class="primary-btn">Bénéficiez du FCR aujourd'hui</a>
              </div>
            </div>
            
            <app-contact-form></app-contact-form>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      color: #e0e0e0;
    }
    
    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      padding: 80px 0;
      background: linear-gradient(135deg, #1a2b47 0%, #191919 100%);
      overflow: hidden;
    }
    
    .hero-content {
      width: 50%;
      padding: 0 50px;
      z-index: 1;
    }
    
    .hero-image {
      width: 50%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
    }
    
    .hero-image:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #1a2b47 0%, rgba(26, 43, 71, 0) 100%);
      z-index: 1;
    }
    
    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    .hero-content h1 {
      font-size: 52px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    
    .hero-content p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 40px;
      max-width: 600px;
    }
    
    .cta-buttons {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .primary-btn {
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      padding: 14px 30px;
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
    
    .secondary-btn {
      background: transparent;
      color: #ffffff;
      padding: 12px 28px;
      border-radius: 30px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
      border: 2px solid #4da1ff;
    }
    
    .secondary-btn:hover {
      background: rgba(77, 161, 255, 0.1);
      transform: translateY(-2px);
    }
    
    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* Section Header */
    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }
    
    .section-header h2 {
      font-size: 36px;
      color: #ffffff;
      margin-bottom: 15px;
      font-weight: 700;
      position: relative;
    }
    
    .section-header h2:after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #3d84ff, #4da1ff);
    }
    
    .section-header p {
      font-size: 18px;
      color: #e0e0e0;
      max-width: 700px;
      margin: 0 auto;
    }
    
    /* About Section */
    .about-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #191919 0%, #1a2b47 100%);
    }
    
    .steps-container {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
    }
    
    .step {
      flex: 1;
      min-width: 250px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
    }
    
    .step:hover {
      transform: translateY(-10px);
      background: linear-gradient(145deg, rgba(26, 43, 71, 0.7), rgba(25, 25, 25, 0.7));
      border-color: rgba(77, 161, 255, 0.3);
    }
    
    .step-number {
      width: 50px;
      height: 50px;
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      margin: 0 auto 20px;
      box-shadow: 0 5px 15px rgba(77, 161, 255, 0.2);
    }
    
    .step h3 {
      color: #ffffff;
      font-size: 22px;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    .step p {
      color: #e0e0e0;
      line-height: 1.6;
    }
    
    /* Services Section */
    .services-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #1a2b47 0%, #191919 100%);
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
    }
    
    /* Slider Section */
    .slider-section {
      padding: 50px 0;
      background: linear-gradient(135deg, #191919 0%, #1a2b47 100%);
    }
    
    /* Testimonials Section */
    .testimonials-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #1a2b47 0%, #191919 100%);
    }
    
    /* Contact Section */
    .contact-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #191919 0%, #1a2b47 100%);
    }
    
    .contact-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 50px;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .contact-info {
      flex: 1;
      min-width: 300px;
    }
    
    .contact-info h2 {
      font-size: 36px;
      color: #ffffff;
      margin-bottom: 20px;
      font-weight: 700;
    }
    
    .contact-info p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .contact-cta {
      margin-top: 30px;
    }
    
    @media (max-width: 992px) {
      .hero-content {
        width: 100%;
        text-align: center;
        padding: 0 20px;
      }
      
      .hero-content p {
        margin: 0 auto 40px;
      }
      
      .hero-image {
        display: none;
      }
      
      .contact-wrapper {
        flex-direction: column;
      }
      
      .contact-info {
        text-align: center;
        margin-bottom: 30px;
      }
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 36px;
      }
      
      .hero-content p {
        font-size: 16px;
      }
      
      .section-header h2 {
        font-size: 28px;
      }
      
      .section-header p {
        font-size: 16px;
      }
      
      .steps-container {
        flex-direction: column;
      }
    }
  `],
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation]
})
export class HomeComponent implements OnInit {
  services: Service[] = [];
  
  constructor(
    private serviceService: ServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit() {
    this.services = this.serviceService.getServices();
    
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimation();
    }
  }
  
  setupScrollAnimation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId!);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}