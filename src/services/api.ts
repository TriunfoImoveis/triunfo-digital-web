import axios from 'axios';

const api = axios.create({
  baseURL: 'http://8b47f3102f61.ngrok.io',
});

export default api;
