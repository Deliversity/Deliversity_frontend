import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'native-base';
import {connect} from 'react-redux';
import axios from '../axiosConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
class PaymentScreen extends Component {
  static navigationOptions = {
    title: 'Payment',
  };
  constructor(props) {
    super(props);
    this.state = {
      owner: this.props.owner,
      guest: this.props.guest,
      user: this.props.user,
      name: this.props.name,
      orderNum: this.props.orderNum,
      point: '',
      requestCost: '',
      totalCost: '',
      extraFee: '',
      deliveryFee: '',
      cost: '',
    };
    this.getMyPoint();
    this.getTotalFee();
  }
  getMyPoint = () => {
    axios
      .get('/api/v1/point')
      .then((res) => {
        this.setState({point: res.data.data.point});
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  getTotalFee = () => {
    console.log(this.state.orderNum);
    axios
      .get(`/api/v1/order/price?orderId=${this.state.orderNum}`)
      .then((res) => {
        this.setState({
          totalCost: res.data.data.totalCost,
          extraFee: res.data.data.extraFee,
          deliveryFee: res.data.data.deliveryFee,
          cost: res.data.data.cost,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  onClickSubmitCost = () => {
    const data = {
      cost: this.state.requestCost,
    };
    axios
      .post(`/api/v1/order/price?orderId=${this.state.orderNum}`, data)
      .then((res) => {
        alert('주문자에게 전달되었습니다.');
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  onClickSendCost = () => {
    const data = {
      price: this.state.totalCost,
      riderId: this.state.guest
    };
    axios
      .post(`/api/v1/order/pay?orderId=${this.state.orderNum}`, data)
      .then((res) => {
        alert('배달원에게 전달되었습니다.');
        this.getMyPoint();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13}}>
            <Text style={styles.imageTitle}>{this.state.name}님의 잔여 포인트 🌱</Text>
            <Icon name="refresh" size={30} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.imageSubTitle}>{this.state.point} 점</Text>
            <Button rounded success>
              <Text style={{color: '#fff'}}>충전</Text>
            </Button>
          </View>
        </View>
        {this.props.user === '배달원' ? (
          <View style={styles.box}>
            <Text style={styles.imageTitle}>결제한 가격 보내기</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput value="총" editable={false} style={{color: 'black'}} />
              <TextInput
                placeholder="3300"
                underlineColorAndroid="gray"
                value={this.state.requestCost}
                onChangeText={(text) => this.setState({requestCost: text})}
              />
              <TextInput
                value=" 원 입니다."
                editable={false}
                style={{color: 'black'}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onClickSubmitCost();
              }}>
              <Text style={styles.panelButtonTitle}>주문자에게 전달</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.box}>
            <Text style={styles.imageTitle}>배달원에게 돈 보내기</Text>
            <Text style={styles.imageUserTitle}>
              거리 배달비 + 추가 배달비 + 주문 금액을 합한 금액입니다.
            </Text>
            <Text style={styles.imageCostTitle}>거리 배달비: {this.state.deliveryFee}원</Text>
            <Text style={styles.imageCostTitle}>추가 배달비: {this.state.extraFee}원</Text>
            <Text style={styles.imageCostTitle}>주문 금액: {this.state.cost}원</Text>
            <View style={styles.rightBox}>
              <Text style={styles.imageTitle}>총 {this.state.totalCost} point</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onClickSendCost();
              }}>
              <Text style={styles.panelButtonTitle}>배달원에게 전달</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  imageSubTitle: {
    marginTop: 5,
    fontSize: 15,
    color: 'green',
  },
  imageCostTitle: {
    marginTop: 5,
    fontSize: 15,
  },
  reservationBox: {
    backgroundColor: '#ff7f50',
    marginLeft: 6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 7,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bookingStyle2: {
    fontSize: 13,
    color: '#fff',
  },
  panelButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#8fbc8f',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    textAlign: 'center',
    marginTop: 10,
  },
  imageUserTitle: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  rightBox: {
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
const mapStateToProps = (state) => ({
  token: state.authentication.token,
  user: state.authentication.user,
  owner: state.authentication.owner,
  guest: state.authentication.guest,
  name: state.authentication.name,
  orderNum: state.authentication.orderNum,
});
export default connect(mapStateToProps, {})(PaymentScreen);
