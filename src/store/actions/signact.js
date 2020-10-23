import AsyncStorage from '@react-native-community/async-storage';
import {SIGN, SIGN_SUCCESS, SIGN_FAIL, PHONE_SUCCESS, PHONE_FAIL} from './type';
import axios from '../../axiosConfig';
export const requestSign = (data) => {
  return () => {
    return axios
      .post('/api/v1/auth/signup', data)
      .then((response) => {
        alert(response.data.data.User + '님. 환영합니다.');
      })
      .catch((error) => {
        alert('SIGN Failed : '   + error);
      });
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

export const checkEmail=()=>{
  return ()=>{
    return axios.get('/api/v1/auth/email/verification')
    .then(()=>{
      alert("Success");
    }).catch((err)=>{
      alert("Fail to check Email");
    })
  }
}
export const requestEmail=(data)=>{
  return ()=>{
    console.log(data);
    return axios.post('/api/v1/auth/email', data)
    .then(()=>{
      alert('Success to send mail');
      checkEmail();
    })
    .catch((error) => {
      alert('sendEmail Failed : ' + error);
    });
  }
}