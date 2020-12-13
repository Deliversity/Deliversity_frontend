import React, {Component, useState} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import axios from '../../axiosConfig';
import Card from '../../components/QAcard';
import {Button, Text} from 'native-base';
class QAbookScreen extends Component {
  static navigationOptions = {
    title: 'QAbook',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      refreshing: false,
    };
  }
  componentDidMount(): void {
    this.getQAList();
  }
  onRefresh = async () => {
    await this.getQAList();
  };
  getQAList = async () => {
    try {
      this.setState({refreshing: true});
      await axios
        .get('/api/v1/myinfo/qnas')
        .then((res) => {
          this.setState({
            content: res.data.data,
            refreshing: false,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (e) {
      alert('error' + e);
    }
  };
  renderItem = ({item}) => {
    return <Card itemData={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <View style={styles.write}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              extraData={this.state}
              data={this.state.content}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <Button
            rounded
            dark
            style={{marginRight: 15}}
            onPress={() => {
              this.props.navigation.navigate('QApage');
            }}>
            <Text style={{color: '#fff'}}>문의하러가기</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  write: {
    marginTop: 10,
  },
});

export default QAbookScreen;
