/**
 * Defining all env variables
 */

const ENVIRONMENT = {
  BACKEND_API: import.meta.env?.VITE_BACKEND_API || 'http://localhost:5000',
  APP_NAME: import.meta.env?.VITE_NAME,
};

export default ENVIRONMENT;
