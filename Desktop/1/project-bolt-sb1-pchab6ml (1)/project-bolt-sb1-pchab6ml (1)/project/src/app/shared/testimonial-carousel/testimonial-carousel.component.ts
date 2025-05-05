import { Component, PLATFORM_ID, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TestimonialService } from '../../core/services/testimonial.service';
import { Testimonial } from '../../core/models/testimonial.model';
import { fadeAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonial-section">
      <h2>Ce que disent nos clients</h2>
      <div class="testimonial-carousel" #carousel>
        <div class="testimonial-track" #track>
          <div class="testimonial-card" *ngFor="let testimonial of testimonials" @fadeAnimation>
            <div class="testimonial-image">
              <img [src]="testimonial.image" alt="{{ testimonial.name }}">
            </div>
            <div class="testimonial-content">
              <div class="rating">
                <span *ngFor="let star of [1, 2, 3, 4, 5]" class="star" [class.filled]="star <= testimonial.rating">★</span>
              </div>
              <p class="quote">"{{ testimonial.content }}"</p>
              <div class="client">
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button class="prev-btn" (click)="prevSlide()">&#10094;</button>
        <div class="pagination">
          <span 
            *ngFor="let testimonial of testimonials; let i = index" 
            class="dot" 
            [class.active]="currentSlide === i"
            (click)="goToSlide(i)">
          </span>
        </div>
        <button class="next-btn" (click)="nextSlide()">&#10095;</button>
      </div>
    </div>
  `,
  styles: [`
    .testimonial-section {
      padding: 60px 0;
      text-align: center;
    }
    
    h2 {
      font-size: 36px;
      color: #ffffff;
      margin-bottom: 40px;
      font-weight: 700;
      position: relative;
      display: inline-block;
    }
    
    h2:after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(to right, #3d84ff, #4da1ff);
    }
    
    .testimonial-carousel {
      max-width: 1000px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
    }
    
    .testimonial-track {
      display: flex;
      transition: transform 0.5s ease;
    }
    
    .testimonial-card {
      min-width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
    
    .testimonial-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 20px;
      border: 5px solid rgba(77, 161, 255, 0.3);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .testimonial-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .testimonial-content {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 30px;
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .testimonial-content:hover {
      background: linear-gradient(145deg, rgba(26, 43, 71, 0.7), rgba(25, 25, 25, 0.7));
      border-color: rgba(77, 161, 255, 0.3);
    }
    
    .rating {
      margin-bottom: 20px;
    }
    
    .star {
      color: #aaa;
      font-size: 24px;
      margin: 0 2px;
    }
    
    .star.filled {
      color: #FFD700;
    }
    
    .quote {
      font-size: 18px;
      line-height: 1.6;
      color: #e0e0e0;
      margin-bottom: 25px;
      font-style: italic;
    }
    
    .client h4 {
      color: #ffffff;
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    
    .client span {
      color: #4da1ff;
      font-size: 14px;
    }
    
    .carousel-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
    
    .prev-btn, .next-btn {
      background: transparent;
      border: 2px solid #4da1ff;
      color: #4da1ff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .prev-btn:hover, .next-btn:hover {
      background: #4da1ff;
      color: #ffffff;
    }
    
    .pagination {
      display: flex;
      margin: 0 20px;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .dot.active {
      background: #4da1ff;
      transform: scale(1.3);
    }
    
    @media (max-width: 768px) {
      .quote {
        font-size: 16px;
      }
      
      .testimonial-content {
        padding: 20px;
      }
    }
  `],
  animations: [fadeAnimation]
})
export class TestimonialCarouselComponent implements AfterViewInit {
  @ViewChild('track') track!: ElementRef;
  
  testimonials: Testimonial[] = [];
  currentSlide = 0;
  
  constructor(
    private testimonialService: TestimonialService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.testimonials = this.testimonialService.getTestimonials();
  }
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTrackPosition();
    }
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    this.updateTrackPosition();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    this.updateTrackPosition();
  }
  
  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateTrackPosition();
  }
  
  updateTrackPosition() {
    if (this.track && isPlatformBrowser(this.platformId)) {
      this.track.nativeElement.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }
}