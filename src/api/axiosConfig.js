import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      console.log('Unauthorized access. Redirecting to login...');
    }

    return Promise.reject(error);
  }
);

export default api;