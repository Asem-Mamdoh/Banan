import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (trackingId) {
      ReactGA.initialize(trackingId);
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    }
  }, []);

  return null;
}
