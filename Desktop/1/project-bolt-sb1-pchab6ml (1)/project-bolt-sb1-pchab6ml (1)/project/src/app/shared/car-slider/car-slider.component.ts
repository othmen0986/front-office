import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fadeInUpAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-car-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="car-slider-container" @fadeInUp>
      <div class="overlay"></div>
      <div class="slider-content">
        <h2>Découvrez notre sélection de véhicules</h2>
        <p>Importés sans frais de douane grâce au privilège FCR</p>
      </div>
      <div class="slider-wrapper">
        <div class="slider-track">
          <div class="slide" *ngFor="let car of cars">
            <div class="car-image" [style.background-image]="'url(' + car.image + ')'">
              <div class="car-info">
                <h3>{{ car.model }}</h3>
                <p>{{ car.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .car-slider-container {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
      border-radius: 12px;
      margin: 40px 0;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, rgba(26, 43, 71, 0.9), rgba(26, 43, 71, 0.4));
      z-index: 1;
    }
    
    .slider-content {
      position: absolute;
      top: 50%;
      left: 50px;
      transform: translateY(-50%);
      color: white;
      z-index: 2;
      max-width: 500px;
    }
    
    .slider-content h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 15px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .slider-content p {
      font-size: 18px;
      line-height: 1.5;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    .slider-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .slider-track {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: transform 0.5s ease;
    }
    
    .slide {
      min-width: 100%;
      height: 100%;
    }
    
    .car-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: flex-end;
      padding: 30px;
    }
    
    .car-info {
      background: rgba(25, 25, 25, 0.7);
      backdrop-filter: blur(5px);
      padding: 15px 20px;
      border-radius: 8px;
      width: 300px;
      transform: translateX(70%);
    }
    
    .car-info h3 {
      color: white;
      font-size: 22px;
      margin-bottom: 5px;
    }
    
    .car-info p {
      color: #4da1ff;
      font-size: 18px;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .slider-content {
        left: 20px;
        max-width: 80%;
      }
      
      .slider-content h2 {
        font-size: 28px;
      }
      
      .slider-content p {
        font-size: 16px;
      }
      
      .car-info {
        transform: translateX(0);
        width: 100%;
      }
    }
  `],
  animations: [fadeInUpAnimation]
})
export class CarSliderComponent implements OnInit, AfterViewInit {
  cars = [
    {
      model: 'Lamberguini Urus',
      price: 'à partir de 80.000 DT',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      model: 'mercedes G63 AMG',
      price: 'à partir de 75.000 DT',
      image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    /*{
      model: 'Mercedes EQS',
      price: 'à partir de 90.000 DT',
      image: 'https://images.pexels.com/photos/14751300/pexels-photo-14751300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }*/
  ];

  sliderTrack: HTMLElement | null = null;
  currentSlide = 0;
  slideInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sliderTrack = document.querySelector('.slider-track');
      this.startSlider();
    }
  }

  startSlider() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    if (!this.sliderTrack) return;
    
    this.currentSlide = (this.currentSlide + 1) % this.cars.length;
    this.sliderTrack.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}