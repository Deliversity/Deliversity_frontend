import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import axios from '../axiosConfig';
import StarRating from '../components/StarRating';
class OrderReviewScreen extends Component {
  static navigationOptions = {
    title: 'OrderReview',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      score: '',
      orderID: this.props.route.params ? this.props.route.params.orderID : '',
      riderID: this.props.route.params ? this.props.route.params.riderID : '',
    };
    this.getReview();
  }
  getReview = async () => {
    try {
      await axios
        .get(`/api/v1/order/review/wrote?orderId=${this.state.orderID}`)
        .then((res) => {
          this.setState({
            content: res.data.data,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (e) {
      alert('error' + e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <View style={styles.write}>
            <Text>{this.state.riderID}님에게 보낸 후기입니다:)</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFE4E1', //D3D3D3
              paddingVertical: 20,
            }}>
            <StarRating ratings={this.state.content.rating} />
            <View
              style={{
                borderTopWidth: 4,
                borderTopColor: '#ff7f50',
                width: '28%',
                borderTopRightRadius: 15,
                marginBottom: 5,
              }}
            />
            <Text>{this.state.content.content}</Text>
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
    marginBottom: 30,
  },
});

export default OrderReviewScreen;
