import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {requestLogout} from '../store/actions/action';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {AWS_ACCESSKEY, AWS_SECRETKEY} from '../../env/development';
import LevelupModal from '../components/LevelupModal';
import {RNS3} from 'react-native-aws3/src/RNS3';
import firebase from 'react-native-firebase';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
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
          <Text style={styles.textSize}>
            {this.props.name}님은 {this.state.userGrade}입니다.
          </Text>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              this.onClickLevelUp();
            }}>
            <Text style={styles.textSize}>등업 신청</Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'center'}}>
            <LevelupModal
              showModal={this.state.setModalVisible}
              onClose={this.handleModalClose}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onClickLogout();
            }}>
            <Text style={styles.textSize}>🔐 LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
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
    paddingVertical: 30,
    paddingHorizontal: 20,
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
