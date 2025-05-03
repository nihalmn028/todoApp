import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/todo',
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response?.data?.error || error.message)
);

export default client;