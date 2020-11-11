import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Text,
  Button,
} from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import {TouchableOpacity} from 'react-native';
let db;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
    db = SQLite.openDatabase(
      {
        name: 'sqlite.db',
        createFromLocation: 1,
      },
      this.successToOpenDB,
      this.failToOpenDB,
    );
    this.successToOpenDB.bind(this);
  }
  successToOpenDB() {
    alert('success');
  }
  onClickShow() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM room', [], (tx, results) => {
        let length = results.rows.length;
        console.log('len' + length);
        if (length > 0) {
          let helpArray = [];
          console.log('success');
          for (let i = 0; i < results.rows.length; i++) {
            helpArray.push(results.rows.item(i));
          }
          console.log(helpArray);
          this.setState({usersList: helpArray});
        }
      });
    });
  }
  onClickShow2() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM message', [], (tx, results) => {
        let length = results.rows.length;
        console.log('len' + length);
        if (length > 0) {
          let helpArray = [];
          console.log('success');
          for (let i = 0; i < results.rows.length; i++) {
            helpArray.push(results.rows.item(i));
          }
          console.log(helpArray);
          this.setState({usersList: helpArray});
        }
      });
    });
  }
  onClickDelete() {
    let order = 2;
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM room where id=?', [order], (tx, results) => {
        let length = results.rows.length;
        console.log('len' + length);
        console.log(results.rowsAffected);
        if (results.rowsAffected > 0) {
          alert('success');
        }
      });
    });
  }
  onClickDelete2() {
    let order = 2;
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM message',
        [],
        (tx, results) => {
          let length = results.rows.length;
          console.log('len' + length);
          console.log(results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('success');
          } else {
            alert('false');
          }
        },
      );
    });
  }
  onClickOrder() {
    let room = '664e4b4a0f8f37dfc636f8296992e08b5639a2f539115e9a51';
    let sender = 20;
    let receive = 30;
    let order = 35;
    console.log(room);
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO room (room_id, sender_id, receiver_id, order_id) VALUES (?,?,?,?)',
        [room, sender, receive, order],
        (tx, results) => {
          console.log(results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('success');
          }
        },
      );
    });
  }
  failToOpenDB(err) {
    console.log(err);
  }
  render() {
    return (
      <Container>
        <Header noLeft>
          <Body>
            <Title>header</Title>
          </Body>
        </Header>
        <Content>
          <TouchableOpacity
            onPress={() => {
              this.onClickShow();
            }}>
            <Text>룸디비 확인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onClickOrder();
            }}>
            <Text>룸디비 추가하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onClickDelete();
            }}>
            <Text>룸디비 삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onClickShow2();
            }}>
            <Text>메시지디비 확인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onClickDelete2();
            }}>
            <Text>메시지디비 삭제하기</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
