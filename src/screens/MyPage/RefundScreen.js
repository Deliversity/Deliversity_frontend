import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  TextInput,
} from 'react-native';
import {Content, Text} from 'native-base';
import {RadioButton} from 'react-native-paper';
import axios from '../../axiosConfig';
class RefundScreen extends Component {
  static navigationOptions = {
    title: 'Refund',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      selectedValue: '선택하세요',
      chargeAmount: '0',
      chargeNum: '0',
      name: '',
    };
  }
  sendRefund = async () => {
    try {
      const data = {
        bankKind: this.state.selectedValue,
        accountNum: this.state.content,
        point: this.state.chargeAmount,
        accountName: this.state.name,
      };
      await axios
        .post('/api/v1/point/refund', data)
        .then(() => {
          alert('환불 요청이 완료 되었습니다.');
        })
        .catch((error) => {
          alert(error);
        });
      this.setState({selectedValue: '선택하세요', content: ''});
      this.props.navigation.goBack(null);
    } catch (e) {
      alert('error' + e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>포인트 환급</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.cat}>
            <Text>은행 분류</Text>
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedValue: itemValue})
              }
              itemStyle={{color: 'red'}}>
              <Picker.Item label="선택하세요" value="선택하세요" />
              <Picker.Item label="KDB 산업은행" value="KDB 산업은행" />
              <Picker.Item label="SC 제일은행" value="SC 제일은행" />
              <Picker.Item label="전북은행" value="전북은행" />
              <Picker.Item label="IBK 기업은행" value="IBK 기업은행" />
              <Picker.Item label="하나씨티은행" value="하나씨티은행" />
              <Picker.Item label="경남은행" value="경남은행" />
              <Picker.Item label="KB 국민은행" value="KB 국민은행" />
              <Picker.Item label="대구은행" value="대구은행" />
              <Picker.Item label="하나은행" value="하나은행" />
              <Picker.Item label="수협은행" value="수협은행" />
              <Picker.Item label="부산은행" value="부산은행" />
              <Picker.Item label="신한은행" value="신한은행" />
              <Picker.Item label="NH 농협은행" value="NH 농협은행" />
              <Picker.Item label="광주은행" value="광주은행" />
              <Picker.Item label="케이뱅크" value="케이뱅크" />
              <Picker.Item label="우리은행" value="우리은행" />
              <Picker.Item label="제주은행" value="제주은행" />
              <Picker.Item label="카카오뱅크" value="카카오뱅크" />
              <Picker.Item label="오픈은행" value="오픈은행" />
            </Picker>
          </View>
          <View style={styles.write}>
            <View>
              <Text>계좌 번호</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="#e9967a"
                placeholder="'-'를 제외한 계좌번호를 입력해주세요"
                onChangeText={(text) => this.setState({content: text})}
              />
            </View>
            <View style={{marginTop: 5}}>
              <Text>성명</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="#e9967a"
                placeholder="name"
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>
            <View style={{marginTop: 5}}>
              <Text>환급 금액</Text>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="chargeNum"
                  status={this.state.chargeNum === 1 ? 'checked' : 'unchecked'}
                  onPress={() =>
                    this.setState({chargeNum: 1, chargeAmount: 10000})
                  }
                />
                <Text style={{...styles.moneyTitle, marginRight: 100}}>
                  {' '}
                  1 만원{' '}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="chargeNum"
                  status={this.state.chargeNum === 2 ? 'checked' : 'unchecked'}
                  onPress={() =>
                    this.setState({chargeNum: 2, chargeAmount: 30000})
                  }
                />
                <Text style={{...styles.moneyTitle, marginRight: 100}}>
                  {' '}
                  3 만원{' '}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="chargeNum"
                  status={this.state.chargeNum === 3 ? 'checked' : 'unchecked'}
                  onPress={() =>
                    this.setState({chargeNum: 3, chargeAmount: 50000})
                  }
                />
                <Text style={{...styles.moneyTitle, marginRight: 100}}>
                  {' '}
                  5 만원{' '}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <RadioButton
                  value="chargeNum"
                  status={this.state.chargeNum === 4 ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chargeNum: 4})}
                />
                <Text style={{...styles.moneyTitle, marginRight: 15}}>
                  {' '}
                  기타
                </Text>
                <TextInput
                  placeholder="환급금액"
                  underlineColorAndroid="#e9967a"
                  style={{...styles.moneyTitle, marginTop: -5}}
                  onChangeText={(text) =>
                    this.setState({chargeAmount: parseInt(text) * 10000})
                  }
                />
                <Text style={styles.moneyTitle}> 만원 </Text>
                {/* </Fragment> */}
                {/* ) : null} */}
              </View>
            </View>
            <View style={styles.but}>
              <TouchableOpacity
                style={styles.butBack}
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}>
                <Text style={styles.textSize}>돌아가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.butEnd}
                onPress={() => {
                  this.sendRefund();
                }}>
                <Text style={styles.textSize}>작성완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#3CB371',
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
  butEnd: {
    backgroundColor: '#3CB371',
    flex: 1,
    alignItems: 'center',
    padding: 4,
    margin: 3,
  },
  butBack: {
    backgroundColor: '#DCDCDC',
    flex: 1,
    alignItems: 'center',
    padding: 4,
    margin: 3,
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
  but: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    margin: 5,
  },
  cat: {
    marginTop: 10,
  },
  pick: {
    backgroundColor: '#D0D3D4',
    borderColor: 'red',
  },
  write: {
    marginTop: 10,
  },
  moneyTitle: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
  },
});
export default RefundScreen;
