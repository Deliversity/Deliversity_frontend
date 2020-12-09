import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import axios from '../axiosConfig';
import FindId from '../components/FindId';
import FindPassword from '../components/FindPassword';
class FindAssign extends Component {
  static navigationOptions = {
    title: 'FindAssign',
  };
  constructor(props) {
    super(props);
    //     this.sendMark = this.sendMark.bind(this);
    this.state = {
      Id: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.v1}>
          <View style={styles.View}>
            <TouchableOpacity
              style={
                (styles.aftbut, this.state.Id ? styles.aftbut : styles.befbut)
              }
              onPress={() => {
                this.setState({Id: true});
              }}>
              <Text
                style={
                  (styles.textbef,
                  this.state.Id ? styles.textbef : styles.textaft)
                }>
                아이디 찾기
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.View}>
            <TouchableOpacity
              style={
                (styles.aftbut, !this.state.Id ? styles.aftbut : styles.befbut)
              }
              onPress={() => {
                this.setState({Id: false});
              }}>
              <Text
                style={
                  (styles.textbef,
                  !this.state.Id ? styles.textbef : styles.textaft)
                }>
                비밀번호 찾기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          {this.state.Id ? <FindId /> : <FindPassword />}
        </View>
      </View>
    );
  }
}

export default FindAssign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 0.25,
  },
  v1: {
    flexDirection: 'row',
    flex: 1,
    //alignItems:'center',
    //justifyContent:'center'
  },
  befbut: {
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#53565A',
  },
  aftbut: {
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#AD5389',
  },
  textbef: {
    margin: 5,
    color: '#AD5389',
  },
  textaft: {
    margin: 5,
    color: '#53565A',
  },
  footer: {
    flex: 7,
  },
  View: {
    flex: 1,
  },
});
