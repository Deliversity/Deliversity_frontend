import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from '../axiosConfig';
import ReviewItem from '../components/ReviewItem';
import {List} from 'native-base';
class CourierReviewScreen extends Component {
  static navigationOptions = {
    title: 'CourierReview',
  };
  constructor(props) {
    super(props);
    this.state = {
      riderID: this.props.route.params ? this.props.route.params.riderID : '',
      orderID: this.props.route.params ? this.props.route.params.orderID : '',
      reviewInfo: '',
      data: [
        {id: 'test1', pw: 'test1'},
        {id: 'test2', pw: 'test2'},
      ],
    };
    this.getReviewInfo();
  }
  getReviewInfo = async () => {
    const data = await axios.get(
      `/api/v1/order/review/rider?riderId=${this.state.riderID}&orderId=${this.state.orderID}`,
    );
    this.setState({reviewInfo: data.data.data.reviews});
  };
  render() {
    return (
      <View style={styles.container}>
        <List
          dataArray={this.state.reviewInfo}
          keyExtractor={(item, index) => index.toString()}
          renderRow={(item) => {
            return <ReviewItem data={item} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourierReviewScreen;
