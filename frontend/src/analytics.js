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
    
    // Get the domain for proper cookie setting
    // Extract root domain for cookie purposes
    const domain = isLocalhost ? 'none' : extractRootDomain(hostname);
    
    // Check if GA was already initialized via script tag
    if (!window.gtag) {
      ReactGA.initialize('G-BHQ99ZXDGP', {
        testMode: isDev || isLocalhost,
        debug: isDev,
        gaOptions: {
          cookieDomain: domain
        }
      });
      console.log(`Google Analytics initialized via React-GA4 (${isDev ? 'Development' : 'Production'} Mode)`);
    } else {
      // If gtag exists, reconfigure it with proper domain
      window.gtag('config', 'G-BHQ99ZXDGP', {
        cookie_domain: domain,
        debug_mode: isDev
      });
      console.log(`Reconfigured existing gtag for ${isLocalhost ? 'localhost' : domain}`);
    }
    initialized = true;
  }
};

/**
 * Extract the root domain for cookie purposes
 */
function extractRootDomain(hostname) {
  // Special case for localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'none';
  }
  
  // Handle both www and non-www versions
  const domainParts = hostname.split('.');
  
  // If domain has www prefix, remove it
  if (domainParts[0] === 'www') {
    domainParts.shift();
  }
  
  // Get the main domain (example.com)
  return domainParts.join('.');
}

/**
 * Log page view
 */
export const logPageView = (path) => {
  const pagePath = path || window.location.pathname;
  
  // Get the domain again for consistency
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const domain = isLocalhost ? 'none' : extractRootDomain(hostname);
  
  if (window.gtag) {
    // Use gtag if available with proper domain setting
    window.gtag('config', 'G-BHQ99ZXDGP', {
      page_path: pagePath,
      cookie_domain: domain
    });
  } else if (initialized) {
    // Fall back to ReactGA
    ReactGA.send({ hitType: 'pageview', page: pagePath });
  }
};

// Rest of the code remains the same
export const logEvent = (category, action, label = null, value = null) => {
  // ...existing implementation...
};