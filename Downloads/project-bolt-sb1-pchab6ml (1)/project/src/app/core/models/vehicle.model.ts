export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fcrEligible: boolean;
  images: string[];
  specifications: {
    fuelType: string;
    transmission: string;
    mileage: number;
    engine: string;
  };
  description: string;
  features: string[];
}

export interface VehicleFilters {
  priceRange: { min: number; max: number };
  brands: string[];
  years: number[];
  fuelTypes: string[];
  fcrEligibleOnly: boolean;
}