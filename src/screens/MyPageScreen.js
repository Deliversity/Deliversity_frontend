import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Container, Right, Body, Button, Text} from 'native-base';
import {requestLogout} from '../store/actions/action';
import {connect} from 'react-redux';
import LevelupModal from '../components/LevelupModal';
import firebase from 'react-native-firebase';
import axios from '../axiosConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGrade: '',
      setModalVisible: false,
      point: '',
    };
    console.log(props.grade);
    if (props.grade == 0) {
      this.state.userGrade = '준회원';
    } else {
      this.state.userGrade = '정회원';
    }
    this.getMyPoint();
  }
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
  onClickLevelUp = () => {
    this.setState({
      setModalVisible: true,
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
            <Text style={styles.pointTitle}>잔여 포인트 🌱</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.imageSubTitle}>{this.state.point} 점</Text>
              <View style={{flexDirection: 'row'}}>
                <Button rounded success style={{marginRight: 5}}>
                  <Text style={{color: '#fff'}}>충전</Text>
                </Button>
                <Button rounded success>
                  <Text style={{color: '#fff'}}>환급</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
    paddingVertical: 20,
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
