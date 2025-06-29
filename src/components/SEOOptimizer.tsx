import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  carData?: {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    location: string;
  };
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  carData
}) => {
  const defaultTitle = 'CarLet - Premium Used Cars | Luxury Pre-Owned Vehicles UK';
  const defaultDescription = 'Discover exceptional pre-owned luxury vehicles at CarLet. Transparent pricing, comprehensive warranties, and white-glove service from the UK\'s most prestigious dealer.';
  const defaultKeywords = ['used cars', 'luxury cars', 'pre-owned vehicles', 'car dealer UK', 'premium cars', 'CarLet'];

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = [...defaultKeywords, ...keywords];

  // Generate structured data for car listings
  const generateCarStructuredData = () => {
    if (!carData) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Car',
      'name': `${carData.year} ${carData.make} ${carData.model}`,
      'brand': {
        '@type': 'Brand',
        'name': carData.make
      },
      'model': carData.model,
      'vehicleModelDate': carData.year.toString(),
      'mileageFromOdometer': {
        '@type': 'QuantitativeValue',
        'value': carData.mileage,
        'unitCode': 'SMI'
      },
      'offers': {
        '@type': 'Offer',
        'price': carData.price,
        'priceCurrency': 'GBP',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'AutoDealer',
          'name': 'CarLet Premium Motors',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Mayfair Street',
            'addressLocality': 'London',
            'postalCode': 'W1K 5AA',
            'addressCountry': 'GB'
          }
        }
      },
      'vehicleConfiguration': 'Used'
    };
  };

  // Generate organization structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': 'CarLet Premium Motors',
    'description': 'Premium used car dealer specializing in luxury pre-owned vehicles',
    'url': 'https://carlet.co.uk',
    'logo': 'https://carlet.co.uk/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Mayfair Street',
      'addressLocality': 'London',
      'postalCode': 'W1K 5AA',
      'addressCountry': 'GB'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+44-20-1234-5678',
      'contactType': 'customer service'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '2847'
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="CarLet Premium Motors" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="CarLet Premium Motors" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-GB" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="London" />
      
      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      
      {carData && (
        <script type="application/ld+json">
          {JSON.stringify(generateCarStructuredData())}
        </script>
      )}
    </Helmet>
  );
};

export default SEOOptimizer;