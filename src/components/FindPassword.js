import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    };
  }

  findPw = async () => {
    const data = {
      userId: this.state.userId,
    };
    await axios
      .post('/api/v1/auth/findpw', data)
      .then(() => {
        alert('임시비밀번호가 발급되었습니다. 메일을 확인해주세요');
      })
      .catch((e) => {
        alert('아이디가 존재하지 않습니다.');
      });
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
          <TouchableOpacity style={styles.but} onPress={() => this.findPw()}>
            <Text style={styles.text}>아이디 확인</Text>
          </TouchableOpacity>
        </View>
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
});
