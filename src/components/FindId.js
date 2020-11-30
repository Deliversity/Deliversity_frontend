import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from '../axiosConfig';

class FindId extends Component {
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
                <Text>this is id</Text>
            </View>
        );
    }
}

export default FindId;

const style = StyleSheet.create({
  container: {
    flex: 2,
  },
});
