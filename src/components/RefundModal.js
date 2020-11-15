//import libraries
import React, { Component, Fragment } from 'react';
import {
  Dimensions,
  View,
  Modal,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
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
class RefundModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: 'https://api.adorable.io/avatars/80/abott@adorable.png',
      chargeAmount: '0',
      chargeNum: '0',
    };
  }

  handleClose = () => {
    return this.props.onClose();
  };

  onClickPay = async () => {
    console.log(this.state.chargeAmount);
    console.log(this.state.chargeNum);
    console.log(this.props.buyerName);
    console.log(this.props.buyerTel);
    /*
    결제 모듈 코드
    */
  };

  render() {
    const { showModal } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={showModal}
        onRequestClose={this.handleClose}
        style={{ justifyContent: 'space-between' }}>
        <Container
          style={{ padding: 20, backgroundColor: '#fff', }}>
          <Header style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
            <Left>
              <Button onPress={this.handleClose} transparent>
                <Icon name="close" style={{ color: 'black', fontSize: 20 }} />
              </Button>
            </Left>
            <Body>
              <Title
                children="💰 환급 금액을 선택하세요."
                style={{ color: 'black', fontSize: 15 }}
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
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="chargeNum"
                status={this.state.chargeNum === 1 ? 'checked' : 'unchecked'}
                onPress={() =>
                  this.setState({ chargeNum: 1, chargeAmount: 10000 })
                }
              />
              <Text style={{ ...styles.moneyTitle, marginRight: 100 }}> 1 만원 </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="chargeNum"
                status={this.state.chargeNum === 2 ? 'checked' : 'unchecked'}
                onPress={() =>
                  this.setState({ chargeNum: 2, chargeAmount: 30000 })
                }
              />
              <Text style={{ ...styles.moneyTitle, marginRight: 100 }}> 3 만원 </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="chargeNum"
                status={this.state.chargeNum === 3 ? 'checked' : 'unchecked'}
                onPress={() =>
                  this.setState({ chargeNum: 3, chargeAmount: 50000 })
                }
              />
              <Text style={{ ...styles.moneyTitle, marginRight: 100 }}> 5 만원 </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <RadioButton
                value="chargeNum"
                status={this.state.chargeNum === 4 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({ chargeNum: 4 })}
              />
              <Text style={{ ...styles.moneyTitle, marginRight: 15 }}> 기타</Text>
              <TextInput
                placeholder="환급금액"
                placeholderTextColor="#919191"
                underlineColorAndroid="#4f4f4f"
                style={{ ...styles.moneyTitle, marginTop: -5 }}
                onChangeText={(text) =>
                  this.setState({ chargeAmount: parseInt(text) * 10000 })
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
                <Text style={{ ...styles.panelButtonTitle, marginTop: 30 }}>환급받기</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </Modal >
    );
  }
}

//make this component available to the app
export default RefundModal;
const styles = StyleSheet.create({
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
