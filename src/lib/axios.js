import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://azr5xytq99.execute-api.us-east-1.amazonaws.com/dev',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;