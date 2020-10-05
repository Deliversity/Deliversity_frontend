import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
const LoginScreen = () => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>welcome!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your password"
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
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
    backgroundColor: "#009387",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
});
