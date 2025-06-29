import React, { useState } from 'react';
import { Filter, X, ChevronDown, Sliders, MapPin, Calendar, Fuel, Settings, Palette } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';

interface AdvancedFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
  totalResults: number;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  totalResults
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 100000]);
  const [yearRange, setYearRange] = useState([filters.minYear || 2010, filters.maxYear || 2024]);
  const [mileageRange, setMileageRange] = useState([0, filters.maxMileage || 100000]);

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    onFiltersChange(emptyFilters);
    setPriceRange([0, 100000]);
    setYearRange([2010, 2024]);
    setMileageRange([0, 100000]);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  const popularFilters = [
    { label: 'Under £20k', action: () => updateFilter('maxPrice', 20000) },
    { label: 'Low Mileage', action: () => updateFilter('maxMileage', 30000) },
    { label: 'Recent Models', action: () => updateFilter('minYear', 2020) },
    { label: 'Automatic', action: () => updateFilter('transmission', 'Automatic') },
    { label: 'Petrol', action: () => updateFilter('fuelType', 'Petrol') },
    { label: 'SUV', action: () => updateFilter('bodyType', 'SUV') }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-deep-red-600 to-coral-orange-500 rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Smart Filters</h2>
              <p className="text-sm text-gray-600">{totalResults} cars match your criteria</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-4 py-2 bg-deep-red-600 text-white rounded-lg hover:bg-deep-red-700 transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span className="text-sm font-medium">{isExpanded ? 'Simple' : 'Advanced'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Filters</h3>
        <div className="flex flex-wrap gap-2">
          {popularFilters.map((filter, index) => (
            <button
              key={index}
              onClick={filter.action}
              className="px-4 py-2 bg-gray-100 hover:bg-deep-red-50 hover:text-deep-red-600 text-gray-700 rounded-full text-sm font-medium transition-colors border hover:border-deep-red-200"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filters */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Make & Model */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
              <select
                value={filters.make || ''}
                onChange={(e) => updateFilter('make', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              >
                <option value="">Any Make</option>
                <option value="BMW">BMW</option>
                <option value="Audi">Audi</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Tesla">Tesla</option>
                <option value="Volkswagen">Volkswagen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
              <input
                type="text"
                placeholder="e.g., 3 Series, A4"
                value={filters.model || ''}
                onChange={(e) => updateFilter('model', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
                />
              </div>
              <div className="text-sm text-gray-600">
                £{(filters.minPrice || 0).toLocaleString()} - £{(filters.maxPrice || 100000).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Year & Mileage */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year From</label>
              <select
                value={filters.minYear || ''}
                onChange={(e) => updateFilter('minYear', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              >
                <option value="">Any Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Mileage</label>
              <select
                value={filters.maxMileage || ''}
                onChange={(e) => updateFilter('maxMileage', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              >
                <option value="">Any Mileage</option>
                <option value="10000">Under 10,000</option>
                <option value="25000">Under 25,000</option>
                <option value="50000">Under 50,000</option>
                <option value="75000">Under 75,000</option>
                <option value="100000">Under 100,000</option>
              </select>
            </div>
          </div>

          {/* Vehicle Type & Features */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Body Type</label>
              <select
                value={filters.bodyType || ''}
                onChange={(e) => updateFilter('bodyType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              >
                <option value="">Any Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
              <select
                value={filters.fuelType || ''}
                onChange={(e) => updateFilter('fuelType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
              >
                <option value="">Any Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transmission</label>
                <select
                  value={filters.transmission || ''}
                  onChange={(e) => updateFilter('transmission', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
                >
                  <option value="">Any Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City or postcode"
                    value={filters.location || ''}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Distance</label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-red-500 focus:border-deep-red-500 outline-none transition-all">
                  <option value="">Any Distance</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100 miles</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onSearch}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-deep-red-600 to-coral-orange-500 text-white font-bold rounded-xl hover:from-deep-red-700 hover:to-coral-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Search {totalResults} Cars
          </button>
          <button className="px-6 py-4 border-2 border-deep-red-600 text-deep-red-600 font-semibold rounded-xl hover:bg-deep-red-600 hover:text-white transition-all duration-200">
            Save Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;