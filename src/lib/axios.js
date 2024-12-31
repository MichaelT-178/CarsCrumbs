import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kz9jnu9fye.execute-api.us-east-1.amazonaws.com/dev',
  // baseURL: 'http://127.0.0.1:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;