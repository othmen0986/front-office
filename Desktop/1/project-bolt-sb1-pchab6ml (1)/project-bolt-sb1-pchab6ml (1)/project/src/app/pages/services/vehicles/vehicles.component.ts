import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceBannerComponent } from '../../../shared/service-banner/service-banner.component';
import { RelatedServicesComponent } from '../../../shared/related-services/related-services.component';
import { VehiculeService } from './vehicule.service';
import { Vehicle, VehicleFilters } from '../../../core/models/vehicle.model';
import { fadeInUpAnimation, fadeInLeftAnimation } from '../../../core/animations/fade.animation';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ServiceBannerComponent,
    RelatedServicesComponent
  ],
  template: `
    <div class="vehicles-page">
      <app-service-banner 
        title="Véhicules Disponibles" 
        subtitle="Découvrez notre sélection de véhicules éligibles au privilège FCR">
      </app-service-banner>

      <div class="container">
        <div class="vehicles-content">
          <aside class="filters-sidebar" @fadeInLeft>
            <h3>Filtres</h3>
            
            <div class="filter-group">
              <h4>Prix</h4>
              <div class="price-range">
                <input 
                  type="range" 
                  [min]="0" 
                  [max]="500000" 
                  [(ngModel)]="filters.priceRange.max"
                  (ngModelChange)="updateFilters()">
                <span>Max: {{ filters.priceRange.max | currency:'TND':'symbol':'1.0-0' }}</span>
              </div>
            </div>

            <div class="filter-group">
              <h4>Marque</h4>
              <div class="checkbox-group">
                <label *ngFor="let brand of availableBrands">
                  <input 
                    type="checkbox"
                    [checked]="filters.brands.includes(brand)"
                    (change)="toggleBrand(brand)">
                  {{ brand }}
                </label>
              </div>
            </div>

            <div class="filter-group">
              <h4>Année</h4>
              <div class="checkbox-group">
                <label *ngFor="let year of availableYears">
                  <input 
                    type="checkbox"
                    [checked]="filters.years.includes(year)"
                    (change)="toggleYear(year)">
                  {{ year }}
                </label>
              </div>
            </div>

            <div class="filter-group">
              <h4>Type de carburant</h4>
              <div class="checkbox-group">
                <label *ngFor="let fuelType of availableFuelTypes">
                  <input 
                    type="checkbox"
                    [checked]="filters.fuelTypes.includes(fuelType)"
                    (change)="toggleFuelType(fuelType)">
                  {{ fuelType }}
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label class="fcr-eligible">
                <input 
                  type="checkbox"
                  [(ngModel)]="filters.fcrEligibleOnly"
                  (ngModelChange)="updateFilters()">
                Véhicules FCR uniquement
              </label>
            </div>
          </aside>

          <main class="vehicles-grid" @fadeInUp>
            <div class="vehicle-card" *ngFor="let vehicle of filteredVehicles">
              <div class="vehicle-image">
                <img [src]="vehicle.image" [alt]="vehicle.brand + ' ' + vehicle.model">
                <span class="fcr-badge" *ngIf="vehicle.fcrEligible">FCR</span>
              </div>
              <div class="vehicle-info">
                <h3>{{ vehicle.brand }} {{ vehicle.model }}</h3>
                <p class="vehicle-price">{{ vehicle.price | currency:'TND':'symbol':'1.0-0' }}</p>
                <div class="vehicle-specs">
                  <span>{{ vehicle.year }}</span>
                  <span>{{ vehicle.specifications.fuelType }}</span>
                  <span>{{ vehicle.specifications.transmission }}</span>
                </div>
                <div class="vehicle-actions">
                  <a [routerLink]="['/services/vehicles', vehicle.id]" class="primary-btn">
                    Voir détails
                  </a>
                  <button class="secondary-btn" *ngIf="vehicle.fcrEligible">
                    Demander FCR
                  </button>
                  <button class="secondary-btn" (click)="sendReportRequest(+vehicle.id)">
                    Envoyer un rapport
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vehicles-page {
      color: #e0e0e0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .vehicles-content {
      display: flex;
      gap: 30px;
      margin: 40px 0;
    }

    .filters-sidebar {
      width: 300px;
      flex-shrink: 0;
      background: rgba(26, 43, 71, 0.7);
      border-radius: 12px;
      padding: 25px;
      height: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .filters-sidebar h3 {
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }

    .filter-group {
      margin-bottom: 20px;
    }

    .filter-group h4 {
      color: #ffffff;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .price-range {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .price-range input[type="range"] {
      width: 100%;
      background: #4da1ff;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .checkbox-group input[type="checkbox"] {
      accent-color: #4da1ff;
    }

    .fcr-eligible {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #4da1ff;
      font-weight: 500;
    }

    .vehicles-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }

    .vehicle-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .vehicle-card:hover {
      transform: translateY(-5px);
      border-color: rgba(77, 161, 255, 0.3);
      background: linear-gradient(145deg, rgba(26, 43, 71, 0.7), rgba(25, 25, 25, 0.7));
    }

    .vehicle-image {
      position: relative;
      height: 200px;
    }

    .vehicle-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .fcr-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #4da1ff;
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .vehicle-info {
      padding: 20px;
    }

    .vehicle-info h3 {
      color: #ffffff;
      margin-bottom: 10px;
      font-size: 18px;
    }

    .vehicle-price {
      color: #4da1ff;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .vehicle-specs {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #e0e0e0;
    }

    .vehicle-actions {
      display: flex;
      gap: 10px;
    }

    .primary-btn {
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      text-align: center;
    }

    .primary-btn:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
    }

    .secondary-btn {
      background: transparent;
      color: #4da1ff;
      padding: 8px 15px;
      border-radius: 20px;
      border: 1px solid #4da1ff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .secondary-btn:hover {
      background: rgba(77, 161, 255, 0.1);
      transform: translateY(-2px);
    }

    @media (max-width: 992px) {
      .vehicles-content {
        flex-direction: column;
      }

      .filters-sidebar {
        width: 100%;
      }
    }
  `],
  animations: [fadeInUpAnimation, fadeInLeftAnimation]
})
export class VehiclesComponent implements OnInit {

  filteredVehicles: Vehicle[] = [];
  filters: VehicleFilters = {
    priceRange: { min: 0, max: 500000 },
    brands: [],
    years: [],
    fuelTypes: [],
    fcrEligibleOnly: false
  };

  availableBrands = ['Audi', 'BMW', 'Mercedes'];
  availableYears = [2024, 2023, 2022];
  availableFuelTypes = ['Electric', 'Hybrid', 'Essence'];

  DEFAULT_IMAGE = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg';

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehiculeService.getVehicles().subscribe({
      next: (vehicules) => {
        this.filteredVehicles = vehicules.map(v => ({
          id: v.id?.toString() || '',
          brand: v.marque,
          model: v.modele,
          image: v.image ? `http://localhost:8083/api/vehicules/images/${v.image}` : this.DEFAULT_IMAGE,
          numeroSerie: v.numeroSerie,
          year: v.anneeFabrication || 0,
          price: v.prix || 0,
          fcrEligible: false,
          specifications: {
            fuelType: v.typeCarburant,
            transmission: 'Auto',
            mileage: v.kilometrage || 0,
            engine: ''
          },
          description: v.caracteristiquesSupplémentaires,
          features: []
        }));
        this.applyFilters();
      },
      error: (err: any) => console.error('Error loading vehicles:', err)
    });
  }

  applyFilters() {
    this.filteredVehicles = this.filteredVehicles.filter(vehicle => {
      const matchesPrice = vehicle.price <= this.filters.priceRange.max;
      const matchesBrand = this.filters.brands.length === 0 || this.filters.brands.includes(vehicle.brand);
      const matchesYear = this.filters.years.length === 0 || this.filters.years.includes(vehicle.year);
      const matchesFuelType = this.filters.fuelTypes.length === 0 || this.filters.fuelTypes.includes(vehicle.specifications.fuelType);
      const matchesFcr = !this.filters.fcrEligibleOnly || vehicle.fcrEligible;

      return matchesPrice && matchesBrand && matchesYear && matchesFuelType && matchesFcr;
    });
  }

  updateFilters() {
    this.applyFilters();
  }

  toggleBrand(brand: string) {
    const index = this.filters.brands.indexOf(brand);
    if (index === -1) {
      this.filters.brands.push(brand);
    } else {
      this.filters.brands.splice(index, 1);
    }
    this.updateFilters();
  }

  toggleYear(year: number) {
    const index = this.filters.years.indexOf(year);
    if (index === -1) {
      this.filters.years.push(year);
    } else {
      this.filters.years.splice(index, 1);
    }
    this.updateFilters();
  }

  toggleFuelType(fuelType: string) {
    const index = this.filters.fuelTypes.indexOf(fuelType);
    if (index === -1) {
      this.filters.fuelTypes.push(fuelType);
    } else {
      this.filters.fuelTypes.splice(index, 1);
    }
    this.updateFilters();
  }

  sendReportRequest(vehicleId: number) {
    this.vehiculeService.sendReportRequest(vehicleId).subscribe({
      next: () => alert('Report request email sent successfully!'),
      error: (err) => console.error('Error sending report request email:', err)
    });
  }
}