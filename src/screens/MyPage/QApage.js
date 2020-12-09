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
import {requestQna} from '../../store/actions/action';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import axios from '../../axiosConfig';
class QApage extends Component {
  static navigationOptions = {
    title: 'QApage',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      selectedValue: '선택하세요',
    };
  }
  sendQa = async () => {
    try {
      const data = {
        qnaKind: this.state.selectedValue,
        content: this.state.content,
      };
      await axios
        .post('/api/v1/myinfo/qna', data)
        .then(() => {
          alert('문의 사항이 접수되었습니다.');
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
          <Text style={styles.text_header}>문의사항</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.cat}>
            <Text>상담 분류</Text>
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedValue: itemValue})
              }
              itemStyle={{color: 'red'}}>
              <Picker.Item label="선택하세요" value="선택하세요" />
              <Picker.Item label="오류 문제" value="오류 문제" />
              <Picker.Item label="배달원 신청" value="배달원 신청" />
              <Picker.Item label="가게 선택" value="가게 선택" />
              <Picker.Item label="주문 관리" value="주문 관리" />
              <Picker.Item label="결제" value="결제" />
              <Picker.Item label="신고 관리" value="신고 관리" />
              <Picker.Item label="기타" value="기타" />
            </Picker>
          </View>
          <View style={styles.write}>
            <View>
              <Text>문의 내용</Text>
              <TextInput
                multiline={true}
                numberOfLines={15}
                style={styles.input}
                placeholder="자세한 문의사항을 입력해주세요"
                onChangeText={(text) => this.setState({content: text})}
              />
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
                  this.sendQa();
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
    backgroundColor: '#005687',
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
    backgroundColor: '#005687',
    flex: 1,
    alignItems: 'center',
    padding: 4,
    margin: 3,
  },
  butBack: {
    backgroundColor: '#768692',
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
});
const mapDispatchToProps = (dispatch) => ({
  requestQna: (data) => dispatch(requestQna(data)),
});
export default connect(null, mapDispatchToProps)(QApage);
