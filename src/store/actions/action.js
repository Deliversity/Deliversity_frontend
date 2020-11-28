import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  STORE_DATA,
  USER_CHANGE,
  ADDRESS_CHANGE,
  LINK_ACCOUNT,
  CURRENT_RELATION,
} from './type';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

let myInterceptor = '';
export const setUserStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem('@Deliversity:' + key, data);
  } catch (e) {
    alert('error: ' + e);
  }
};
export const getUserStorage = async (key) => {
  try {
    const userData = await AsyncStorage.getItem('@Deliversity:' + key);
    if (userData === null) {
      return false;
    }
    // //axios.defaults.headers.common['x-access-token'] = userData;
    // axios.interceptors.request.use(function (config) {
    //   const token = userData;
    //   config.headers['x-access-token'] = token;
    //
    //   return config;
    // });
    return userData;
  } catch (e) {
    alert('error: ' + e);
  }
};

export const removeUserStorage = async (key) => {
  try {
    await AsyncStorage.removeItem('@Deliversity:' + key);
  } catch (e) {
    alert('err : ', e);
  }
};
export const socialLogin = (data) => {
  return (dispatch) => {
    myInterceptor = axios.interceptors.request.use(function (config) {
      const token = data.data.data.token;
      config.headers['x-access-token'] = token;
      return config;
    });
    setUserStorage('userToken', data.data.data.token);
    setUserStorage('firebaseToken', data.data.data.firebaseToken);
    let decoded = jwt_decode(data.data.data.token);
    setUserStorage('id', decoded.id.toString());
    auth().signInWithCustomToken(data.data.data.firebaseToken);
    const userData = {
      token: data.data.data.token,
      name: decoded.name,
      grade: data.data.data.grade,
    };
    alert(decoded.name + '님 반갑습니다.');
    dispatch(loginSuccess(userData));
  };
};

export const requestLogin = (data) => {
  return (dispatch) => {
    return firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        data.fcmToken = fcmToken;
        axios
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
            setUserStorage('id', decoded.id.toString());
            console.log(decoded.id.toString());
            auth().signInWithCustomToken(response.data.data.firebaseToken);
            const userData = {
              token: response.data.data.token,
              name: decoded.name,
              grade: response.data.data.grade,
            };
            alert(decoded.name + '님 반갑습니다.');
            dispatch(loginSuccess(userData));
          })
          .catch((error) => {
            alert(error.response.data.message);
            dispatch(loginFailure(error));
          });
      });
  };
};
export const autoLogin = (data) => {
  return (dispatch) => {
    return firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        const content = {fcmToken: fcmToken};
        myInterceptor = axios.interceptors.request.use(function (config) {
          const token = data.token;
          config.headers['x-access-token'] = token;
          return config;
        });
        axios
          .get('/api/v1/auth/login')
          .then((response) => {
            myInterceptor = axios.interceptors.request.use(function (config) {
              const newtoken = response.data.data.token;
              config.headers['x-access-token'] = newtoken;
              return config;
            });
            axios
              .post('/api/v1/auth/login/fcm', content)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                alert(error.response.data.message);
              });
            setUserStorage('userToken', response.data.data.token);
            setUserStorage('firebaseToken', response.data.data.firebaseToken);
            let decoded = jwt_decode(response.data.data.token);
            setUserStorage('id', decoded.id.toString());
            console.log(decoded.id.toString());
            auth().signInWithCustomToken(response.data.data.firebaseToken);
            const userData = {
              token: response.data.data.token,
              name: decoded.name,
              grade: response.data.data.grade,
            };
            dispatch(loginSuccess(userData));
          })
          .catch((error) => {
            //axios.interceptors.request.eject(myInterceptor);
            alert('재로그인 해주시기 바랍니다.');
            dispatch(loginFailure(error));
          });
      });
  };
};

export const requestChangeUser = (user) => {
  return {
    type: USER_CHANGE,
    data: user,
  };
};
export const currentRelation = (owner, guest, orderNum) => {
  console.log('visit');
  return {
    type: CURRENT_RELATION,
    owner: owner,
    guest: guest,
    orderNum: orderNum,
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
        alert(error.response.data.message);
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
    removeUserStorage('fcmToken');
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
