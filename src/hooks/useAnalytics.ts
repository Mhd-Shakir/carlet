import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', action, {
        category,
        label,
        value,
      });
    }

    // Custom analytics
    console.log('Analytics Event:', { action, category, label, value });
  };

  const trackPageView = (page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page,
      });
    }
  };

  const trackCarView = (carId: string, carTitle: string, price: number) => {
    trackEvent({
      action: 'view_item',
      category: 'Cars',
      label: carTitle,
      value: price,
    });
  };

  const trackCarInquiry = (carId: string, carTitle: string, inquiryType: string) => {
    trackEvent({
      action: 'generate_lead',
      category: 'Cars',
      label: `${carTitle} - ${inquiryType}`,
    });
  };

  const trackSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent({
      action: 'search',
      category: 'Cars',
      label: searchTerm,
      value: resultsCount,
    });
  };

  const trackWishlistAdd = (carId: string, carTitle: string) => {
    trackEvent({
      action: 'add_to_wishlist',
      category: 'Cars',
      label: carTitle,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackCarView,
    trackCarInquiry,
    trackSearch,
    trackWishlistAdd,
  };
};

export default useAnalytics;