import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';
import { carMakes, fuelTypes, transmissionTypes, bodyTypes } from '../data/mockData';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== undefined && value !== '');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 md:w-6 md:h-6 text-neutral-600" />
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900">Search Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary-100 text-primary-600 text-xs px-3 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-neutral-500 hover:text-red-600 text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="mb-6 md:mb-8">
        <label className="block text-sm font-medium text-neutral-700 mb-2">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by make, model, or keywords..."
            value={localFilters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Make</label>
          <select
            value={localFilters.make || ''}
            onChange={(e) => updateFilter('make', e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Make</option>
            {carMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Max Price</label>
          <select
            value={localFilters.maxPrice || ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Price</option>
            <option value="10000">Under £10,000</option>
            <option value="20000">Under £20,000</option>
            <option value="30000">Under £30,000</option>
            <option value="40000">Under £40,000</option>
            <option value="50000">Under £50,000</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Min Year</label>
          <select
            value={localFilters.minYear || ''}
            onChange={(e) => updateFilter('minYear', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Year</option>
            <option value="2020">2020 or newer</option>
            <option value="2018">2018 or newer</option>
            <option value="2015">2015 or newer</option>
            <option value="2010">2010 or newer</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Fuel Type</label>
          <select
            value={localFilters.fuelType || ''}
            onChange={(e) => updateFilter('fuelType', e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Fuel</option>
            {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Body Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Body Type</label>
          <select
            value={localFilters.bodyType || ''}
            onChange={(e) => updateFilter('bodyType', e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Type</option>
            {bodyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Transmission</label>
          <select
            value={localFilters.transmission || ''}
            onChange={(e) => updateFilter('transmission', e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Transmission</option>
            {transmissionTypes.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>

        {/* Max Mileage */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Max Mileage</label>
          <select
            value={localFilters.maxMileage || ''}
            onChange={(e) => updateFilter('maxMileage', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">Any Mileage</option>
            <option value="25000">Under 25,000 miles</option>
            <option value="50000">Under 50,000 miles</option>
            <option value="75000">Under 75,000 miles</option>
            <option value="100000">Under 100,000 miles</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Search className="w-4 h-4" />
        <span>Search Cars</span>
      </button>
    </div>
  );
};

export default SearchFilters;