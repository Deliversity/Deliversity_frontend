import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'chatDB.db'});
const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user', [], (tx, results) => {
        var len = results.rows.length;
        console.log('len', len);
        if (len > 0) {
          setUserData(results.rows.item(0));
        } else {
          alert('No user found');
        }
      });
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Enter User Id"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <TouchableOpacity
            onPress={() => {
              searchUser();
            }}>
            <Text>HELLO</Text>
          </TouchableOpacity>
          <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
            <Text>User Id: {userData.id}</Text>
            <Text>User Name: {userData.nickName}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
