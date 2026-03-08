// Helper to create page URLs that work with GitHub Pages base path
export const createPageUrl = (pageName) => {
  // Convert page name to route path
  const routes = {
    'Home': '/MTC/',
    'Plans': '/MTC/plans',
    'Register': '/MTC/register',
    'Dashboard': '/MTC/dashboard',
    'About': '/MTC/about'
  };
  
  return routes[pageName] || '/MTC/';
};