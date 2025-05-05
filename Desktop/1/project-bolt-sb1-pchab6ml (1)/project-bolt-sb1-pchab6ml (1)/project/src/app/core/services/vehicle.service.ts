import { Injectable } from '@angular/core';
import { Vehicle, VehicleFilters } from '../models/vehicle.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'lamborghini',
      model: 'Urus',
      year: 2024,
      price: 180000,
      fcrEligible: true,
      images: [
        'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
        'https://images.pexels.com/photos/3802512/pexels-photo-3802512.jpeg'
      ],
      specifications: {
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: 0,
        engine: 'Electric Motor'
      },
      description: 'Nouvelle Audi e-tron GT, alliance parfaite entre performance et luxe électrique.',
      features: ['Navigation', 'Toit panoramique', 'Sièges chauffants', 'Assistance à la conduite']
    },
    {
      id: '2',
      brand: 'mercedes',
      model: 'G63 AMG',
      year: 2024,
      price: 160000,
      fcrEligible: true,
      images: [
        'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg',
        'https://images.pexels.com/photos/1429776/pexels-photo-1429776.jpeg'
      ],
      specifications: {
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: 0,
        engine: 'Electric Motor'
      },
      description: 'BMW i4, l\'élégance sportive rencontre l\'efficience électrique.',
      features: ['Système audio premium', 'Conduite semi-autonome', 'Recharge rapide']
    }
  ];

  private vehiclesSubject = new BehaviorSubject<Vehicle[]>(this.vehicles);
  private filtersSubject = new BehaviorSubject<VehicleFilters>({
    priceRange: { min: 0, max: 500000 },
    brands: [],
    years: [],
    fuelTypes: [],
    fcrEligibleOnly: false
  });

  getVehicles(): Observable<Vehicle[]> {
    return this.vehiclesSubject.asObservable();
  }

  getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  getFilteredVehicles(): Observable<Vehicle[]> {
    return this.vehiclesSubject.pipe(
      map(vehicles => this.applyFilters(vehicles, this.filtersSubject.value))
    );
  }

  updateFilters(filters: Partial<VehicleFilters>) {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      ...filters
    });
  }

  private applyFilters(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
    return vehicles.filter(vehicle => {
      const priceInRange = vehicle.price >= filters.priceRange.min && 
                          vehicle.price <= filters.priceRange.max;
      const matchesBrand = filters.brands.length === 0 || 
                          filters.brands.includes(vehicle.brand);
      const matchesYear = filters.years.length === 0 || 
                         filters.years.includes(vehicle.year);
      const matchesFuelType = filters.fuelTypes.length === 0 || 
                             filters.fuelTypes.includes(vehicle.specifications.fuelType);
      const matchesFcrEligible = !filters.fcrEligibleOnly || vehicle.fcrEligible;

      return priceInRange && matchesBrand && matchesYear && 
             matchesFuelType && matchesFcrEligible;
    });
  }
}