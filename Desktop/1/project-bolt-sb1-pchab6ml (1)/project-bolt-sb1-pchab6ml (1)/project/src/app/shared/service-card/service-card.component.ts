import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/models/service.model';
import { fadeInUpAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="service-card" @fadeInUp>
      <div class="service-icon">
        <img [src]="defaultIcon" alt="{{ service.title }} icon" />
      </div>
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <a [routerLink]="service.route" class="service-btn">En savoir plus</a>
    </div>
  `,
  styles: [`
    .service-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      border-color: rgba(77, 161, 255, 0.3);
      background: linear-gradient(145deg, rgba(26, 43, 71, 0.7), rgba(25, 25, 25, 0.7));
    }
    
    .service-icon {
      margin-bottom: 20px;
      width: 70px;
      height: 70px;
      background: linear-gradient(45deg, #1a2b47, #3d84ff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      box-shadow: 0 10px 20px rgba(61, 132, 255, 0.15);
    }
    
    .service-icon img {
      width: 35px;
      height: 35px;
      filter: brightness(0) invert(1);
    }
    
    h3 {
      color: #ffffff;
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    p {
      color: #e0e0e0;
      margin-bottom: 25px;
      line-height: 1.6;
      flex-grow: 1;
    }
    
    .service-btn {
      display: inline-block;
      padding: 10px 20px;
      background: transparent;
      border: 2px solid #4da1ff;
      color: #4da1ff;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 14px;
    }
    
    .service-btn:hover {
      background: #4da1ff;
      color: #ffffff;
      box-shadow: 0 5px 15px rgba(77, 161, 255, 0.3);
    }
  `],
  animations: [fadeInUpAnimation]
})
export class ServiceCardComponent {
  @Input() service!: Service;

  get defaultIcon(): string {
    // Fallback icons if SVG files are not available
    const icons: Record<string, string> = {
      credit: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/money.png',
      payment: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/bank-card.png',
      insurance: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/shield.png',
      parts: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/gear.png',
      expertise: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/microscope.png',
      vehicles: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/car.png'
    };
    
    return icons[this.service.id] || 'https://img.icons8.com/fluency-systems-regular/96/ffffff/services.png';
  }
}