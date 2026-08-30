import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

const publicEndpoints = ['register/', 'token/', 'token/refresh/'];

apiClient.interceptors.request.use((config) => {
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url.startsWith(endpoint),
  );
  if (!isPublic) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;
