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
import {RNS3} from 'react-native-aws3/src/RNS3';

class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
    };
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
          console.log('response: ' + response);
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
          <Text style={styles.text_header}>MyPage</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              this.onClickPicture();
            }}>
            <ImageBackground
              source={{uri: this.state.imageSrc}}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}
            />
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
    backgroundColor: '#ffd700',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  token: state,
});
const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
