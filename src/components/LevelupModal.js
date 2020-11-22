//import libraries
import React, {Component} from 'react';
import {View, Modal, StyleSheet, ImageBackground} from 'react-native';
import {
  Text,
  Container,
  Header,
  Content,
  Body,
  Left,
  Right,
  Title,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {AWS_ACCESSKEY, AWS_SECRETKEY} from '../../env/development';
import {RNS3} from 'react-native-aws3/src/RNS3';
import axios from '../axiosConfig';
// create a component
class LevelupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
    };
  }

  handleClose = () => {
    return this.props.onClose();
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
          console.log(response.body.postResponse.location);
          let data = {
            idCard: response.body.postResponse.location,
          };
          axios
            .post('/api/v1/myinfo/upload', data)
            .then((res) => {
              alert('사진 등록이 완료되었습니다.');
            })
            .catch((e) => {
              alert(e.response.data.message);
            });
        })
        .catch(function (error) {
          alert(error.response.data.message);
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
    const {showModal} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        onRequestClose={this.handleClose}
        style={{justifyContent: 'space-between'}}>
        <Container
          style={{margin: 20, marginBottom: 0, backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: '#f5f5f5', textAlign: 'center'}}>
            <Left>
              <Button onPress={this.handleClose} transparent>
                <Icon name="close" style={{color: 'black', fontSize: 20}} />
              </Button>
            </Left>
            <Body>
              <Title
                children="📷 신분증 등록하세요"
                style={{color: 'black', fontSize: 15}}
              />
            </Body>
          </Header>
          <Content
            contentContainerStyle={{
              height: 450,
              backgroundColor: '#f5f5f5',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={require('../../assets/dulicard.jpg')}
              style={{height: 200, width: 300}}
            />
            <Text style={{fontSize: 12, marginTop: 10, textAlign: 'center'}}>
              자신의 얼굴과 주민번호 앞 7자리만 보이도록 사진을 찍어주세요.
            </Text>
            <View style={{justifyContent: 'center'}}>
              <ImageBackground
                source={{uri: this.state.imageSrc}}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}
              />
              <Button
                bordered
                onPress={() => {
                  this.onClickPicture();
                }}>
                <Text>사진 업로드</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

//make this component available to the app
export default LevelupModal;
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    marginBottom: 10,
  },
});
