import ReactGA from 'react-ga4';

// Track initialization state
let initialized = false;

/**
 * Initialize Google Analytics - will only initialize once
 */
export const initGA = () => {
  if (!initialized && typeof window !== 'undefined') {
    const isDev = process.env.NODE_ENV !== 'production';
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    // Check if GA was already initialized via script tag
    if (!window.gtag) {
      ReactGA.initialize('G-BHQ99ZXDGP', {
        testMode: isDev || isLocalhost,
        debug: isDev,
        gaOptions: {
          // Add cookie domain configuration
          cookieDomain: isLocalhost ? 'none' : 'auto'
        }
      });
      console.log(`Google Analytics initialized via React-GA4 (${isDev ? 'Development' : 'Production'} Mode)`);
    } else {
      // If gtag exists but we're on localhost, reconfigure it
      if (isLocalhost && window.gtag) {
        window.gtag('config', 'G-BHQ99ZXDGP', {
          cookie_domain: 'none',
          debug_mode: isDev
        });
        console.log('Reconfigured existing gtag for localhost');
      } else {
        console.log('Using existing Google Analytics tag');
      }
    }
    initialized = true;
  }
};

/**
 * Log page view
 */
export const logPageView = (path) => {
  const pagePath = path || window.location.pathname;
  if (window.gtag) {
    // Use gtag if available
    window.gtag('config', 'G-BHQ99ZXDGP', {
      page_path: pagePath
    });
  } else if (initialized) {
    // Fall back to ReactGA
    ReactGA.send({ hitType: 'pageview', page: pagePath });
  }
};

/**
 * Log event with proper type handling
 */
export const logEvent = (category, action, label = null, value = null) => {
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
  
  if (window.gtag) {
    // Convert to gtag format
    const gtagParams = {
      event_category: eventParams.category
    };
    if (eventParams.label) gtagParams.event_label = eventParams.label;
    if (eventParams.value) gtagParams.value = eventParams.value;
    
    window.gtag('event', action, gtagParams);
  } else if (initialized) {
    ReactGA.event(eventParams);
  }
};