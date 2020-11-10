import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://www.deliversity.co.kr',
});

export default axiosInstance;
