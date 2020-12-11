import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity,  Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from '../axiosConfig';

class SmsModal extends Component {
  static navigationOptions = {
    title: 'SmsModal',
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modal,
      email: '',
      status:0,
      success: 0,
      phone:'',
      num:0,
      Id:false
    };
  }

  sendModalstate = () => {
    this.setState({modalVisible: false})
    this.props.handler2(this.state.modalVisible);
  };

  sendPhone = async () => {
    const data = {
      phone: this.state.phone,
    };
    await axios
      .post('/api/v1/auth/find/sms', data)
      .then(() => {
        alert('인증 번호가 보내졌습니다');
        this.setState({success: true, status: 2})
      })
      .catch((err) => {
        alert('없는 번호입니다: ' + err.response.data.message);
      });
  }

  checkNum = async () => {
    const data = {
      phone: this.state.phone,
      verify: this.state.num
    };
    await axios
      .post('/api/v1/auth/sms/verification', data)
      .then(() => {
        alert('인증이 성공 되었습니다.');
        this.setState({success: 1, status: 2, Id:true})
      })
      .catch((err) => {
        alert('인증이 실패했습니다.' + err.response.data.message);
      });
  }

  getId = async () => {
    const data = {
      success:this.state.success,
      phone: this.state.phone,
    };
    console.log(data);
    await axios
      .post(`/api/v1/auth/findid?status=${this.state.status}`, data)
      .then((res) => {
        alert('사용자 아이디는 ' + res.data.data.userId+' 입니다.');
        console.log(res.data.data.userId);
      })
      .catch((err) => {
        alert('아이디가 없습니다.' + err.response.data.message);
      });
  }

  render(){
      return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modal}
        onRequestClose={() => {
          // eslint-disable-next-line no-undef
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.Main}>휴대폰 인증</Text>
            <View style={styles.email}>
            <Text style={styles.text1}>휴대폰 번호</Text>
            <TextInput style={styles.inText} onChangeText={(text) => this.setState({phone: text})} />
            <TouchableOpacity  style={styles.but} onPress={()=>this.sendPhone()}>
                <Text style={styles.butText}>인증번호 받기</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.email2}>
            <Text style={styles.text1}>번호 입력</Text>
            <TextInput style={styles.inText} onChangeText={(text) => this.setState({num: text})} />
            <TouchableOpacity  style={styles.but} onPress={()=>this.checkNum()}>
                <Text style={styles.butText} >인증하기</Text>
            </TouchableOpacity>
            </View>

            {this.state.Id==true?(
              <TouchableOpacity onPress={()=>this.getId()}>
                <Text>아이디 찾기</Text>
              </TouchableOpacity>
            ):null}
            <TouchableOpacity onPress={()=>this.sendModalstate()}>
                <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
export default SmsModal;

const styles=StyleSheet.create({
    centeredView:{
      //  justifyContent: 'center',
       // alignItems:"center",
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        flexDirection: 'column',
    },
    but:{
        backgroundColor:'#AD5389',
        padding:5,
    },
    Main:{
      textAlign:'center',
      fontWeight: "bold",
      fontSize: 17,
    },
    email:{
      marginTop:15,
    },
    email2:{
      marginTop:10,
      marginBottom:20
    },
    text1:{
      marginBottom:5,
      color:'#AD5389'
    },
    inText:{
      marginBottom:5,
      height:40
    },
    butText:{
      color:'white',
      textAlign:'center',
      borderRadius: 15,
    }
});