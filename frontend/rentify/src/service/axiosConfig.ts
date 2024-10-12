import axios from 'axios';

const api = axios.create({
  baseURL: 'https://s18-23-n-java-react.onrender.com/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
