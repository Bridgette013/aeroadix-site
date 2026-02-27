import { useEffect } from 'react';

const DEFAULT_TITLE = 'AEROADIX | 3D Scanned • 3D Engineered • 3D Printed';
const DEFAULT_DESCRIPTION =
  'AeroAdix — Bespoke Luxury Automotive Aerodynamics. Design, engineering, and development of functional aerodynamic components for elite performance vehicles.';

const SEO = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);

  return null;
};

export default SEO;
