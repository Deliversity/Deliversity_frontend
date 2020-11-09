import React, {Component} from 'react';
import {Alert, View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {Container, Content, List, Text} from 'native-base';
import ChatList from '../components/ChatList';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
class ChatHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [
        {id: '30', pw: 'e9e202c30d4a5598772d59738d3f7e2ade91343ba0a3742fc7'},
        {id: 'test2', pw: 'test2'},
      ],
      userId:'',
      password: '',
      backColor: '',
    };

  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      userId:articleData.id,
      password: articleData.pw,
    });
    console.log("articleData");
    console.log(articleData);
    this.props.navigation.navigate('Chat',{
      userId:articleData.id,
      password: articleData.pw
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
        dataArray={this.state.data}
        renderRow={(item) => {
          console.log("item")
          console.log(item)
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

export default ChatHomeScreen;
