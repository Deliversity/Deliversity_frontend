//import libraries
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Modal,
  StyleSheet,
  ImageBackground,
  TextInput,
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
import { AWS_ACCESSKEY, AWS_SECRETKEY } from '../../env/development';
import { RadioButton } from 'react-native-paper';
import { RNS3 } from 'react-native-aws3/src/RNS3';
import card from '../../assets/card.png';
// create a component
class ChargeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
      chargeAmount: '0',
      TenDollar: false,
      ThDollar: false,
      FifDollar: false,
      BySelf: false,
    };
  }

  handleClose = () => {
    return this.props.onClose();
  };

  onClickButton = async () => {
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
      this.setState({ imageSrc: file.uri });
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
    const { showModal } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        onRequestClose={this.handleClose}
        style={{ justifyContent: 'space-between' }}>
        <Container
          style={{ margin: 20, marginBottom: 290, backgroundColor: '#fff' }}>
          <Header style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
            <Left>
              <Button onPress={this.handleClose} transparent>
                <Icon name="close" style={{ color: 'black', fontSize: 20 }} />
              </Button>
            </Left>
            <Body>
              <Title
                children="💰 충전 금액을 선택하세요."
                style={{ color: 'black', fontSize: 15 }}
              />
            </Body>
          </Header>
          <Content
            contentContainerStyle={{
              height: 300,
              backgroundColor: '#f5f5f5',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.radioaddbox}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <RadioButton
                  value="TenDollar"
                  status={
                    this.state.TenDollar === true ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    this.setState({ TenDollar: !this.state.TenDollar })
                  }
                />
                <View>
                  <Text style={styles.imageTitle}>1만원</Text>
                </View>
              </View>
              {this.state.TenDollar === false ? null : (
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder="충전금액"
                    placeholderTextColor="#e9967a"
                    underlineColorAndroid="#e9967a"
                    value={this.state.extraFee}
                    style={{ marginTop: 10, width: '50%' }}
                    onChangeText={(text) => this.setState({ extraFee: text })}
                  />
                  <TextInput
                    value="만원"
                    editable={false}
                    style={{ color: 'black' }}
                  />
                </View>
              )}
            </View>

            <View style={styles.radioaddbox}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <RadioButton
                  value="BySelf"
                  status={this.state.BySelf === true ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ BySelf: !this.state.BySelf })}
                />
                <View>
                  <Text style={styles.imageTitle}>직접 입력</Text>
                </View>
              </View>
              {this.state.BySelf === false ? null : (
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder="충전금액"
                    placeholderTextColor="#e9967a"
                    underlineColorAndroid="#e9967a"
                    value={this.state.extraFee}
                    style={{ marginTop: 10, width: '50%' }}
                    onChangeText={(text) => this.setState({ extraFee: text })}
                  />
                  <TextInput
                    value="만원"
                    editable={false}
                    style={{ color: 'black' }}
                  />
                </View>
              )}
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

//make this component available to the app
export default ChargeModal;
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  radioaddbox: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    height: 130,
    backgroundColor: 'white',
  },
});
