import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { Vehicle } from '../../../../core/models/vehicle.model';
import { VehiculeService } from '../vehicule.service'; // Updated import path
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../../../core/animations/fade.animation';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="vehicle-details-page" *ngIf="vehicle">
      <div class="vehicle-hero">
        <div class="container">
          <a routerLink="/services/vehicles" class="back-button">
            <i class="fas fa-arrow-left"></i> Retour aux véhicules
          </a>
          <div class="hero-content">
            <h1>{{ vehicle.brand }} {{ vehicle.model }}</h1>
            <p class="vehicle-price">{{ vehicle.price | currency:'TND':'symbol':'1.0-0' }}</p>
            <span class="fcr-badge" *ngIf="vehicle.fcrEligible">Éligible FCR</span>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="details-content">
          <div class="main-content" @fadeInLeft>
            <div class="image-gallery">
              <div class="main-image">
                <img [src]="vehicle.image" [alt]="vehicle.brand + ' ' + vehicle.model">
              </div>
              
            </div>

            <div class="vehicle-description">
              <h2>Description</h2>
              <p>{{ vehicle.description }}</p>
            </div>

            <!-- Separate map section -->
            <div class="map-container">
              <h2>Localisation</h2>
              <div id="map" style="height: 500px; width: 100%;"></div>
            </div>

            <div class="vehicle-features">
              <h2>Caractéristiques</h2>
              <ul>
                <li *ngFor="let feature of vehicle.features">{{ feature }}</li>
              </ul>
            </div>
          </div>

          <aside class="sidebar" @fadeInRight>
            <div class="specifications-card">
              <h3>Spécifications</h3>
              <div class="spec-list">
                <div class="spec-item">
                  <span class="spec-label">Année</span>
                  <span class="spec-value">{{ vehicle.year }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Carburant</span>
                  <span class="spec-value">{{ vehicle.specifications.fuelType }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Transmission</span>
                  <span class="spec-value">{{ vehicle.specifications.transmission }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Kilométrage</span>
                  <span class="spec-value">{{ vehicle.specifications.mileage }} km</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Color</span>
                  <span class="spec-value">{{ vehicle.color }}</span>
                </div>
                 <div class="spec-item">
                  <span class="spec-label">Serie</span>
                  <span class="spec-value">{{ vehicle.numeroSerie }}</span>
                </div>
              </div>
            </div>

            <div class="action-card">
              <div class="price-info">
                <span class="label">Prix</span>
                <span class="price">{{ vehicle.price | currency:'TND':'symbol':'1.0-0' }}</span>
                <span class="fcr-note" *ngIf="vehicle.fcrEligible">
                  Économisez jusqu'à 30% avec le privilège FCR
                </span>
              </div>
              <div class="action-buttons">
                <button class="primary-btn">Demander un devis</button>
                <button class="secondary-btn" *ngIf="vehicle.fcrEligible">
                  Appliquer pour FCR
                </button>
              </div>
            </div>

            <div class="contact-card">
              <h3>Besoin d'informations?</h3>
              <p>Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
              <button class="outline-btn">
                <i class="fas fa-phone"></i> Nous contacter
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vehicle-details-page {
      color: #e0e0e0;
      padding-bottom: 60px;
    }

    .vehicle-hero {
      background: linear-gradient(to right, rgba(26, 43, 71, 0.95), rgba(26, 43, 71, 0.8));
      padding: 60px 0 40px;
      margin-bottom: 40px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      color: #e0e0e0;
      text-decoration: none;
      margin-bottom: 20px;
      transition: color 0.3s ease;
    }

    .back-button:hover {
      color: #4da1ff;
    }

    .back-button i {
      margin-right: 8px;
    }

    .hero-content {
      position: relative;
    }

    .hero-content h1 {
      font-size: 36px;
      color: #ffffff;
      margin-bottom: 10px;
    }

    .vehicle-price {
      font-size: 24px;
      color: #4da1ff;
      font-weight: 600;
    }

    .fcr-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #4da1ff;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }

    .details-content {
      display: flex;
      gap: 40px;
    }

    .main-content {
      flex: 2;
      min-width: 0;
    }

    .image-gallery {
      margin-bottom: 40px;
    }

    .main-image {
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .main-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .thumbnail-list {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 10px;
    }

    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid transparent;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      background: none;
    }

    .thumbnail.active {
      border-color: #4da1ff;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vehicle-description, .vehicle-features {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .map-container {
      margin-top: 20px;
      border-radius: 12px;
      overflow: hidden;
    }

    #map {
      height: 500px;
      width: 100%;
    }

    h2 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 20px;
      position: relative;
    }

    h2:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #4da1ff;
    }

    .vehicle-features ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }

    .vehicle-features li {
      padding-left: 25px;
      position: relative;
    }

    .vehicle-features li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #4da1ff;
    }

    .sidebar {
      flex: 1;
      min-width: 300px;
    }

    .specifications-card, .action-card, .contact-card {
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .specifications-card h3, .contact-card h3 {
      color: #ffffff;
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .spec-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .spec-label {
      color: #e0e0e0;
    }

    .spec-value {
      color: #ffffff;
      font-weight: 500;
    }

    .price-info {
      text-align: center;
      margin-bottom: 20px;
    }

    .price-info .label {
      display: block;
      color: #e0e0e0;
      margin-bottom: 5px;
    }

    .price-info .price {
      display: block;
      font-size: 32px;
      color: #4da1ff;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .fcr-note {
      display: block;
      color: #4da1ff;
      font-size: 14px;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .primary-btn, .secondary-btn, .outline-btn {
      width: 100%;
      padding: 12px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .primary-btn {
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      border: none;
    }

    .primary-btn:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
    }

    .secondary-btn {
      background: transparent;
      color: #4da1ff;
      border: 1px solid #4da1ff;
    }

    .secondary-btn:hover {
      background: rgba(77, 161, 255, 0.1);
      transform: translateY(-2px);
    }

    .outline-btn {
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .outline-btn:hover {
      border-color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .contact-card p {
      margin-bottom: 20px;
      line-height: 1.6;
    }

    @media (max-width: 992px) {
      .details-content {
        flex-direction: column;
      }

      .sidebar {
        min-width: 100%;
      }

      .main-image img {
        height: 300px;
      }
    }

    @media (max-width: 768px) {
      .vehicle-hero {
        padding: 40px 0 30px;
      }

      .hero-content h1 {
        font-size: 28px;
        padding-right: 100px;
      }

      .fcr-badge {
        font-size: 12px;
        padding: 6px 12px;
      }

      .vehicle-features ul {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation]
})
export class VehicleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: any;
  private marker!: any;

  vehicle: Vehicle | undefined;
  currentImageIndex = 0;
  DEFAULT_IMAGE = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg';
  //private map!: L.Map;
  //private marker!: L.Marker;

  constructor(
    private route: ActivatedRoute,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit() {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehiculeService.getVehicleById(vehicleId).subscribe({
        next: (vehicule) => {
          this.vehicle = {
            id: vehicule.id?.toString() || '',
            brand: vehicule.marque,
            model: vehicule.modele,
            year: vehicule.anneeFabrication || 0,
            price: vehicule.prix || 0,
            color: vehicule.couleur || '', // Ensure color is populated
            numeroSerie: vehicule.numeroSerie || '', // Ensure numeroSerie is populated
            fcrEligible: false,
            image: vehicule.image || this.DEFAULT_IMAGE,
            specifications: {
              fuelType: vehicule.typeCarburant,
              transmission: 'Auto',  // Default value
              mileage: vehicule.kilometrage || 0,
              engine: ''  // Default value
            },
            description: vehicule.caracteristiquesSupplémentaires || '', // Ensure the description is populated
            features: [],
            latitude: vehicule.latitude || 0,
            longitude: vehicule.longitude || 0
          };

          // Initialize map after getting vehicle data
          setTimeout(() => this.initMap(), 100);
        },
        error: (err: any) => {
          console.error('Erreur chargement véhicule:', err);
        }
      });
    }
  }

  ngAfterViewInit() {
    // Wait for view to be ready before initializing map
    setTimeout(() => {
      if (this.vehicle?.latitude && this.vehicle?.longitude) {
       // this.initMap();
      }
    }, 100);
  }
  private initMap(): void {
    if (!this.vehicle?.latitude || !this.vehicle?.longitude) {
      console.error('Vehicle coordinates are missing');
      return;
    }

    // Initialize the map
    this.map = L.map('map').setView([this.vehicle.latitude, this.vehicle.longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker for the vehicle's location
    this.marker = L.marker([this.vehicle.latitude, this.vehicle.longitude]).addTo(this.map);

    // Add a popup to the marker
    this.marker.bindPopup(`
      <strong>${this.vehicle.brand} ${this.vehicle.model}</strong><br>
      ${this.vehicle.specifications.fuelType}<br>
      ${this.vehicle.year}
    `).openPopup();

    // Adjust the map view to fit the marker
    this.map.fitBounds(L.latLngBounds([this.marker.getLatLng()]));
    }
  ngOnDestroy() {
    // Clean up the map when the component is destroyed
    if (this.map) {
      this.map.remove();
    }
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
  }
}