import React, {Component, useState, useEffect, useCallback} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Message} from 'react-native-gifted-chat';
import logo from '../../assets/logo_colorD.png';
import uuid from 'uuid';
import { Manager,io} from 'socket.io-client';
import {CHAT_URL} from '../../env/development.json';
import AsyncStorage from '@react-native-community/async-storage';

export default class ChatScreen extends React.Component {
  // export default function ChatScreen(props) {
  static navigationOptions = {
    title: 'ChatScreen',
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: this.props.route.params.userId,
      roomId: this.props.route.params.password,
    };
    this.userSet = this.userSet.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this.socket = new io(`${CHAT_URL}`, {transports:['websocket','polling']});
    this.socket.on('rChat', this.onReceivedMessage);
    // this.userSet();
  }
  componentDidMount(){
    this.userSet();
  }

  userSet() {
      console.log(`Room set to ${this.state.roomId}`);
      this.socket.emit('cnt', this.state.roomId);
  }

  onReceivedMessage(newMessage) {
    console.log("newMessage")
    console.log(newMessage)
    let newMessaged = newMessage;
    newMessaged[0]._id = uuid.v4();
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, newMessage),
      };
    });
  }

  onSend(newMessage = []) {
    this.socket.emit('chat', newMessage);
    console.log(newMessage)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, newMessage),
      };
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.state.userId,
          roomId: this.state.roomId,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
});
// export default ChatScreen;
