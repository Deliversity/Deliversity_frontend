import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity,  Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from '../axiosConfig';

class EmailModal extends Component {
  static navigationOptions = {
    title: 'EmailModal',
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: '',
      email: '',
      status:0,
      success: 0,
      phone:''
    };
  }
  

  sendEmail = async () => {
    const data = {
      email: this.state.email,
    };
    await axios
      .post('/api/v1/auth/find/email', data)
      .then(() => {
        alert('인증 링크가 보내졌습니다.');
        this.setState({success: 1, status: 1})
        //this.getId();
      })
      .catch((err) => {
        alert('없는 메일입니다: ' + err.message);
      });
  }

  getId=async()=>{
    const data={
      status:this.state.status,
      success:this.state.success,
      email:this.state.email,
      phone:this.state.phone
    }
    await axios.post('/api/v1/auth/findid',data)
    .then((data)=>{
      return(
        <View>
          <Text>Id is {data} </Text>
        </View>
      )
      //alert('사용자의 비밀번호는 다음과 같습니다.' +data);
    })
    .catch((er)=>{
      alert('관련 아이디가 없습니다.'+er);
    })
  }

  sendModalstate = () => {
    this.setState({modalVisible: false})
    this.props.handler(this.state.modalVisible);
  };

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
            <Text style={styles.Main}>이메일 인증</Text>
            <View style={styles.email}>
            <Text style={styles.text1}>이메일</Text>
            <TextInput style={styles.inText} onChangeText={(text) => this.setState({email: text})} />
            <TouchableOpacity onPress={()=>this.sendEmail()} style={styles.but}>
                <Text style={styles.butText}>인증하기</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>this.sendModalstate()}>
                <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
export default EmailModal;

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
      marginBottom:10
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
    },
    endBut:{
      backgroundColor:'#53565A',
        padding:5,
    }
});