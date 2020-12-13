import React, {Component, Fragment} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
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
import {requestLogout} from '../../store/actions/action';
import {connect} from 'react-redux';
import LevelupModal from '../../components/LevelupModal';
import {RadioButton} from 'react-native-paper';
import firebase from 'react-native-firebase';
import axios from '../../axiosConfig';
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
      grade: '',
    };
  }
  componentDidMount(): void {
    this.getMyInfo();
    this.getMyPoint();
    if (this.props.grade === 2) {
      this.state.userGrade = '정회원';
    } else {
      this.state.userGrade = '준회원';
    }
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
    this.props.navigation.navigate('iamport', {
      chargeAmount: this.state.chargeAmount,
      buyerName: this.state.buyerName,
      buyerTel: this.state.buyerTel,
    });
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
  onClickLevelUp = () => {
    this.setState({
      setModalVisible: true,
    });
  };
  onClickCharge = async () => {
    console.log('충전');
    this.setState({
      setModal1Visible: true,
    });
  };
  handleReload = () => {
    this.getMyPoint();
    this.getMyInfo();
  };
  onClickRefund = async () => {
    console.log('환급');
    this.props.navigation.navigate('Refund');
  };
  onReleaseConfirm = async () => {
    await axios
      .delete('/api/v1/auth/release')
      .then((res) => {
        alert('계정이 탈퇴되었습니다.');
        this.props.requestLogout();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  onRelease = async () => {
    Alert.alert(
      '⚠',
      '계정을 탈퇴하시겠습니까? 계정을 탈퇴할 경우, 모든 정보(포인트 등)가 사라지게 됩니다.',
      [
        {
          text: '취소',
        },
        {
          text: '탈퇴',
          onPress: () => this.onReleaseConfirm(),
        },
      ],
      {cancelable: false},
    );
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
  getMyInfo = async () => {
    await axios
      .get('/api/v1/myinfo/')
      .then((res) => {
        this.setState({
          grade: res.data.data.grade,
          buyerName: res.data.data.name,
          buyerTel: res.data.data.phone,
        });
        console.log(res.data.data.grade);
        if (res.data.data.grade === 2) {
          this.setState({
            userGrade: '정회원',
          });
        } else {
          this.setState({
            userGrade: '준회원',
          });
        }
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
            {this.state.userGrade === '준회원' ? (
              <Button
                rounded
                warning
                style={{marginRight: 5}}
                onPress={() => {
                  this.onClickLevelUp();
                }}>
                <Text style={{color: '#fff'}}>등업 신청</Text>
              </Button>
            ) : null}
            <Button
              rounded
              warning
              style={{marginRight: 5}}
              onPress={() => {
                this.onClickLogout();
              }}>
              <Text style={{color: '#fff'}}>🔐 LOGOUT</Text>
            </Button>
          </View>
          <ScrollView />
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
          <ScrollView>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.imageTitle}>결제 내역 조회 하기</Text>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('PaymentBook');
                  }}>
                  <Icon name="chevron-right" size={30} />
                </Button>
              </View>
            </View>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.imageTitle}>환급 내역 조회 하기</Text>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('RefundBook');
                  }}>
                  <Icon name="chevron-right" size={30} />
                </Button>
              </View>
            </View>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.imageTitle}>리뷰 확인 하러 가기</Text>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('MyReview');
                  }}>
                  <Icon name="chevron-right" size={30} />
                </Button>
              </View>
            </View>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.imageTitle}>문의 접수 및 확인</Text>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('QAbook');
                  }}>
                  <Icon name="chevron-right" size={30} />
                </Button>
              </View>
            </View>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.imageTitle}>신고 접수 및 확인</Text>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('ReportBook');
                  }}>
                  <Icon name="chevron-right" size={30} />
                </Button>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.onRelease();
              }}>
              <Text style={{fontSize: 12, color: 'gray'}}>계정탈퇴</Text>
            </TouchableOpacity>
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
  button: {
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

const mapStateToProps = (state) => ({
  name: state.authentication.name,
  grade: state.authentication.grade,
});
const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
