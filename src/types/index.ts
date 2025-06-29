export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon';
  color: string;
  images: string[];
  featured: boolean;
  isNew: boolean;
  location: string;
  description: string;
  features: string[];
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  owners: number;
  registrationYear: number;
  insuranceType: string;
  fuelEfficiency: string;
  engineCapacity: string;
  power: string;
  seatingCapacity: number;
  dealer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface SearchFilters {
  search?: string;
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  wishlist: string[];
  recentlyViewed: string[];
  savedSearches: SearchFilters[];
  compareList: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  purchasedCar: string;
}