import axios from 'axios';
// import { REACT_APP_URL_SERVER } from '../.env.json';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
