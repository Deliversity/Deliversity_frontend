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
import axios from '../axiosConfig';
import {RNS3} from 'react-native-aws3/src/RNS3';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
      userGrade: '',
    };
    props.grade
      ? (this.state.userGrade = '준회원')
      : (this.state.userGrade = '정회원');
  }
  onClickLogout = async () => {
    alert('로그아웃 되었습니다.');
    await this.props.requestLogout();
  };

  onClickPicture = async () => {
    ImagePicker.showImagePicker({}, (response) => {
      const file = {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      };
      console.log(file);
      const config = {
        keyPrefix: 'Identification/',
        bucket: 'deliversity',
        region: 'ap-northeast-2',
        accessKey: AWS_ACCESSKEY,
        secretKey: AWS_SECRETKEY,
        successActionStatus: 201,
      };
      this.setState({imageSrc: file.uri});
      RNS3.put(file, config)
        .then((response) => {
          alert('사진 등록이 완료되었습니다.');
          console.log(response.body.postResponse.location);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          // ADD THIS THROW error
          throw error;
        });
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
          <ImageBackground
            source={{uri: this.state.imageSrc}}
            style={{height: 100, width: 100}}
            imageStyle={{borderRadius: 15}}
          />
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              this.onClickPicture();
            }}>
            <Text style={styles.textSize}>📷 TAKE PICTURE</Text>
          </TouchableOpacity>
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
