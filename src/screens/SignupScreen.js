import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from '../axiosConfig';
import {requestSignup} from '../store/actions/action';
class Signup extends Component {
  static navigationOptions = {
    title: 'Signup',
  };
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      name: '',
      email: '',
      nickName: '',
      age: '',
      phone: '',
      modalVisible: false,
      googleOAuth: ''
    };
  }

  setModalVisible = (visible) => {
    this.state.modalVisible = visible;
    this.setState({modalVisible: visible});
  };
  onClickSMS = async () => {
    const data = {
      phone: this.state.phone,
    };
    console.log(data);
    await axios
      .post('api/v1/auth/sms', data)
      .then(() => {
        this.setModalVisible(true);
      })
      .catch((err) => {
        alert("CAN'T send message : " + err);
      });
  };

  onClickNum = async () => {
    const data = {
      phone: this.state.phone,
      verify: this.state.verify,
    };
    console.log(data);
    await axios
      .post('/api/v1/auth/sms/verification', data)
      .then(() => {
        this.setModalVisible(false);
        alert('Success');
      })
      .catch((err) => {
        alert('This is not 인증번호: ' + err);
      });
  };

  onClickEmail = async () => {
    const data = {
      email: this.state.email,
    };
    await axios
      .post('/api/v1/auth/email', data)
      .then(() => {
        alert('Success to send mail');
      })
      .catch((err) => {
        alert('sendEmail Failed: ' + err);
      });
  };

  onClickSign = async () => {
    try {

      const data = {
        id: this.state.id,
        pw: this.state.pw,
        name: this.state.name,
        email: this.state.email,
        nickName: this.state.nickName,
        age: this.state.age,
        phone: this.state.phone
      };
      await axios
            .post('/api/v1/auth/signup', data)
            .then((response) => {
              alert(response.data.data.name + '님. 환영합니다.');
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
      
      this.props.navigation.goBack(null);
    } catch (e) {
      alert('error' + e);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Signup!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>ID</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="ID"
              style={styles.textInput}
              value={this.state.id}
              onChangeText={(text) => this.setState({id: text})}
            />
          </View>

          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="PW"
              style={styles.textInput}
              value={this.state.pw}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({pw: text})}
            />
          </View>

          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              value={this.state.name}
              onChangeText={(text) => this.setState({name: text})}
            />
          </View>
          <Text style={styles.text_footer}>Phone</Text>

          <View style={styles.action}>
            <TextInput
              placeholder="phone"
              style={styles.textInput}
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => {
                this.onClickSMS();
              }}>
              <Text style={styles.buttonTitle}>인증 번호 받기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.text_footer}>인증 번호 입력</Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="num"
                      style={styles.textInput}
                      value={this.state.num}
                      onChangeText={(text) => this.setState({verify: text})}
                    />
                  </View>

                  <View style={styles.buttonArea}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        this.onClickNum();
                      }}>
                      <Text style={styles.buttonTitle}>인증하기</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.buttonTitle}>이전으로</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              value={this.state.email}
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>

          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => {
                this.onClickEmail();
              }}>
              <Text style={styles.buttonTitle}>인증 링크받기</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.text_footer}>NickName</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="NickName"
              style={styles.textInput}
              value={this.state.nickName}
              onChangeText={(text) => this.setState({nickName: text})}
            />
          </View>

          <Text style={styles.text_footer}>Age</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Age"
              style={styles.textInput}
              value={this.state.age}
              onChangeText={(text) => this.setState({age: text})}
            />
          </View>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onClickSign();
            }}>
            <Text style={styles.buttonMini}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  requestSignup: (data) => dispatch(requestSignup(data)),
});
export default connect(null, mapDispatchToProps)(Signup);

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
  text_footer2: {
    color: '#ff7f50',
    fontSize: 15,
    margin: 0.5,
  },
  text_opt: {
    flex: 0.5,
    color: 'black',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
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
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  buttonArea: {
    width: '100%',
    height: 40,
    marginBottom: 7,
    
  },
  buttonArea2: {
    width: '100%',
    height: 40,
    marginTop: 1,
  },
  button: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    padding: 5,
    elevation: 2,
  },
  button2: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  button3: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
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
  buttonMini: {
    color: 'white',
    height: '70%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
