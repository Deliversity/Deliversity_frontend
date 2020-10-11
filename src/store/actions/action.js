import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
} from './type';

import axios from '../../axiosConfig';

export const requestSignin = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/login', data)
      .then((response) => {
        console.log(response.data.token);
        console.log(response.data.admin);
        alert(response.data.admin + '님 반갑습니다.');
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
      });
  };
};
