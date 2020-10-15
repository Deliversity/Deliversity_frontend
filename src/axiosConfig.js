import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://deliversity.co.kr',
});

export default axiosInstance;
