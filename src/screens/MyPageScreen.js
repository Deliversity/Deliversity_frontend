import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import {requestLogout} from '../store/actions/action';
import {connect} from 'react-redux';
import LevelupModal from '../components/LevelupModal';
import firebase from 'react-native-firebase';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGrade: '',
      setModalVisible: false,
    };
    console.log(props.grade);
    if (props.grade == 0) {
      this.state.userGrade = '준회원';
    } else {
      this.state.userGrade = '정회원';
    }
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
          <Text style={styles.textSize}>
            {this.props.name}님은 {this.state.userGrade}입니다!
          </Text>
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
