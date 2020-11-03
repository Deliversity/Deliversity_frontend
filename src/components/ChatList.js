import React, {Component} from 'react';
import {
  ListItem,
  Right,
  Body,
  Text,
  Left,
  Thumbnail,
  Button,
} from 'native-base';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  handlePress = () => {
    const {id} = this.data;
    this.props.onPress({id});
  };

  render() {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            circle
            source={require('../../assets/logo_D.png')}
            style={{backgroundColor: '#add8e6'}}
          />
        </Left>
        <Body>
          <TouchableOpacity onPress={this.handlePress}>
            <Text numberOfLines={2}>{this.data.id}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 8,
                marginLeft: 0,
              }}>
              <Text note>{this.data.pw}</Text>
            </View>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}

export default ChatList;

const styles = StyleSheet.create({});
