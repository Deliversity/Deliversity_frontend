import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://deliversity.co.kr',
});

export default axiosInstance;
