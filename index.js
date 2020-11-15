/**
 * @format
 */
import 'react-native-gesture-handler';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {getUserStorage} from './src/store/actions/action';
import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
  name: 'sqlite.db',
  createFromLocation: 1,
});
const onSendDB = async (orderId, roomId, userId, riderId) => {
  const result = await getUserStorage('id');
  if (result === riderId) {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO riderRoom (room_id, owner_id, guest_id, order_id) VALUES (?,?,?,?)',
        [roomId, riderId, userId, orderId],
        (tx, results) => {
          console.log(results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('이제 주문자와 채팅 할 수 있습니다.');
          }
        },
      );
    });
  }
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // storing the message with redux
  console.log('Message handled in the background!', remoteMessage);
  let message = remoteMessage.notification;
  if (remoteMessage.data.type === 'selected') {
    let orderId = remoteMessage.data.orderId;
    let roomId = remoteMessage.data.roomId;
    let userId = remoteMessage.data.userId;
    let riderId = remoteMessage.data.riderId;
    //채팅방 생성
    await onSendDB(orderId, roomId, userId, riderId);
  }
  // Alert.alert('A new FCM message arrived!', message);
});

AppRegistry.registerComponent(appName, () => App);
