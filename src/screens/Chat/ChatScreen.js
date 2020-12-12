import React, {useState, useEffect} from 'react';
import {GiftedChat, Actions, ActionsProps} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid';
import logo from '../../../assets/logo_colorD.png';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {currentRelation} from '../../store/actions/action';
import {connect} from 'react-redux';
import {AWS_ACCESSKEY, AWS_SECRETKEY} from '../../../env/development';
import {RNS3} from 'react-native-aws3/src/RNS3';
import * as io from 'socket.io-client';
import {Alert} from 'react-native';
let db;
db = SQLite.openDatabase({
  name: 'sqlite.db',
  createFromLocation: 1,
});
ChatScreen.navigationOptions = {
  tabBarVisible: false,
};
let socket;
let id;
function ChatScreen(props) {
  //navigation.setOptions({tabBarVisible: false});
  let [messages, setMessages] = useState();
  let [avatar, setAvatar] = useState('logo');
  let [ownerId,setOwnerId] = useState('')
  useEffect(() => {
    socket = io.connect('ws://deliversity.co.kr:81', {
      transports: ['websocket', 'polling'],
    });
    //이전 메시지 받아오기
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM riderRoom where room_id=?',
        [props.route.params.room_id],
        (tx, results) => {
          if(results.rows.length >=1){
            setOwnerId(results.rows.item(0).owner_id);
            id=results.rows.item(0).owner_id;
            props.currentRelation(
              results.rows.item(0).owner_id,
              results.rows.item(0).guest_id,
              results.rows.item(0).order_id,
            );
          }
          else{
            tx.executeSql(
              'SELECT * FROM consumerRoom where room_id=?',
              [props.route.params.room_id],
              (tx, results) => {
                setOwnerId(results.rows.item(0).owner_id);
                id=results.rows.item(0).owner_id;
                props.currentRelation(
                  results.rows.item(0).owner_id,
                  results.rows.item(0).guest_id,
                  results.rows.item(0).order_id,
                );
            })
          }
        })
    });
    
    socket.emit('cnt', props.route.params.room_id);
    console.log(props.route.params.room_id);

    socket.on('pong', function (data) {
      Alert.alert('Received Pong: ', data);
    });

    socket.on('rChat', (newMessage) => {
      let newMessaged = newMessage;
      newMessaged[0].user.avatar = logo;
      setMessages((previous) => GiftedChat.append(previous, newMessaged));
      onSendDB(newMessage);
    });
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
                  image: results.rows.item(i).image,
                  messageType: results.rows.item(i).messageType,
                  user: {
                    _id: results.rows.item(i).sender_id,
                    roomId: results.rows.item(i).room_id,
                    avatar: logo,
                  },
                };
                helpArray.push(text);
              }
              setMessages((previous) => GiftedChat.append(previous, helpArray));
            }
          },
        );
      });
    }
    return () => {
      socket.emit('dscnt', props.route.params.room_id);
      socket.disconnect();
    };
  }, []);
  function handlePickImage() {
    ImagePicker.showImagePicker({}, (response) => {
      let file = {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      };
      console.log(file);
      const config = {
        keyPrefix: 'Identification/',
        bucket: 'deliversity',
        region: 'ap-northeast-2',
        accessKey: AWS_ACCESSKEY,
        secretKey: AWS_SECRETKEY,
        successActionStatus: 201,
      };
      RNS3.put(file, config)
        .then((response) => {
          let helpArray = [];
          const message = {};
          message._id = uuid.v4();
          message.createdAt = new Date();
          message.user = {
            _id: props.route.params.owner_id,
            roomId: props.route.params.room_id,
          };
          message.image = response.headers.Location;
          message.messageType = 'image';
          helpArray.push(message);
          onSend(helpArray);
        })
        .catch(function (error) {
          alert(error.response.data.message);
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          // ADD THIS THROW error
          throw error;
        });
    });
  }
  function renderActions(props: Readonly<ActionsProps>) {
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: handlePickImage,
        }}
        icon={() => <Icon name="perm-media" color="#f4da6c" size={25} />}
        onSend={(args) => console.log(args)}
      />
    );
  }
  function onSend(newMessage = []) {
    socket.emit('chat', newMessage);
    console.log(ownerId)
    setMessages(GiftedChat.append(messages, newMessage));
    onSendDB(newMessage);
  }
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
    let image = newMessage[0].image;
    let messageType = newMessage[0].messageType;
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO message (text_id, room_id, sender_id, createdAt, text, image, messageType) VALUES (?,?,?,?,?,?,?)',
        [textId, roomId, senderId, createdAt, text, image, messageType],
        (tx, results) => {
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
      user={{
        _id: ownerId,
        roomId: props.route.params.room_id,
      }}
      onSend={(newMessage) => onSend(newMessage)}
      renderActions={renderActions}
      //renderComposer={renderComposer}
    />
  );
}
const mapStateToProps = (state) => ({
  user: state.authentication.user,
});
const mapDispatchToProps = (dispatch) => ({
  currentRelation: (owner, guest, orderNum) =>
    dispatch(currentRelation(owner, guest, orderNum)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
