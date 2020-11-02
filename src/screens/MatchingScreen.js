import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import axios from '../axiosConfig';
class MatchingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>매칭페이지입니다</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default MatchingScreen;
