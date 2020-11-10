//import libraries
import React, {Component} from 'react';
import {
  Dimensions,
  WebView,
  Modal,
  Share,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
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
const webViewHeight = Dimensions.get('window').height - 56;

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
    const {showModal} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        onRequestClose={this.handleClose}
        style={{justifyContent: 'space-between'}}>
        <Container
          style={{margin: 15, marginBottom: 0, backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: '#e9967a'}}>
            <Left>
              <Button onPress={this.handleClose} transparent>
                <Icon name="close" style={{color: 'white', fontSize: 20}} />
              </Button>
            </Left>
            <Body>
              <Title
                children="등업 신청"
                style={{color: 'white', textAlign: 'center'}}
              />
            </Body>
          </Header>
          <Content
            contentContainerStyle={{
              height: 200,
              backgroundColor: '#faf0e6',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                this.onClickPicture();
              }}>
              <Text style={styles.textSize}>📷 신분증 등록하세요.</Text>
            </TouchableOpacity>
            <ImageBackground
              source={{uri: this.state.imageSrc}}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}
            />
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
