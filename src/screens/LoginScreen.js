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
import {requestLogin} from '../store/actions/action';
import {connect} from 'react-redux';
import Signup from './SignupScreen';
import {GOOGLE_KEY} from '../../env/development';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId: GOOGLE_KEY,
});
class LoginScreen extends Component {
  constructor(props) {
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
    console.log(data);
    await this.props.requestLogin(data);
  };
  onClickOAuth = async () => {};
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
                this.onClickOAuth();
              }}>
              <Image
                source={require('../../assets/kakao_login.png')}
                style={{width: 200, height: 50}}
              />
            </TouchableOpacity>
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
    marginTop: 30,
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
