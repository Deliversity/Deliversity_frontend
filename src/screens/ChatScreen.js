import React, {Component, useState, useEffect, useCallback} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Message} from 'react-native-gifted-chat';
import logo from '../../assets/logo_colorD.png';
import * as socketio from "socket.io-client";

const socket = socketio.connect('http://deliversity.co.kr/api/v1/chat/io',{transports:['websocket']});
// export default class ChatScreen extends React.Component{
//   // const navigationOptions = {
//   //   title: 'Chat',
//   // };
//   state={
//     messsges: [],
//     setMessages: []
//   }
const ChatScreen=(props)=> {
  const [messages, setMessages] = useState([]);

  // constructor(props){
  //   super(props);
  //   console.log(props.route.params.userId)
  //   socket.on('rchat',msg =>{
  //     setMessages(msg=>{
  //       GiftedChat.append(msg,messages);
  //     })
  //   })
  // }
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

const onSend=useCallback((messages = []) =>{
  console.log(messages)
  setMessages((previousMessage) =>{
    GiftedChat.append(previousMessage, messages)
    console.log(previousMessage)
    socket.emit('chat', previousMessage);
  })
},[]);

const renderBubble = (props)=>{
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          color: 'white',
          backgroundColor: '#8fbc8f',
        },
      }}
    />
  )};

return (
  <GiftedChat
    messages={messages}
    onSend={(messages) => onSend(messages)}
    user={{_id: props.route.params.userId,
          password:props.route.params.password}}
    renderBubble={renderBubble}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
});
export default ChatScreen;