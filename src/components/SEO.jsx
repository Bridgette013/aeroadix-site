import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AEROADIX';
const SITE_URL = 'https://aeroadix.com';
const DEFAULT_TITLE = 'AEROADIX | 3D Printed Automotive Aerodynamics';
const DEFAULT_DESCRIPTION =
  'AeroAdix specializes in 3D printed automotive aerodynamics — CFD-validated splitters, diffusers, canards, and vortex generators engineered for elite performance vehicles.';
const DEFAULT_IMAGE = `${SITE_URL}/assets/aeroadix-og.jpg`;

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AeroAdix',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: '3DBoomPrint',
  },
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0a0a0a" />

      {/* LocalBusiness Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}
