import axios from 'axios';
import { REACT_APP_URL_SERVER } from '../.env.json';

const api = axios.create({
  baseURL: REACT_APP_URL_SERVER,
});

export default api;
