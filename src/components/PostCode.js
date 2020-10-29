import React, {Component} from 'react';
import Postcode from 'react-native-daum-postcode';
import {Text, TouchableOpacity, View} from 'react-native';

class PostCode extends Component {
  static navigationOptions = {
    title: 'PostCode',
  };
  constructor(props) {
    super(props);
  }
  onClickSubmit = async (data) => {
    try {
      this.props.navigation.goBack(null);
      console.log(data);
    } catch (e) {
      alert('error' + e);
    }
  };
  render() {
    return (
      <Postcode
        jsOptions={{animated: true}}
        onSelected={(data) => this.onClickSubmit(JSON.stringify(data))}
      />
    );
  }
}

export default PostCode;
