import React, { Suspense, lazy } from 'react';
import { Loader } from 'lucide-react';

// Lazy load heavy components
const LazyCarCard = lazy(() => import('./CarCard'));

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ 
  children, 
  fallback 
}) => {
  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-3">
        <Loader className="w-6 h-6 text-deep-red-600 animate-spin" />
        <span className="text-gray-600 font-medium">Loading premium content...</span>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Virtual scrolling component for large lists
export const VirtualizedCarList: React.FC<{ cars: any[]; renderItem: (car: any) => React.ReactNode }> = ({ 
  cars, 
  renderItem 
}) => {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 12 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const itemHeight = 400; // Approximate height of car card
      const containerTop = containerRef.current.offsetTop;
      const viewportHeight = window.innerHeight;
      
      const start = Math.max(0, Math.floor((scrollTop - containerTop) / itemHeight) - 2);
      const end = Math.min(cars.length, start + Math.ceil(viewportHeight / itemHeight) + 4);
      
      setVisibleRange({ start, end });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cars.length]);

  const visibleCars = cars.slice(visibleRange.start, visibleRange.end);

  return (
    <div ref={containerRef} style={{ minHeight: cars.length * 400 }}>
      <div style={{ transform: `translateY(${visibleRange.start * 400}px)` }}>
        {visibleCars.map(renderItem)}
      </div>
    </div>
  );
};

// Image preloader
export const ImagePreloader: React.FC<{ src: string; onLoad?: () => void }> = ({ src, onLoad }) => {
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => onLoad?.();
    img.src = src;
  }, [src, onLoad]);

  return null;
};

// Critical CSS inliner (would be implemented at build time)
export const CriticalCSS = () => (
  <style>{`
    /* Critical above-the-fold styles */
    .hero-section { min-height: 100vh; }
    .nav-header { position: sticky; top: 0; z-index: 50; }
    .car-card { transition: transform 0.3s ease; }
    .loading-skeleton { 
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}</style>
);

export default PerformanceOptimizer;