import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fadeInRightAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-form-container" @fadeInRight>
      <h2>Contactez-nous</h2>
      <p class="form-subtitle">Des questions ou besoin d'informations supplémentaires? N'hésitez pas à nous contacter.</p>
      
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Nom complet</label>
          <input type="text" id="name" formControlName="name" placeholder="Votre nom complet">
          <div class="error-message" *ngIf="submitted && contactForm.get('name')?.errors?.['required']">
            Le nom est requis
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" placeholder="Votre adresse email">
          <div class="error-message" *ngIf="submitted && contactForm.get('email')?.errors?.['required']">
            L'email est requis
          </div>
          <div class="error-message" *ngIf="submitted && contactForm.get('email')?.errors?.['email']">
            Veuillez entrer une adresse email valide
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input type="tel" id="phone" formControlName="phone" placeholder="Votre numéro de téléphone">
        </div>
        
        <div class="form-group">
          <label for="service">Service</label>
          <select id="service" formControlName="service">
            <option value="">Sélectionnez un service</option>
            <option value="credit">Crédit</option>
            <option value="payment">Paiement</option>
            <option value="insurance">Microassurance</option>
            <option value="parts">Pièces Détachées</option>
            <option value="expertise">Expertise</option>
            <option value="vehicles">Véhicules</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" formControlName="message" rows="5" placeholder="Votre message"></textarea>
          <div class="error-message" *ngIf="submitted && contactForm.get('message')?.errors?.['required']">
            Le message est requis
          </div>
        </div>
        
        <button type="submit" class="submit-btn">Envoyer</button>
        
        <div class="success-message" *ngIf="submitSuccess">
          Merci! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.
        </div>
      </form>
    </div>
  `,
  styles: [`
    .contact-form-container {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 40px;
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      font-size: 28px;
      color: #ffffff;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .form-subtitle {
      text-align: center;
      color: #e0e0e0;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #ffffff;
      font-weight: 500;
    }
    
    input, textarea, select {
      width: 100%;
      padding: 12px 15px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #4da1ff;
      box-shadow: 0 0 0 2px rgba(77, 161, 255, 0.2);
    }
    
    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 15px center;
      background-size: 15px;
    }
    
    .submit-btn {
      display: block;
      width: 100%;
      padding: 14px;
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }
    
    .submit-btn:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
      box-shadow: 0 7px 20px rgba(77, 161, 255, 0.3);
    }
    
    .error-message {
      color: #ff4d4d;
      font-size: 14px;
      margin-top: 5px;
    }
    
    .success-message {
      color: #4caf50;
      text-align: center;
      background: rgba(76, 175, 80, 0.1);
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }
    
    @media (max-width: 768px) {
      .contact-form-container {
        padding: 30px 20px;
      }
    }
  `],
  animations: [fadeInRightAnimation]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted = false;
  submitSuccess = false;
  
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      service: [''],
      message: ['', Validators.required]
    });
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // This would normally send data to a server
      // For demo purposes, just simulate a successful submission
      setTimeout(() => {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitted = false;
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 1000);
    }
  }
}