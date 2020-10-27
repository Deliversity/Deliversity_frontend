import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, STORE_DATA} from './type';

import axios from '../../axiosConfig';
export const setUserStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    alert('error: ' + e);
  }
};
export const getUserStorage = async (key) => {
  try {
    const userData = await AsyncStorage.getItem(key);
    if (userData === null) {
      return false;
    }
  } catch (e) {
    alert('error: ' + e);
  }
};
export const requestLogin = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/login', data)
      .then((response) => {
        setUserStorage('userToken', response.data.data.token);
        axios.defaults.headers.common.Authorization = response.data.data.token;
        alert(response.data.data.admin + '님 반갑습니다.');
        dispatch(loginSuccess());
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
        dispatch(loginFailure(error));
      });
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const storeData = (response) => {
  return {
    type: STORE_DATA,
    response,
  };
};
<<<<<<< Updated upstream
=======

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAIL,
    error,
  };
};
>>>>>>> Stashed changes
