import React, {Component, useState, useEffect, useCallback} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Message} from 'react-native-gifted-chat';
import logo from '../../assets/logo_colorD.png';
import * as socketio from "socket.io-client";
import {URL} from '../../env/development.json'

const socket = socketio.connect(`${URL}/api/v1/chat/io`,{transports:['websocket']});
console.log(`${URL}/api/v1/chat/io`)
export default class ChatScreen extends React.Component{


  
// export default function ChatScreen(props) {
  constructor(props){
    super(props);
    this.state={messages:[]};
    this.onSend = this.onSend.bind(this);
  }
  
  componentDidMount(){
    
    socket.on('rChat',newMessage=>{
      this.setState((previousState)=>{
        return {messages: GiftedChat.append(previousState.messages,newMessage)}
      }
    )
    })
  }

  onSend(newMessage = []){
    this.setState((previousState)=>{
      return {messages: GiftedChat.append(previousState.messages,newMessage)}
    }
    )
    socket.emit('chat', newMessage);
}

  render(){
  return (
    <GiftedChat
      messages={this.state.messages}
      onSend={this.onSend}
      user={{_id: this.props.route.params.userId,
        roomId: this.props.route.params.password}}
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