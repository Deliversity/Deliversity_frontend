import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  STORE_DATA,
  SIGNUP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_CHANGE,
} from './type';
import buffer from 'buffer';
import axios from '../../axiosConfig';
import jwt_decode from "jwt-decode";
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
    axios.defaults.headers.common.Authorization = userData;
  } catch (e) {
    alert('error: ' + e);
  }
};

export const removeUserStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    alert('err : ', e);
  }
};

export const requestLogin = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/login', data)
      .then((response) => {
        setUserStorage('userToken', response.data.data.token);
        axios.defaults.headers.common.Authorization = response.data.data.token;
        let decoded = jwt_decode(response.data.data.token);
        alert(decoded.name + '님 반갑습니다.');
        console.log(decoded);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
        dispatch(loginFailure(error));
      });
  };
};

export const requestSignup = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/signup', data)
      .then((response) => {
        alert(response.data.data.name + '님. 환영합니다.');
        dispatch(signupSuccess());
      })
      .catch((error) => {
        alert('SIGN Failed : ' + error);
        dispatch(signupFailure(error));
      });
  };
};
export const requestChangeUser = (user) => {
  return {
    type: USER_CHANGE,
    data: user,
  };
};
export const requestLogout = (data) => {
  return (dispatch) => {
    removeUserStorage('userToken');
    dispatch(logout());
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
