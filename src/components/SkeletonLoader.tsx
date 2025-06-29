import React from 'react';

interface SkeletonLoaderProps {
  type: 'car-card' | 'car-list' | 'car-details' | 'search-results';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1 }) => {
  const renderCarCardSkeleton = () => (
    <div className="bg-pure-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        
        {/* Location */}
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        
        {/* Key details */}
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
        
        {/* Features */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  const renderCarListSkeleton = () => (
    <div className="bg-pure-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="flex">
        {/* Image */}
        <div className="w-1/3 h-48 bg-gray-300"></div>
        
        {/* Content */}
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-gray-300 rounded w-48"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-18"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCarDetailsSkeleton = () => (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="flex space-x-2 mb-6">
        <div className="h-4 bg-gray-300 rounded w-12"></div>
        <div className="h-4 bg-gray-300 rounded w-1"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-1"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <div className="bg-pure-white rounded-xl overflow-hidden">
            <div className="w-full h-96 bg-gray-300"></div>
            <div className="p-4 flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Car details */}
          <div className="bg-pure-white rounded-xl p-6 space-y-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </div>
            </div>

            {/* Key specs */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-32"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-40"></div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price card */}
          <div className="bg-pure-white rounded-xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="h-8 bg-gray-300 rounded w-32 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Dealer info */}
          <div className="bg-pure-white rounded-xl p-6 space-y-4">
            <div className="h-5 bg-gray-300 rounded w-32"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchResultsSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Filters */}
      <div className="bg-pure-white rounded-xl p-6 space-y-4">
        <div className="h-5 bg-gray-300 rounded w-32"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i}>{renderCarCardSkeleton()}</div>
        ))}
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'car-card':
        return renderCarCardSkeleton();
      case 'car-list':
        return renderCarListSkeleton();
      case 'car-details':
        return renderCarDetailsSkeleton();
      case 'search-results':
        return renderSearchResultsSkeleton();
      default:
        return renderCarCardSkeleton();
    }
  };

  if (type === 'car-details' || type === 'search-results') {
    return <div>{renderSkeleton()}</div>;
  }

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default SkeletonLoader;