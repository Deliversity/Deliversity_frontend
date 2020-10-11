import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jenkins.skyhyun.ml',
});

export default axiosInstance;
