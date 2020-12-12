/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './src/screens/MainTabScreen';
import {Provider} from 'react-redux';
import uuid from 'uuid';
import configureStore from './src/store/configureStore';
import messaging from '@react-native-firebase/messaging';
import {StyleSheet} from 'react-native';
import {getUserStorage} from './src/store/actions/action';
const Stack = createStackNavigator();
const store = configureStore();
import Toast from 'react-native-toast-message';
import SQLite from 'react-native-sqlite-storage';
import {navigate,navigationRef} from './navigator';
let db;
db = SQLite.openDatabase({
  name: 'sqlite.db',
  createFromLocation: 1,
});
var navigator = null;
const AppContainer = createAppContainer(Stack);
export default class App extends React.Component {
  static navigationOptions = {
    title: 'App',
  };

  constructor(props) {
    super(props);
    this.state = {
      initialRoute: 'App',
    };
  }
  onSendDB = async (orderId, roomId, userId, riderId) => {
    const result = await getUserStorage('id');
    if (result === riderId) {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO riderRoom (room_id, owner_id, guest_id, order_id) VALUES (?,?,?,?)',
          [roomId, riderId, userId, orderId],
          (tx, results) => {
            console.log(results.rowsAffected);
            if (results.rowsAffected > 0) {
              Toast.show({
                text1: '확인하세요!',
                text2: '이제 주문자와 채팅 할 수 있습니다 👋',
                visibilityTime: 4000,
                topOffset: 50,
              });
            }
          },
        );
      });
    }
  };

  rChatDB = (newMessage) => {
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
    let textId = uuid.v4();
    let createdAt = time;
    let text = newMessage.notification.body;
    let senderId = newMessage.data.senderId;
    let roomId = newMessage.data.roomId;
    let image = newMessage.data.image;
    let messageType = newMessage.data.messageType;
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

  componentDidMount() {
    (async () => await messaging().registerDeviceForRemoteMessages())();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      let message = remoteMessage.notification;
      if (remoteMessage.data.type === 'selected') {
        let orderId = remoteMessage.data.orderId;
        let roomId = remoteMessage.data.roomId;
        let userId = remoteMessage.data.userId;
        let riderId = remoteMessage.data.riderId;
        //채팅방 생성
        await this.onSendDB(orderId, roomId, userId, riderId);
      } else if (remoteMessage.data.type === 'newOrder') {
        Toast.show({
          text1: '새 배달건이 추가되었습니다 👋',
          text2: remoteMessage.notification.body,
          visibilityTime: 4000,
          topOffset: 20,
        });
      } else if (remoteMessage.data.type === 'Chat') {
        if (
        navigationRef.current &&
        navigationRef.current.getRootState() && 
        navigationRef.current.getRootState().routes[0].state &&
        navigationRef.current.getRootState().routes[0].state.routes[0].state &&
        navigationRef.current.getRootState().routes[0].state.routes[0].state.routes[2].state &&
        navigationRef.current.getRootState().routes[0].state.routes[0].state.routes[2].state.routes[1].params.room_id==remoteMessage.data.roomId){}
        else{
          this.rChatDB(remoteMessage);
          Toast.show({
            text1: remoteMessage.notification.title,
            text2: remoteMessage.notification.body,
            visibilityTime: 4000,
            topOffset: 20,
          });
        }
      }
      // Alert.alert('A new FCM message arrived!', remoteMessage.data.test);

      console.log('foreground', remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // Alert.alert('here from background tap');
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // this.props.navigation.navigate(remoteMessage.data.type);
      console.log(remoteMessage.data);
      console.log(navigator);
      setTimeout(remoteMessage=>{navigate(remoteMessage.data.type,null)},1000);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(remoteMessage); // always prints null
        if (remoteMessage) {
          // Alert.alert('here from quit tap');
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
            remoteMessage.data.type,
          );
          // this.setState('initialRoute',remoteMessage.data.type)
        }
      });

    return unsubscribe;
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Deliversity"
              component={MainTabScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
