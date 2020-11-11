import React, {Component} from 'react';
import {Alert, View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {Container, Content, List, Text} from 'native-base';
import ChatList from '../components/ChatList';
import SQLite from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
let db;
class ChatHomeScreen extends Component {
  constructor(props) {
    super(props);
    db = SQLite.openDatabase({
      name: 'sqlite.db',
      createFromLocation: 1,
    });
    this.state = {
      isLoading: false,
      data: [],
      userId: '',
      password: '',
      backColor: '',
    };
    this.getRoomInfo();
  }
  getRoomInfo() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM room', [], (tx, results) => {
        let length = results.rows.length;
        console.log('len' + length);
        if (length > 0) {
          let helpArray = [];
          console.log('success');
          console.log(results.rows);
          for (let i = 0; i < results.rows.length; i++) {
            helpArray.push(results.rows.item(i));
          }
          this.setState({data: helpArray});
        }
      });
    });
  }
  handleItemDataOnPress = (articleData) => {
    let ownerId;
    let hostId;
    if (this.props.user === '배달원') {
      ownerId = articleData.sender_id;
      hostId = articleData.receiver_id;
    }
    if (this.props.user === '사용자') {
      ownerId = articleData.sender_id;
      hostId = articleData.receiver_id;
    }
    this.props.navigation.navigate('Chat', {
      room_id: articleData.room_id,
      sender_id: articleData.sender_id,
      receiver_id: articleData.receiver_id,
      order_id: articleData.order_id,
    });
  };

  render() {
    let view = this.state.isLoading ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <List
        keyExtractor={(item, index) => index.toString()}
        dataArray={this.state.data}
        renderRow={(item) => {
          return <ChatList onPress={this.handleItemDataOnPress} data={item} />;
        }}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>채팅</Text>
        </View>
        <View style={styles.footer}>{view}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4da6c',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
});
const mapStateToProps = (state) => ({
  user: state.authentication.user,
});
export default connect(mapStateToProps, {})(ChatHomeScreen);
