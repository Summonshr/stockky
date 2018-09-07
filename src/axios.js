import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'development'  ? 'https://packages.test' : 'https://api.stocknp.com',
});
