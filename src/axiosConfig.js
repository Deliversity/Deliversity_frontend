import axios from 'axios';
import {URL} from '../env/development.json'

const axiosInstance = axios.create({
  baseURL: URL,
});

export default axiosInstance;
