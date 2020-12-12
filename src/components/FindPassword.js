import React, {Component, PropTypes, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from '../axiosConfig';

class FindPassword extends Component {
  static navigationOptions = {
    title: 'FindAssign',
  };
  constructor(props) {
    super(props);
    //     this.sendMark = this.sendMark.bind(this);
    this.state = {
      userId: '',
      isAuth: false,
      emailModal: false,
      email: '',
      emailAddress: '',
      phoneNum: '',
      success: '',
      status: '',
      phoneModal: false,
      isResult: false,
      phone: '',
    };
  }

  findPw = async () => {
    const data = {
      userId: this.state.userId,
      success: this.state.success,
    };
    await axios
      .post('/api/v1/auth/findpw', data)
      .then(() => {
        alert('임시비밀번호가 발급되었습니다. 메일을 확인해주세요');
        this.setState({phoneModal: false, emailModal: false});
      })
      .catch((e) => {
        alert(e.response.message);
      });
  };
  emailVerify = async () => {
    const data = {
      email: this.state.emailAddress,
      verify: this.state.email,
    };
    await axios
      .post('/api/v1/auth/find/emailVeri', data)
      .then(() => {
        alert('인증되었습니다!');
        this.setState({success: 1, status: 1});
        this.findPw();
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };
  phoneVerify = async () => {
    const data = {
      phone: this.state.phoneNum,
      verify: this.state.phone,
    };
    await axios
      .post('/api/v1/auth/sms/verification', data)
      .then(() => {
        alert('인증되었습니다!');
        this.setState({success: 1, status: 1});
        this.findPw();
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };
  emailAuth = async () => {
    this.setState({emailModal: true});
    const data = {
      email: this.state.emailAddress,
    };
    console.log(this.state.emailAddress);
    await axios
      .post('/api/v1/auth/find/email', data)
      .then(() => {
        alert('인증 링크가 보내졌습니다.');
        this.setState({success: 1, status: 1});
        //this.getId();
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };
  phoneAuth = async () => {
    this.setState({phoneModal: true});
    const data = {
      phone: this.state.phoneNum,
    };
    console.log(this.state.phoneNum);
    await axios
      .post('/api/v1/auth/find/sms', data)
      .then(() => {
        alert('인증 번호가 보내졌습니다.');
        //this.getId();
      })
      .catch((err) => {
        console.log(err);
        alert('없는 메일입니다: ' + err.message);
      });
  };
  checkId = async () => {
    //아이디가 존재하는지 확인하는 API /auth/dupid
    console.log(this.state.userId);
    await axios
      .get(`/api/v1/auth/dupid?userId=${this.state.userId}`)
      .then((res) => {
        this.setState({isAuth: true});
        this.setState({emailAddress: res.data.data.email});
        this.setState({phoneNum: res.data.data.phone});
        alert('아이디 확인이 완료되었습니다.');
      })
      .catch((e) => {
        alert(e.response.message);
      });
    //TRUE면 이메일, 휴대폰으로 인증번호 전송
    //인증번호 맞게 입력하면, 임시비번 발급
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.butText}>아이디 입력</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({userId: text});
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.but} onPress={() => this.checkId()}>
            <Text style={styles.text}>아이디 확인</Text>
          </TouchableOpacity>
        </View>
        {this.state.isAuth === true ? (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.View}>
              <TouchableOpacity
                style={styles.authBut}
                onPress={() => this.emailAuth()}>
                <Text style={styles.text}>이메일 인증</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.View}>
              <TouchableOpacity
                style={styles.authBut}
                onPress={() => this.phoneAuth()}>
                <Text style={styles.text}>휴대폰 인증</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.emailModal}
          onRequestClose={() => {
            // eslint-disable-next-line no-undef
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.Main}>이메일 인증하기</Text>
              <View style={styles.email}>
                <Text style={styles.text1}>인증코드</Text>
                <TextInput
                  style={styles.inText}
                  onChangeText={(text) => this.setState({email: text})}
                />
                <TouchableOpacity
                  onPress={() => this.emailVerify()}
                  style={styles.emailBut}>
                  <Text style={styles.authText}>인증하기</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({emailModal: false})}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.phoneModal}
          onRequestClose={() => {
            // eslint-disable-next-line no-undef
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.Main}>핸드폰 인증하기</Text>
              <View style={styles.email}>
                <Text style={styles.text1}>인증코드</Text>
                <TextInput
                  style={styles.inText}
                  onChangeText={(text) => this.setState({phone: text})}
                />
                <TouchableOpacity
                  onPress={() => this.phoneVerify()}
                  style={styles.emailBut}>
                  <Text style={styles.authText}>인증하기</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({phoneModal: false})}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default FindPassword;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  butText: {
    marginLeft: 10,
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 50,
    backgroundColor: '#EAD3E2',
  },
  but: {
    alignItems: 'center',
    backgroundColor: '#AD5389',
    padding: 7,
    margin: 10,
  },
  text: {
    color: 'white',
  },
  View: {
    flex: 1,
  },
  authBut: {
    alignItems: 'center',
    backgroundColor: '#AD5389',
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'column',
  },
  emailBut: {
    backgroundColor: '#AD5389',
    padding: 5,
  },
  Main: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  email: {
    marginTop: 15,
    marginBottom: 10,
  },
  text1: {
    marginBottom: 5,
    color: '#AD5389',
  },
  inText: {
    marginBottom: 5,
    height: 40,
  },
  authText: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 15,
  },
  endBut: {
    backgroundColor: '#53565A',
    padding: 5,
  },
});
