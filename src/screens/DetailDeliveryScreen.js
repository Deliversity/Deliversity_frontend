import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {List, Text} from 'native-base';
import axios from '../axiosConfig';
import ReviewItem from '../components/ReviewItem';
class DetailDeliveryScreen extends Component {
  static navigationOptions = {
    title: 'DetailDelivery',
  };
  constructor(props) {
    super(props);
    this.state = {
      orderID: this.props.route.params ? this.props.route.params.orderID : '',
      orderInfo: '',
      reviewInfo: '',
      isDeal: false,
      hasReview: false,
      isReservation: false,
      reservationTime: '',
      extraFee: '',
    };
    this.getOrderInfo();
  }
  onClickOrder = async () => {
    const data = {
      extraFee: this.state.extraFee,
    };
    const orderID = Number(this.state.orderID);
    await axios
      .post(`/api/v1/order/apply?orderId=${orderID}`, data)
      .then((res) => {
        alert('배달 신청이 완료되었습니다.');
        this.props.navigation.popToTop();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  getOrderInfo = async () => {
    await axios
      .get(`/api/v1/order?orderId=${this.state.orderID}`)
      .then((res) => {
        let arr = res.data.data.expArrivalTime.split(' ')[1];
        let hour = arr.split(':')[0];
        let min = arr.split(':')[1];
        let time = hour + ':' + min;
        this.setState({
          orderInfo: res.data.data,
          reservationTime: time,
          isReservation: res.data.data.reservation,
        });
        this.getReviewInfo();
      });
    // console.log(data.data.data); /order/review/user expArrivalTime
  };
  getReviewInfo = async () => {
    await axios
      .get(
        `/api/v1/order/review/user?orderId=${this.state.orderInfo.id}&userId=${this.state.orderInfo.userId}`,
      )
      .then((res) => {
        this.setState({reviewInfo: res.data.data.reviews, hasReview: true});
      })
      .catch((e) => {});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.reviewBox}>
          <Text style={styles.imageTitle}>주문자님의 후기</Text>
          {this.state.hasReview === true ? (
            <List
              dataArray={this.state.reviewInfo}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => {
                return <ReviewItem data={item} />;
              }}
            />
          ) : (
            <Text>등록된 후기가 없습니다.</Text>
          )}
        </View>
        <View style={styles.box}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 19}}>
              {this.state.orderInfo.storeName}
            </Text>
            {this.state.isReservation === true ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignSelf: 'flex-end',
                }}>
                <View style={styles.reservationBox}>
                  <Text style={styles.bookingStyle}>예약</Text>
                </View>
                <Text style={styles.bookingStyle}>
                  {this.state.reservationTime}까지
                </Text>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 10,
            }}>
            {this.state.orderInfo.content}
          </Text>
          <Text>
            배달 장소: {this.state.orderInfo.address}{' '}
            {this.state.orderInfo.detailAddress}
          </Text>
          <Text>거리 배달비 : {this.state.orderInfo.deliveryFee}원</Text>
        </View>
        <View style={styles.radioaddbox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.imageTitle}>추가 배달비 제시</Text>
              <Text style={styles.imageSubTitle}>
                추가 배달비를 제시할 수 있습니다.
              </Text>
            </View>
            <RadioButton
              value="isDeal"
              status={this.state.isDeal === true ? 'checked' : 'unchecked'}
              onPress={() => this.setState({isDeal: !this.state.isDeal})}
            />
          </View>
          {this.state.isDeal === false ? null : (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="추가가격"
                placeholderTextColor="#e9967a"
                underlineColorAndroid="#e9967a"
                value={this.state.extraFee}
                style={{marginTop: 10, width: '50%'}}
                onChangeText={(text) => this.setState({extraFee: text})}
              />
              <TextInput
                value="won"
                editable={false}
                style={{color: 'black'}}
              />
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.onClickOrder();
            }}>
            <Text style={styles.panelButtonTitle}>신청하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
  },
  reviewBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
    height: 200,
  },
  radioaddbox: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    height: 130,
    backgroundColor: 'white',
  },
  imageSubTitle: {
    fontSize: 14,
  },
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#8fbc8f',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  bookingStyle: {
    fontSize: 15,
    color: '#ff7f50',
    paddingHorizontal: 5,
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#ff7f50',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default DetailDeliveryScreen;
