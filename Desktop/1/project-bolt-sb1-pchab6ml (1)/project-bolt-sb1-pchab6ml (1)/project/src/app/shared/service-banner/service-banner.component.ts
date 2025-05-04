import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUpAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-service-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-banner" @fadeInUp>
      <div class="overlay"></div>
      <div class="banner-content">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  `,
  styles: [`
    .service-banner {
      position: relative;
      height: 300px;
      width: 100%;
      background-image: url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      border-radius: 0 0 12px 12px;
      margin-bottom: 40px;
      margin-top: -20px;
      overflow: hidden;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, rgba(26, 43, 71, 0.9), rgba(26, 43, 71, 0.7));
    }
    
    .banner-content {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      text-align: center;
      padding: 0 20px;
      z-index: 1;
    }
    
    h1 {
      font-size: 42px;
      color: #ffffff;
      margin-bottom: 15px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      font-weight: 700;
    }
    
    p {
      font-size: 18px;
      color: #e0e0e0;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    @media (max-width: 768px) {
      .service-banner {
        height: 250px;
      }
      
      h1 {
        font-size: 32px;
      }
      
      p {
        font-size: 16px;
      }
    }
  `],
  animations: [fadeInUpAnimation]
})
export class ServiceBannerComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}