import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Text} from 'native-base';
import {TextInput} from 'react-native-paper';
import axios from '../axiosConfig';
import Card from '../components/myReviewCard';
class MyReviewScreen extends Component {
  static navigationOptions = {
    title: 'MyReview',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      score: '',
      refreshing: false,
    };
    this.getReview();
  }
  onRefresh = async () => {
    await this.getReview();
  };
  getReview = async () => {
    try {
      this.setState({refreshing: true});
      await axios
        .get('/api/v1/myinfo/review/written')
        .then((res) => {
          this.setState({
            score: res.data.data.rating,
            content: res.data.data.reviews,
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
            <View>
              <Text>총 평점 : {this.state.score}점</Text>
            </View>
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
        <View />
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
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  write: {
    marginTop: 10,
  },
});

export default MyReviewScreen;
