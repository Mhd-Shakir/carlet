import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import CarCard from '../components/CarCard';
import SearchFilters from '../components/SearchFilters';
import TestDriveBooking from '../components/TestDriveBooking';
import { mockCars } from '../data/mockData';
import { Car, SearchFilters as SearchFiltersType } from '../types';

const CarsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const carsPerPage = 12;

  // Initialize filters from URL params
  useEffect(() => {
    const urlFilters: SearchFiltersType = {};
    
    searchParams.forEach((value, key) => {
      if (key === 'minPrice' || key === 'maxPrice' || key === 'minYear' || key === 'maxYear' || key === 'maxMileage') {
        urlFilters[key as keyof SearchFiltersType] = parseInt(value) as any;
      } else {
        urlFilters[key as keyof SearchFiltersType] = value as any;
      }
    });
    
    setFilters(urlFilters);
  }, [searchParams]);

  // Filter and sort cars
  useEffect(() => {
    let filtered = mockCars.filter(car => {
      // General search term matching
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const carText = `${car.title} ${car.make} ${car.model} ${car.description}`.toLowerCase();
        if (!carText.includes(searchTerm)) return false;
      }
      
      // Specific filters
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.minPrice && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.minYear && car.year < filters.minYear) return false;
      if (filters.maxYear && car.year > filters.maxYear) return false;
      if (filters.maxMileage && car.mileage > filters.maxMileage) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      
      return true;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      default: // newest
        filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const handleSearch = () => {
    // Search is automatically triggered by filters
  };

  const handleTestDrive = (car: any) => {
    setSelectedCar(car);
    setIsTestDriveOpen(true);
  };

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Browse Cars</h1>
          <p className="text-neutral-600 text-lg">
            Showing {filteredCars.length} of {mockCars.length} cars available
            {filters.search && (
              <span className="ml-2 text-primary-600 font-medium">
                for "{filters.search}"
              </span>
            )}
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8 md:mb-12">
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-neutral-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-neutral-600 hover:text-primary-500'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-neutral-600 hover:text-primary-500'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cars Grid/List */}
        {currentCars.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                {currentCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onBookTestDrive={handleTestDrive}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                {currentCars.map(car => (
                  <div key={car.id} className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/3">
                        <img
                          src={car.images[0]}
                          alt={car.title}
                          className="w-full h-48 lg:h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">{car.title}</h3>
                            <p className="text-neutral-600">{car.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-neutral-900">
                              {formatPrice(car.price)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                          <div>
                            <span className="font-medium">Year:</span> {car.year}
                          </div>
                          <div>
                            <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} miles
                          </div>
                          <div>
                            <span className="font-medium">Fuel:</span> {car.fuelType}
                          </div>
                          <div>
                            <span className="font-medium">Transmission:</span> {car.transmission}
                          </div>
                        </div>
                        
                        <p className="text-neutral-600 mb-6 line-clamp-2">{car.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {car.features.slice(0, 3).map((feature, index) => (
                              <span
                                key={index}
                                className="text-xs bg-neutral-100 text-neutral-600 px-3 py-2 rounded-lg"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          
                          <button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-3 border border-neutral-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-3 rounded-xl ${
                      currentPage === index + 1
                        ? 'bg-primary-500 text-white'
                        : 'border border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-3 border border-neutral-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="text-neutral-400 mb-6">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">No cars found</h3>
            <p className="text-neutral-600 mb-8">
              {filters.search ? (
                <>No cars match your search for "{filters.search}". Try adjusting your search terms or filters.</>
              ) : (
                <>Try adjusting your search filters to see more results.</>
              )}
            </p>
            <button
              onClick={() => handleFiltersChange({})}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Test Drive Booking Modal */}
      <TestDriveBooking
        carId={selectedCar?.id}
        carTitle={selectedCar?.title}
        carImage={selectedCar?.images?.[0]}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />
    </div>
  );
};

export default CarsPage;