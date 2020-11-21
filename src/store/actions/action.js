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
  CURRENT_RELATION,
  ORDER_SUCCESS,
  ORDER_FAIL,
  QA_SUCCESS,
  QA_FAIL,
  REPORT_SUCCESS,
  REPORT_FAIL
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
export const requestGoogleLogin = (data) => {
  return (dispatch) => {
    return firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        data.fcmToken = fcmToken;
        axios
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
            setUserStorage('id', decoded.id.toString());
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
            alert(error.response.data.message);
            dispatch(linkAccount(error));
          });
      });
  };
};

export const requestKakaoLogin = (data) => {
  return (dispatch) => {
    return firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        data.fcmToken = fcmToken;
        axios
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
            setUserStorage('id', decoded.id.toString());
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
            alert(error.response.data.message);
            dispatch(linkAccount(error));
          });
      });
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
              id: response.data.data.id,
              nickName: response.data.data.nickName,
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
        alert(error.response.data.message);
        dispatch(signupFailure(error));
      });
  };
};
export const requestOrder = (data) => {
  console.log(data);
  return (dispatch) => {
    return axios
      .post('/api/v1/order', data)
      .then((response) => {
        console.log("res");
        alert(response.data.data.userId + '님. 주문이 접수되었습니다.');
        dispatch(OrderSuccess());
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch(OrderFailure(error));
      });
  };
};
export const requestQna =(data)=>{
  return (dispatch) => {
    console.log(data);
    return axios
      .post('/api/v1/myinfo/qna', data)
      .then(() => {
        alert('문의 사항이 접수되었습니다.');
        dispatch(QASuccess());
      })
      .catch((error) => {
        alert(error);
        dispatch(QAFailure(error));
      });
  };
}
export const requestReport =(data)=>{
  return (dispatch) => {
    console.log(data);
    return axios
      .post('/api/v1/myinfo/report', data)
      .then(() => {
        alert('신고 사항이 접수되었습니다.');
        dispatch(ReportSuccess());
      })
      .catch((error) => {
        alert(error);
        dispatch(ReportFailure(error));
      });
  };
}
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

export const OrderSuccess = () => {
  return {
    type: ORDER_SUCCESS,
  };
};

export const OrderFailure = () => {
  return {
    type: ORDER_FAIL,
  };
};

export const QASuccess = () => {
  return {
    type: QA_SUCCESS,
  };
};

export const QAFailure = () => {
  return {
    type: QA_FAIL,
  };
};

export const ReportSuccess=()=>{
  return{
    type: REPORT_SUCCESS
  };
};

export const ReportFailure = () => {
  return {
    type: REPORT_FAIL,
  };
};