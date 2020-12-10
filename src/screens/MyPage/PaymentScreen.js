import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Text,
  Button,
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
} from 'native-base';
import {connect} from 'react-redux';
import axios from '../../axiosConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-paper';
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
      setModalVisible: false,
      buyerName: '',
      buyerTel: '',
      chargeAmount: '',
      chargeNum: '',
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
      riderId: this.state.guest,
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
  handleClose = () => {
    this.setState({setModalVisible: false});
  };
  onClickCharge = async () => {
    console.log('충전');
    await axios
      .get('/api/v1/myinfo/')
      .then((res) => {
        this.setState({
          setModalVisible: true,
          buyerName: res.data.data.name,
          buyerTel: res.data.data.phone,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  onClickPay = () => {
    this.handleClose();
    console.log(this.state.chargeAmount);
    console.log(this.state.chargeNum);
    console.log(this.state.buyerName);
    console.log(this.state.buyerTel);
    /*
    결제 모듈 코드
    */
    this.props.navigation.navigate('iamport', {
      chargeAmount: this.state.chargeAmount,
      buyerName: this.state.buyerName,
      buyerTel: this.state.buyerTel,
    });
  };
  handleReload = () => {
    this.getMyPoint();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 13,
            }}>
            <Text style={styles.imageTitle}>
              {this.state.name}님의 잔여 포인트 🌱
            </Text>
            <Button transparent onPress={this.handleReload}>
              <Icon name="refresh" size={30} />
            </Button>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.imageSubTitle}>{this.state.point} 점</Text>
            <Button
              rounded
              success
              onPress={() => {
                this.onClickCharge();
              }}>
              <Text style={{color: '#fff'}}>충전</Text>
            </Button>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.setModalVisible}
            onRequestClose={this.handleClose}
            style={{justifyContent: 'space-between'}}>
            <Container style={{padding: 20, backgroundColor: '#fff'}}>
              <Header style={{backgroundColor: '#f5f5f5', textAlign: 'center'}}>
                <Left>
                  <Button onPress={this.handleClose} transparent>
                    <Icon name="close" style={{color: 'black', fontSize: 20}} />
                  </Button>
                </Left>
                <Body>
                  <Title
                    children="💰 충전 금액을 선택하세요."
                    style={{color: 'black', fontSize: 15}}
                  />
                </Body>
              </Header>
              <Content
                contentContainerStyle={{
                  height: 270,
                  backgroundColor: '#f5f5f5',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="chargeNum"
                    status={
                      this.state.chargeNum === 1 ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      this.setState({chargeNum: 1, chargeAmount: 10000})
                    }
                  />
                  <Text style={{...styles.moneyTitle, marginRight: 100}}>
                    {' '}
                    1 만원{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="chargeNum"
                    status={
                      this.state.chargeNum === 2 ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      this.setState({chargeNum: 2, chargeAmount: 30000})
                    }
                  />
                  <Text style={{...styles.moneyTitle, marginRight: 100}}>
                    {' '}
                    3 만원{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="chargeNum"
                    status={
                      this.state.chargeNum === 3 ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      this.setState({chargeNum: 3, chargeAmount: 50000})
                    }
                  />
                  <Text style={{...styles.moneyTitle, marginRight: 100}}>
                    {' '}
                    5 만원{' '}
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <RadioButton
                    value="chargeNum"
                    status={
                      this.state.chargeNum === 4 ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.setState({chargeNum: 4})}
                  />
                  <Text style={{...styles.moneyTitle, marginRight: 15}}>
                    {' '}
                    기타
                  </Text>
                  <TextInput
                    placeholder="충전금액"
                    placeholderTextColor="#919191"
                    underlineColorAndroid="#4f4f4f"
                    style={{...styles.moneyTitle, marginTop: -5}}
                    onChangeText={(text) =>
                      this.setState({chargeAmount: parseInt(text) * 10000})
                    }
                  />
                  <Text style={styles.moneyTitle}> 만원 </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onClickPay();
                    }}>
                    <Text style={{...styles.panelButtonTitle, marginTop: 30}}>
                      결제하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </Content>
            </Container>
          </Modal>
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
            <Text style={styles.imageCostTitle}>
              거리 배달비: {this.state.deliveryFee}원
            </Text>
            <Text style={styles.imageCostTitle}>
              추가 배달비: {this.state.extraFee}원
            </Text>
            <Text style={styles.imageCostTitle}>
              주문 금액: {this.state.cost}원
            </Text>
            <View style={styles.rightBox}>
              <Text style={styles.imageTitle}>
                총 {this.state.totalCost} point
              </Text>
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
  moneyTitle: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
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
