export interface Vehicle {
  id: string;  // Keep as string to match backend
  brand: string;
  model: string;
  year: number;
  price: number;
  fcrEligible: boolean;
  image: string;
  specifications: {
    fuelType: string;
    transmission: string;
    mileage: number;
    engine: string;
  };
  description: string;
  features: string[];
  numeroSerie: string;
  latitude?: number;
  color?: string;
  longitude?: number;
}

export interface VehicleFilters {
  priceRange: { min: number; max: number };
  brands: string[];
  years: number[];
  fuelTypes: string[];
  fcrEligibleOnly: boolean;
}