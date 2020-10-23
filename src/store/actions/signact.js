import AsyncStorage from '@react-native-community/async-storage';
import {SIGN, SIGN_SUCCESS, SIGN_FAIL, PHONE_SUCCESS, PHONE_FAIL} from './type';
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
        alert(response.data.data.User + '님. 환영합니다.');
        dispatch(signSuccess());
        dispatch(storeUserData(response.data));
      })
      .catch((error) => {
        alert('SIGN Failed : '   + error);
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

export const storeUserData = (response) => {
  return {
    type: SIGN,
    response,
  };
};

export const requestPhone=(data)=>{
  return ()=>{
    return axios.post('/api/v1/auth/sms', data)
    .then(()=>{
      alert("send phone num");
    })
    .catch((error) => {
      alert('PHONE NUM Failed : ' + error);
    });
  }
}


export const requestNum=(data)=>{
  return ()=>{
    return axios.post('/api/v1/auth/sms/verification', data)
    .then(()=>{
      alert('Success');
    })
    .catch((error) => {
      alert('PHONE NUM Failed : ' + error);
    });
  }
}

export const requestEmail=(data)=>{
  return ()=>{
    console.log(data);
    return axios.post('/api/v1/auth/email', data)
    .then(()=>{
      alert('Success');
    })
    .catch((error) => {
      alert('sendEmail Failed : ' + error);
    });
  }
}