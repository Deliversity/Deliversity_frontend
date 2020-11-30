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
      modalVisible: this.props.modal,
      email: '',
      status:0,
      success: false,
    };
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  sendEmail = async () => {
    const data = {
      email: this.state.email,
    };
    await axios
      .get('/api/v1/auth/email/verification', data)
      .then(() => {
        alert('Success to send mail');
      })
      .catch((err) => {
        alert('sendEmail Failed: ' + err);
      });
  }

  getEmail=async()=>{
      const data={
          status: 1,
          success:true,
          email:this.state.email
      }
      await axios
      .post('api/v1/auth/findid', data)
      .then((res)=>{
          alert("Id is "+res);
      })
      .catch((e)=>{
          alert(e);
      })
  }

  render(){
     /* if(this.props.modal!=this.state.modalVisible){
          this.setState({modalVisible: this.props.modal})
      }*/
      const {modalVisible}=this.props.modal;
      return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
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
                <Text style={styles.butText}>완료</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>this.sendEmail()}>
                <Text>완료</Text>
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
    }
});