
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const IS_PRODUCTION = import.meta.env.PROD;


export const initGTM = (): void => {
  if (!GTM_ID) {
    console.log('GTM not initialized - VITE_GTM_ID environment variable not set');
    return;
  }

  if (!IS_PRODUCTION) {
    console.log('GTM not initialized - running in development mode');
    return;
  }

  window.dataLayer = window.dataLayer || [];


  const gtmScript = document.createElement('script');
  gtmScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
  document.head.appendChild(gtmScript);


  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.insertBefore(noscript, document.body.firstChild);

  console.log('GTM initialized successfully');
};

/**

 * @param eventName - The event name
 * @param parameters - Event parameters
 */
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>): void => {
  if (!GTM_ID || !IS_PRODUCTION || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters,
  });
};

/**
 * Track page views (useful for SPA route changes)
 * @param path - The page path
 * @param title - Optional page title
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!GTM_ID || !IS_PRODUCTION || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: title || document.title,
  });
};
