import React, {Component, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import axios from '../../axiosConfig';
class Report extends Component {
  static navigationOptions = {
    title: 'Report',
  };
  constructor(props) {
    super(props);
    this.state = {
      reportKind: '',
      orderId: '',
      content: '',
      upload_chat: false,
      user: this.props.user,
      orderArray: [],
      deliveryArray: [],
      selectedOrderId: '',
    };
  }
  componentDidMount(): void {
    if (this.state.user === '배달원') {
      this.onClickGetDelivery();
    } else {
      this.onClickGetOrder();
    }
  }

  onClickGetOrder = async () => {
    await axios
      .get('/api/v1/order/orderList')
      .then((res) => {
        const orderList = res.data.data;
        //console.log(orderList);
        let helpArray = [];
        for (var i in orderList) {
          helpArray.push(orderList[i].id.toString());
        }
        this.setState({orderArray: helpArray});
        console.log(this.state.orderArray);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  onClickGetDelivery = async () => {
    await axios
      .get('/api/v1/order/deliverList')
      .then((res) => {
        const deliveryList = res.data.data;
        let helpArray = [];
        for (var i in deliveryList) {
          helpArray.push(deliveryList[i].id.toString());
        }
        this.setState({deliveryArray: helpArray});
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  sendReport = async () => {
    try {
      console.log('test');
      const data = {
        reportKind: this.state.reportKind,
        orderId: parseInt(this.state.orderId),
        content: this.state.content,
        upload_chat: this.state.upload_chat,
      };
      console.log(data);
      if (data.reportKind == '선택하세요' || data.reportKind == '') {
        alert('신고 분류를 선택해주세요.');
      } else {
        await axios
          .post('/api/v1/myinfo/report', data)
          .then(() => {
            alert('신고 사항이 접수되었습니다.');
          })
          .catch((error) => {
            console.log(error);
            alert('신고 접수가 실패 되었습니다.');
          });
        this.props.navigation.goBack(null);
      }
    } catch (e) {
      alert('신고 접수가 실패 되었습니다.');
    }
  };
  render() {
    var options = [];
    {
      this.state.user === '배달원'
        ? (options = this.state.deliveryArray)
        : (options = this.state.orderArray);
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>신고하기</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.cat}>
            <Text>신고 분류</Text>
            <Picker
              selectedValue={this.state.reportKind}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({reportKind: itemValue})
              }>
              <Picker.Item label="선택하세요" value="선택하세요" />
              <Picker.Item label="채팅" value="채팅" />
              <Picker.Item label="배달" value="배달" />
              <Picker.Item label="기타" value="기타" />
            </Picker>
          </View>
          <View style={styles.cat}>
            <Text>신고 내용</Text>
            <TextInput
              multiline={true}
              numberOfLines={7}
              style={styles.input}
              placeholder="자세한 신고사항을 입력해주세요"
              onChangeText={(text) => this.setState({content: text})}
            />
          </View>
          <View style={styles.cat}>
            <Text>주문 아이디</Text>
            {this.state.user === '배달원' ? (
              <Picker
                selectedValue={this.state.orderId}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({orderId: itemValue})
                }>
                {options.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
            ) : (
              <Picker
                mode="dropdown"
                selectedValue={this.state.orderId}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({orderId: itemValue})
                }>
                {options.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
            )}
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
                this.sendReport();
              }}>
              <Text style={styles.textSize}>작성완료</Text>
            </TouchableOpacity>
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
    backgroundColor: '#B83A4B',
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
    backgroundColor: '#B83A4B',
    flex: 1,
    alignItems: 'center',
    padding: 4,
    margin: 3,
  },
  butBack: {
    backgroundColor: '#63666A',
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
});
const mapStateToProps = (state) => ({
  user: state.authentication.user,
});
export default connect(mapStateToProps, null)(Report);
