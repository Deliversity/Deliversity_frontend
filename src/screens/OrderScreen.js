import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Text} from 'native-base';
import {connect} from 'react-redux';
class OrderScreen extends Component {
  static navigationOptions = {
    title: 'Order',
  };
  constructor(props) {
    super(props);
    this.state = {
      gender: false,
      hotDeal: false,
      orderType: '',
      hour: '',
      min: '',
      name: this.props.route.params ? this.props.route.params.name : '',
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>요청할 가게</Text>
          <Text>{this.state.name}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>배달 요청 하기</Text>
          <Text style={styles.imageSubTitle}>ex)감자 핫도그 3개요</Text>
          <TextInput style={styles.textInputBox} />
        </View>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>배달 받을 장소</Text>
          <Text>{this.props.address}</Text>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <View>
              <Text style={styles.imageTitle}>동성 배달원 요청</Text>
              <Text style={styles.imageSubTitle}>
                미설정시 랜덤으로 배달원이 설정됩니다
              </Text>
            </View>
            <RadioButton
              value="gender"
              status={this.state.gender === true ? 'checked' : 'unchecked'}
              onPress={() => this.setState({gender: !this.state.gender})}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.imageTitle}>핫딜 신청</Text>
              <Text style={styles.imageSubTitle}>
                배달원의 배달건 리스트 맨 상단에 올라가게 됩니다(+1000원)
              </Text>
            </View>
            <RadioButton
              value="hotDeal"
              status={this.state.hotDeal === true ? 'checked' : 'unchecked'}
              onPress={() => this.setState({hotDeal: !this.state.hotDeal})}
            />
          </View>
        </View>
        <View style={styles.orderRadiobox}>
          <Text style={styles.imageTitle}>주문 유형</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>실시간</Text>
              <RadioButton
                value="realTime"
                status={
                  this.state.orderType === 'realTime' ? 'checked' : 'unchecked'
                }
                onPress={() => this.setState({orderType: 'realTime'})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>예약주문</Text>
              <RadioButton
                value="booking"
                status={
                  this.state.orderType === 'booking' ? 'checked' : 'unchecked'
                }
                onPress={() => this.setState({orderType: 'booking'})}
              />
            </View>
          </View>
        </View>
        {this.state.orderType !== 'booking' ? null : (
          <View style={styles.orderRadiobox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                placeholder="hour"
                placeholderTextColor="#e9967a"
                underlineColorAndroid="#e9967a"
                value={this.state.hour}
                onChangeText={(text) => this.setState({hour: text})}
              />
              <TextInput
                value="시간"
                editable={false}
                style={{color: 'black'}}
              />
              <TextInput
                placeholder="min"
                placeholderTextColor="#e9967a"
                underlineColorAndroid="#e9967a"
                value={this.state.min}
                onChangeText={(text) => this.setState({min: text})}
              />
              <TextInput
                value="분 후에 보내주세요!"
                editable={false}
                style={{color: 'black'}}
              />
            </View>
          </View>
        )}
        <View style={styles.rightBox}>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.imageTitle}>예상 배달비</Text>
            <Text>3,000 won</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.onClickOrder();
          }}>
          <Text style={styles.panelButtonTitle}>신청하기</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
  },
  rightBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  radiobox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  orderRadiobox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  imageSubTitle: {
    fontSize: 10,
  },
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  textInputBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#fafad2',
    borderWidth: 3,
    borderColor: 'gray',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#8fbc8f',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  address: state.authentication.address,
});
export default connect(mapStateToProps, {})(OrderScreen);
