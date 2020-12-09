import React, {Component, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import {
  Container,
  Right,
  Header,
  Content,
  Body,
  Button,
  Text,
} from 'native-base';
import {requestReport} from '../../store/actions/action';
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
      orderId: 0,
      content: '',
      upload_chat: false,
    };
  }
  sendReport = async () => {
    try {
      const data = {
        reportKind: this.state.reportKind,
        orderId: this.state.orderId,
        content: this.state.content,
        upload_chat: this.state.upload_chat,
      };
      await axios
        .post('/api/v1/myinfo/report', data)
        .then(() => {
          alert('신고 사항이 접수되었습니다.');
        })
        .catch((error) => {
          alert(error);
        });
      this.props.navigation.goBack(null);
    } catch (e) {
      alert('error' + e);
    }
  };
  chat = () => {
    if (this.state.reportKind == '채팅') {
      return (
        <View style={styles.cat}>
          <Text>채팅 이미지 포함 여부</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
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
              <Picker.Item label="배송 물품" value="배송물품" />
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
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({orderId: text})}
            />
          </View>
          {this.chat()}
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
const mapDispatchToProps = (dispatch) => ({
  requestReport: (data) => dispatch(requestReport(data)),
});
export default connect(null, mapDispatchToProps)(Report);
