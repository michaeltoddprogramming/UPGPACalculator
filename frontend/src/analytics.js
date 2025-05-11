import ReactGA from 'react-ga4';

// Track initialization state
let initialized = false;

/**
 * Initialize Google Analytics - will only initialize once
 */
export const initGA = () => {
  if (!initialized && typeof window !== 'undefined') {
    const isDev = process.env.NODE_ENV !== 'production';
    
    // Check if GA was already initialized via script tag
    if (!window.gtag) {
      ReactGA.initialize('G-BHQ99ZXDGP', {
        testMode: isDev,
        debug: isDev // Enable debug logs in development
      });
      console.log(`Google Analytics initialized via React-GA4 (${isDev ? 'Development' : 'Production'} Mode)`);
    } else {
      console.log('Google Analytics already initialized via script tag');
    }
    initialized = true;
  }
};

/**
 * Log page view
 * @param {string} path - Optional path override
 */
export const logPageView = (path) => {
  const pagePath = path || window.location.pathname;
  if (initialized) {
    ReactGA.send({ hitType: 'pageview', page: pagePath });
  }
};

/**
 * Log event with proper type handling
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string|null} label - Optional event label
 * @param {number|null} value - Optional event value (must be a number)
 */
export const logEvent = (category, action, label = null, value = null) => {
  if (initialized) {
    const eventParams = {
      category,
      action
    };
    
    // Only add label if it exists
    if (label !== null && label !== undefined) {
      eventParams.label = String(label);
    }
    
    // Only add value if it's a valid number
    if (value !== null && value !== undefined) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        eventParams.value = numValue;
      }
    }
    
    ReactGA.event(eventParams);
  }
};