import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/todo', 
  headers: {
    'Content-Type': 'application/json'
  }
});
axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response?.data?.error || error.message)
);
export default axiosInstance;
