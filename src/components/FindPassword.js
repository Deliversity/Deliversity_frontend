import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from '../axiosConfig';

class FindPassword extends Component {
  static navigationOptions = {
    title: 'FindAssign',
  };
  constructor(props) {
    super(props);
//     this.sendMark = this.sendMark.bind(this);
    this.state = {
      
    };
}

  
    render() {
        return(
            <View>
                <Text>Password</Text>
            </View>
        );
    }
}

export default FindPassword;

const style = StyleSheet.create({
  container: {
    flex: 2,
  },
});
