import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/models/service.model';
import { ServiceService } from '../../core/services/service.service';
import { fadeInLeftAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-related-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="related-services" *ngIf="relatedServices.length > 0" @fadeInLeft>
      <h3>Services associés</h3>
      <div class="related-list">
        <a *ngFor="let service of relatedServices" [routerLink]="service.route" class="related-item">
          <div class="related-icon">
            <img [src]="getIcon(service.id)" alt="{{ service.title }} icon" />
          </div>
          <span>{{ service.title }}</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .related-services {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 20px;
      margin-top: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    h3 {
      color: #ffffff;
      font-size: 18px;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }
    
    .related-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .related-item {
      display: flex;
      align-items: center;
      padding: 8px 15px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 30px;
      color: #e0e0e0;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .related-item:hover {
      background: rgba(77, 161, 255, 0.1);
      color: #4da1ff;
      transform: translateY(-2px);
    }
    
    .related-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    
    .related-icon img {
      width: 100%;
      height: 100%;
      filter: brightness(0) invert(1);
      opacity: 0.8;
    }
    
    .related-item:hover .related-icon img {
      opacity: 1;
    }
  `],
  animations: [fadeInLeftAnimation]
})
export class RelatedServicesComponent {
  @Input() serviceId!: string;
  relatedServices: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.relatedServices = this.serviceService.getRelatedServices(this.serviceId);
  }

  getIcon(id: string): string {
    const icons: Record<string, string> = {
      credit: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/money.png',
      payment: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/bank-card.png',
      insurance: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/shield.png',
      parts: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/gear.png',
      expertise: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/microscope.png',
      vehicles: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/car.png'
    };
    
    return icons[id] || 'https://img.icons8.com/fluency-systems-regular/96/ffffff/services.png';
  }
}