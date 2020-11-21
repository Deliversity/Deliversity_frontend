import React, {Component, Fragment} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Right,
  Header,
  Content,
  Body,
  Left,
  Title,
  Button,
  Text,
} from 'native-base';
import {requestLogout} from '../store/actions/action';
import {connect} from 'react-redux';
import LevelupModal from '../components/LevelupModal';
import {RadioButton} from 'react-native-paper';
import RefundModal from '../components/RefundModal';
// import ChargeModal from '../components/ChargeModal';
import firebase from 'react-native-firebase';
import axios from '../axiosConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGrade: '',
      setModalVisible: false,
      setModal1Visible: false,
      setModal2Visible: false,
      point: '',
      buyerName: '',
      buyerTel: '',
      chargeAmount: '0',
      chargeNum: '0',
    };
    console.log(props.grade);
    if (props.grade == 0) {
      this.state.userGrade = '준회원';
    } else {
      this.state.userGrade = '정회원';
    }
    this.getMyPoint();
  }
  handleClose = () => {
    this.setState({setModal1Visible: false});
  };
  onClickPay = () => {
    this.handleModal1Close();
    console.log(this.state.chargeAmount);
    console.log(this.state.chargeNum);
    console.log(this.state.buyerName);
    console.log(this.state.buyerTel);
    /*
    결제 모듈 코드
    */
    this.props.navigation.navigate('iamport');
  };
  onClickLogout = async () => {
    alert('로그아웃 되었습니다.');
    firebase.messaging().deleteToken();
    await this.props.requestLogout();
  };
  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
    });
  };
  handleModal1Close = () => {
    this.setState({
      setModal1Visible: false,
    });
  };
  handleModal2Close = () => {
    this.setState({
      setModal2Visible: false,
    });
  };
  onClickLevelUp = () => {
    this.setState({
      setModalVisible: true,
    });
  };
  onClickCharge = async () => {
    // this.props.navigation.navigate('iamport', {
    //   buyerName: this.state.buyerName,
    //   buyerTel: this.state.buyerTel,
    // });
    console.log('충전');
    await axios
      .get('/api/v1/myinfo/')
      .then((res) => {
        this.setState({
          setModal1Visible: true,
          buyerName: res.data.data.name,
          buyerTel: res.data.data.phone,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  handleReload = () => {
    this.getMyPoint();
  };
  onClickRefund = async () => {
    console.log('환급');
    await axios
      /*
      back에 신청하는 API
      */
      .get('/api/v1/myinfo/')
      .then((res) => {
        this.setState({
          setModal2Visible: true,
          buyerName: res.data.data.name,
          buyerTel: res.data.data.phone,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  getMyPoint = async () => {
    await axios
      .get('/api/v1/point')
      .then((res) => {
        this.setState({point: res.data.data.point});
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>마이페이지</Text>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'flex-end',
            }}>
            <Button
              rounded
              warning
              style={{marginRight: 5}}
              onPress={() => {
                this.onClickLevelUp();
              }}>
              <Text style={{color: '#fff'}}>등업 신청</Text>
            </Button>
            <Button
              rounded
              warning
              onPress={() => {
                this.onClickLogout();
              }}>
              <Text style={{color: '#fff'}}>🔐 LOGOUT</Text>
            </Button>
          </View>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}>
              <Text style={styles.imageTitle}>{this.props.name}님</Text>
              <Text style={styles.imageUserTitle}>
                {this.state.userGrade} 등급
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.pointTitle}>잔여 포인트 🌱</Text>
              <Button transparent onPress={this.handleReload}>
                <Icon name="refresh" size={30} />
              </Button>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.imageSubTitle}>{this.state.point} 점</Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  rounded
                  success
                  style={{marginRight: 5}}
                  onPress={() => {
                    this.onClickCharge();
                  }}>
                  <Text style={{color: '#fff'}}>충전</Text>
                </Button>
                <Button
                  rounded
                  success
                  style={{marginRight: 5}}
                  onPress={() => {
                    this.onClickRefund();
                  }}>
                  <Text style={{color: '#fff'}}>환급</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.imageTitle}>리뷰 확인 하러 가기</Text>
              <Button transparent onPress={this.handleSelect}>
                <Icon name="chevron-right" size={30} />
              </Button>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <LevelupModal
              showModal={this.state.setModalVisible}
              onClose={this.handleModalClose}
            />
            <Modal
              animationType="fade"
              transparent
              visible={this.state.setModal1Visible}
              onRequestClose={this.handleClose}
              style={{justifyContent: 'space-between'}}>
              <Container style={{padding: 20, backgroundColor: '#fff'}}>
                <Header
                  style={{backgroundColor: '#f5f5f5', textAlign: 'center'}}>
                  <Left>
                    <Button onPress={this.handleClose} transparent>
                      <Icon
                        name="close"
                        style={{color: 'black', fontSize: 20}}
                      />
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
                    {/* </Fragment> */}
                    {/* ) : null} */}
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
            {/* <ChargeModal
              showModal={this.state.setModal1Visible}
              buyerName={this.state.buyerName}
              buyerTel={this.state.buyerTel}
              onClose={this.handleModal1Close}
            /> */}
            <RefundModal
              showModal={this.state.setModal2Visible}
              buyerName={this.state.buyerName}
              buyerTel={this.state.buyerTel}
              onClose={this.handleModal2Close}
            />
            <View style={styles.box}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.imageTitle}>문의사항</Text>
              <Button transparent onPress={() => {
                this.props.navigation.navigate('QApage');
              }}>
                <Icon name="chevron-right" size={30} />
              </Button>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.imageTitle}>신고하기</Text>
              <Button transparent onPress={() => {
                this.props.navigation.navigate('Report');
              }}>
                <Icon name="chevron-right" size={30} />
              </Button>
            </View>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
    marginTop: 10,
  },
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
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  box: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: '#F8F8FF',
  },
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  pointTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  imageSubTitle: {
    marginTop: 5,
    fontSize: 15,
    color: 'green',
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
  imageUserTitle: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  panelButtonTitle: {
    fontSize: 18,
    color: 'black',
    backgroundColor: '#fce06d',
    width: '120%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  moneyTitle: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
  },
});

const mapStateToProps = (state) => ({
  name: state.authentication.name,
  grade: state.authentication.grade,
  token: state.authentication.token,
});
const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
