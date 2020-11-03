import React, {Component, useState, useEffect, useCallback} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import logo from '../../assets/logo_colorD.png';

const ChatScreen = (props) => {
  // const navigationOptions = {
  //   title: 'Chat',
  // };
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    setMessage([
      {
        _id: 1,
        text: 'hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
          avatar: logo,
        },
      },
      {
        _id: 2,
        text: 'hello!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Chatbot',
          avatar: logo,
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessage((previousMessage) =>
      GiftedChat.append(previousMessage, messages),
    );
  }, []);
  const renderBubble = (props) => {
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
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{_id: 1}}
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
