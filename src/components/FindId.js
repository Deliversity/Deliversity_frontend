import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from '../axiosConfig';
import EmailModal from '../components/EmailModal';
import SmsModal from '../components/SmsModal'
class FindId extends Component {
  static navigationOptions = {
    title: 'FindAssign',
  };
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      email: false,
      phone: false
    };
}
handler = (data) => {
  this.setState({email: data});
};
    render() {
      console.log(this.state.email);
        return(
            <View style={styles.container}>
              <View style={styles.View}>
                <TouchableOpacity style={styles.but} onPress={()=>this.setState({email:true})}>
                  <Text style={styles.text}>이메일 인증</Text>
                </TouchableOpacity>
                </View>
                <EmailModal handler={this.handler} modal={this.state.email} ></EmailModal>
                <View style={styles.View}>
                  <TouchableOpacity style={styles.but} onPress>
                    <Text style={styles.text}>휴대폰 인증</Text>
                  </TouchableOpacity>
                </View>
                <SmsModal modal={this.state.phone}></SmsModal>
            </View>
        );
    }
}

export default FindId;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  View:{
    flex:1,
  },
  but:{
    alignItems:'center',
    backgroundColor:'#AD5389',
    padding: 15,
    marginLeft: 15,
    marginRight:15,
    borderRadius: 10
  },
  text:{
    color:'white'
  }
});
