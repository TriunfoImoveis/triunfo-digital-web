import axios from 'axios';

const api = axios.create({
  baseURL: 'http://449624ed8578.ngrok.io',
});

export default api;
