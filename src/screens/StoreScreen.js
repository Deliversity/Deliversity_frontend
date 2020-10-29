import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PostCode from '../components/PostCode';
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
      <View style={styles.container}>
        <PostCode />
        <Text>{this.state.category}</Text>
      </View>
    );
  }
}

export default StoreScreen;
const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffd700',
  },
});
