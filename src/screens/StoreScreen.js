import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/index';

class StoreScreen extends Component {
  static navigationOptions = {
    title: 'Store',
  };
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.route.params ? this.props.route.params.category : '',
    };
  }
  render() {
    return (
      <View>
        <Text>{this.state.category}</Text>
      </View>
    );
  }
}

export default StoreScreen;
