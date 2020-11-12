import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, Message} from 'react-native-gifted-chat';
import uuid from 'uuid';
import logo from '../../assets/logo_colorD.png';
import * as socketio from 'socket.io-client';
const socket = socketio.connect('http://deliversity.co.kr:81/api/v1/chat/io', {
  transports: ['websocket'],
});
import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
  name: 'sqlite.db',
  createFromLocation: 1,
});
ChatScreen.navigationOptions = {
  tabBarVisible: false,
};
export default function ChatScreen(props) {
  //navigation.setOptions({tabBarVisible: false});
  let [messages, setMessages] = useState([]);
  useEffect(() => {
    //이전 메시지 받아오기
    console.log('here');
    if (messages !== null) {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM message where room_id=?',
          [props.route.params.room_id],
          (tx, results) => {
            let length = results.rows.length;
            if (length > 0) {
              let helpArray = [];
              console.log('success');
              for (let i = results.rows.length - 1; i >= 0; i--) {
                let text = {
                  _id: results.rows.item(i).text_id,
                  createdAt: results.rows.item(i).createdAt,
                  text: results.rows.item(i).text,
                  user: {
                    _id: results.rows.item(i).sender_id,
                    roomId: results.rows.item(i).room_id,
                    avatar: logo,
                  },
                };
                helpArray.push(text);
              }
              console.log(helpArray);
              setMessages(GiftedChat.append(messages, helpArray));
            }
          },
        );
      });
    }
  }, []);

  socket.on('rChat', (newMessage) => {
    let newMessaged = newMessage;
    newMessaged[0]._id = uuid.v4();
    newMessaged[0].user.avatar = logo;
    setMessages(GiftedChat.append(messages, newMessaged));
    onSendDB(newMessaged);
  });
  const onSend = (newMessage = []) => {
    let newMessaged = newMessage;
    //newMessaged[0]._id = uuid.v4();
    newMessaged[0].createdAt = new Date();
    setMessages(GiftedChat.append(messages, newMessaged));
    socket.emit('chat', newMessaged);
    onSendDB(newMessaged);
  };
  const onSendDB = (newMessage) => {
    let beforeTime = new Date();
    let month = beforeTime.getMonth() + 1;
    let time =
      beforeTime.getFullYear() +
      '-' +
      month +
      '-' +
      beforeTime.getDate() +
      ' ' +
      beforeTime.getHours() +
      ':' +
      beforeTime.getMinutes() +
      ':' +
      beforeTime.getSeconds();
    let textId = newMessage[0]._id;
    let createdAt = time;
    let text = newMessage[0].text;
    let senderId = newMessage[0].user._id;
    let roomId = newMessage[0].user.roomId;
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO message (text_id, room_id, sender_id, createdAt, text) VALUES (?,?,?,?,?)',
        [textId, roomId, senderId, createdAt, text],
        (tx, results) => {
          console.log(results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('success');
          } else {
            console.log('fail');
          }
        },
      );
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => onSend(newMessage)}
      user={{
        _id: props.route.params.owner_id,
        roomId: props.route.params.room_id,
      }}
    />
  );
}
