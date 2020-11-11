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
import axios from '../axiosConfig';
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.state = {
      orderInfo: '',
    };
  }
  handlePress = () => {
    const {order_id, room_id, owner_id, guest_id} = this.data;
    this.props.onPress({order_id, room_id, owner_id, guest_id});
  };
  render() {
    return (
      <ListItem thumbnail>
        <Left>
          <View style={styles.profile}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {this.data.order_id}
            </Text>
          </View>
        </Left>
        <Body>
          <TouchableOpacity onPress={this.handlePress}>
            <Text style={{fontSize: 13}}>
              {this.data.guest_id}번님과 채팅하기
            </Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}

export default ChatList;

const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ffd700',
  },
});
