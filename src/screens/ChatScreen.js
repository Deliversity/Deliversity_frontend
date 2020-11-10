import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, Message} from 'react-native-gifted-chat';
import uuid from 'uuid';
import logo from '../../assets/logo_colorD.png';
import * as socketio from 'socket.io-client';
const socket = socketio.connect('http://deliversity.co.kr:81/api/v1/chat/io', {
  transports: ['websocket'],
});
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'chatDB.db'});

export default function ChatScreen(props) {
  //navigation.setOptions({tabBarVisible: false});
  let [messages, setMessages] = useState([]);
  let [userData, setUserData] = useState({});
  ChatScreen.navigationOptions = {
    tabBarVisible: false,
  };
  console.log(props.route.params.password);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user', [], (tx, results) => {
        var len = results.rows.length;
        console.log('len', len);
        if (len > 0) {
          setUserData(results.rows.item(0));
          console.log(results.rows.item(0).id);
          let memo = [
            {_id: '', createdAt: '', text: '', user: {_id: '', roomId: ''}},
          ];
          //let text=[{"_id": "6a1414ad-7271-4baa-ab33-d01a07132e28", "createdAt": "2020-11-09T16:33:48.283Z", "text": "seyeon", "user": {"_id": "20", "roomId": "e9e202c30d4a5598772d59738d3f7e2ade91343ba0a3742fc7"}}]
          //setMessages(GiftedChat.append(messages,text));
        } else {
          alert('No user found');
        }
      });
    });
  }, []);
  socket.on('rChat', (newMessage) => {
    let newMessaged = newMessage;
    newMessaged[0]._id = uuid.v4();
    setMessages(GiftedChat.append(messages, newMessaged));
  });
  const onSend = (newMessage = []) => {
    let newMessaged = newMessage;
    newMessaged[0]._id = uuid.v4();
    setMessages(GiftedChat.append(messages, newMessaged));
    socket.emit('chat', newMessage);
    console.log(newMessage);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => onSend(newMessage)}
      user={{
        _id: props.route.params.userId,
        roomId: props.route.params.password,
      }}
    />
  );
}
