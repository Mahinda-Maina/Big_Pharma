// Environment configuration
const API_BASE_URL = 'http://localhost:8000/api';

export const environment = {
  production: false,
  apiUrl: API_BASE_URL,
  apiEndpoints: {
    auth: {
      login: '/login',
      register: '/register',
      logout: '/logout',
      me: '/user',
    },
    products: '/products',
    orders: '/orders',
    categories: '/categories',
  },
};
