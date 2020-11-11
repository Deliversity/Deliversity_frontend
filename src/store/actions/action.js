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
  ADDRESS_CHANGE,
  LINK_ACCOUNT,
} from './type';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

let myInterceptor = '';
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
    return userData
    // //axios.defaults.headers.common['x-access-token'] = userData;
    // axios.interceptors.request.use(function (config) {
    //   const token = userData;
    //   config.headers['x-access-token'] = token;
    //
    //   return config;
    // });
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
export const requestGoogleLogin = (data) => {
  return (dispatch) => {
    auth().currentUser.getIdToken()
    .then((fcmToken)=>{})
    //console.log(data);
    return axios
      .post('/api/v1/auth/login/google', data)
      .then((response) => {
        myInterceptor = axios.interceptors.request.use(function (config) {
          const token = response.data.data.token;
          config.headers['x-access-token'] = token;
          return config;
        });
        setUserStorage('userToken', response.data.data.token);
        setUserStorage('firebaseToken', response.data.data.firebaseToken);
        let decoded = jwt_decode(response.data.data.token);
        setUserStorage('id', decoded.id);
        auth().signInWithCustomToken(response.data.data.firebaseToken);
        const userData = {
          token: response.data.data.token,
          name: decoded.name,
          grade: response.data.data.grade,
          id: response.data.data.id,
          nickName: response.data.data.nickName,
        };
        alert(decoded.name + '님 반갑습니다.');
        dispatch(loginSuccess(userData));
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
        dispatch(linkAccount(error));
      });
  };
};

export const requestKakaoLogin = (data) => {
  return (dispatch) => {
    // console.log(data)
    return axios
      .post('/api/v1/auth/login/kakao', data)
      .then((response) => {
        myInterceptor = axios.interceptors.request.use(function (config) {
          const token = response.data.data.token;
          config.headers['x-access-token'] = token;
          return config;
        });
        setUserStorage('userToken', response.data.data.token);
        setUserStorage('firebaseToken', response.data.data.firebaseToken);
        let decoded = jwt_decode(response.data.data.token);
        auth().signInWithCustomToken(response.data.data.firebaseToken);
        const userData = {
          token: response.data.data.token,
          name: decoded.name,
          grade: response.data.data.grade,
          id: response.data.data.id,
          nickName: response.data.data.nickName,
        };
        alert(decoded.name + '님 반갑습니다.');
        dispatch(loginSuccess(userData));
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
        dispatch(linkAccount(error));
      });
  };
};

export const requestLogin = (data) => {
  return (dispatch) => {
    return axios
      .post('/api/v1/auth/login', data)
      .then((response) => {
        myInterceptor = axios.interceptors.request.use(function (config) {
          const token = response.data.data.token;
          config.headers['x-access-token'] = token;
          return config;
        });
        setUserStorage('userToken', response.data.data.token);
        setUserStorage('firebaseToken', response.data.data.firebaseToken);
        let decoded = jwt_decode(response.data.data.token);
        auth().signInWithCustomToken(response.data.data.firebaseToken);
        const userData = {
          token: response.data.data.token,
          name: decoded.name,
          grade: response.data.data.grade,
          id: response.data.data.id,
          nickName: response.data.data.nickName,
        };
        alert(decoded.name + '님 반갑습니다.');
        dispatch(loginSuccess(userData));
      })
      .catch((error) => {
        alert('Login Failed : ' + error);
        dispatch(loginFailure(error));
      });
  };
};

export const requestSignup = (data) => {
  console.log(data);
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
export const requestUpdateAddress = () => {
  return (dispatch) => {
    return axios
      .get('/api/v1/myinfo/address')
      .then((response) => {
        const address =
          response.data.data.address + ' ' + response.data.data.detailAddress;
        console.log(address);
        dispatch(addressSuccess(address));
      })
      .catch((error) => {
        alert('Failed : ' + error);
      });
  };
};
export const addressSuccess = (address) => {
  return {
    type: ADDRESS_CHANGE,
    data: address,
  };
};
export const requestLogout = () => {
  return (dispatch) => {
    removeUserStorage('userToken');
    axios.interceptors.request.eject(myInterceptor);
    dispatch(logout());
  };
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    name: data.name,
    grade: data.grade,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const linkAccount = (error) => {
  return {
    type: LINK_ACCOUNT,
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
