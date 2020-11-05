import React, {Component} from 'react';
import {Alert, View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {Container, Content, List, Text} from 'native-base';
import ChatList from '../components/ChatList';

class ChatHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [
        {id: 'test1', pw: 'test1'},
        {id: 'test2', pw: 'test2'},
      ],
      chatId: '',
      backColor: '',
    };

  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      chatId: articleData.id,
    });
    //console.log(articleData);
    this.props.navigation.navigate('Chat');
  };

  // componentDidMount() {
  //   getArticles('business').then(
  //     (data) => {
  //       this.setState({
  //         isLoading: false,
  //         data: data,
  //       });
  //     },
  //     (error) => {
  //       Alert.alert('Error', 'Something went wrong!');
  //     },
  //   );
  // }

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
