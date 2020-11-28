import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  requestLogin,
  socialLogin,
} from '../store/actions/action';
import {connect} from 'react-redux';
import Signup from './SignupScreen';
import {GOOGLE_KEY} from '../../env/development';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import axios from '../axiosConfig';

GoogleSignin.configure({
  webClientId: GOOGLE_KEY,
  offlineAccess: true,
});
class LoginScreen extends Component {
  constructor(props) {
    GoogleSignin.hasPlayServices();
    super(props);
    this.state = {
      id: '',
      pw: '',
    };
  }
  onClickLogin = async () => {
    const data = {
      id: this.state.id,
      pw: this.state.pw,
    };
    await this.props.requestLogin(data);
  };

  onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.signIn();
      let tokens = await GoogleSignin.getTokens();
      tokens.fcmToken = await firebase.messaging().getToken();
      console.log(tokens);
      axios
        .post('/api/v1/auth/login/google', tokens)
        .then((response) => {
          this.props.socialLogin(response);
        })
        .catch((error) => {
          alert(
            error.response.data.message +
              ' 구글 계정으로 회원가입을 진행합니다.',
          );
          this.props.navigation.navigate('Signup', {
            idToken: tokens.idToken,
          });
        });
    } catch (e) {
      console.log(e.message);
    }
  };
  onKakaoButtonPress = async () => {
    try {
      let result = await KakaoLogins.login();
      if (result) {
        const data = {
          accessToken: result.accessToken,
          fcmToken: await firebase.messaging().getToken(),
        };
        await axios
          .post('/api/v1/auth/login/kakao', data)
          .then((res) => {
            this.props.socialLogin(res);
          })
          .catch((error) => {
            alert(
              error.response.data.message +
                ' 카카오 계정으로 회원가입을 진행합니다.',
            );
            this.props.navigation.navigate('Signup', {
              accessToken: data.accessToken,
            });
          });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>welcome!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>ID</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your ID"
              style={styles.textInput}
              value={this.state.id}
              onChangeText={(text) => this.setState({id: text})}
            />
          </View>
          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your password"
              style={styles.textInput}
              secureTextEntry={true}
              value={this.state.pw}
              onChangeText={(text) => this.setState({pw: text})}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.onClickLogin();
              }}>
              <Text style={styles.buttonTitle}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <Text style={styles.buttonTitle}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOAuth}
              onPress={() => {
                this.onKakaoButtonPress();
              }}>
              <Image
                source={require('../../assets/kakao_login.png')}
                style={{width: 200, height: 50}}
              />
            </TouchableOpacity>
            <View style={styles.buttonOAuth}>
              <GoogleSigninButton
                style={{width: 200, height: 50}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                  this.onGoogleButtonPress();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state,
});
const mapDispatchToProps = (dispatch) => ({
  requestLogin: (data) => dispatch(requestLogin(data)),
  socialLogin: (data) => dispatch(socialLogin(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#ff7f50',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 7,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  buttonArea: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonOAuth: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    color: 'white',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
