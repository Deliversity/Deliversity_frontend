import AsyncStorage from '@react-native-community/async-storage';
import {SIGN, SIGN_SUCCESS, SIGN_FAIL} from './type';

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
export const requestSign = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/signup', data)
      .then((response) => {
        setUserStorage('userToken', response.data.data.token);
        axios.defaults.headers.common.Authorization = response.data.data.token;
        alert(response.data.data.admin + '님. 환영합니다.');
        dispatch(signSuccess());
      })
      .catch((error) => {
        alert('SIGN Failed : ' + error);
        dispatch(signFailure(error));
      });
  };
};

export const signSuccess = () => {
  return {
    type: SIGN_SUCCESS,
  };
};

export const signFailure = (error) => {
  return {
    type: SIGN_FAIL,
    error,
  };
};

export const storeData = (response) => {
  return {
    type: STORE_DATA,
    response,
  };
};
