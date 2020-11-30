import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import axios from '../axiosConfig';
import FindId from '../components/FindId';
import FindPassword from '../components/FindPassword';
class FindAssign extends Component {
  static navigationOptions = {
    title: 'FindAssign',
  };
  constructor(props) {
    super(props);
//     this.sendMark = this.sendMark.bind(this);
    this.state = {
      Id: true,
    };
}
  
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={styles.v1}>
                <TouchableOpacity style={styles.idbut} onPress={()=> {this.setState({Id: true})}}>
                    <Text style={styles.textId}>아이디 찾기</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.pasbut} onPress={()=> {this.setState({Id: false})}}>
                    <Text style={styles.textPas}>비밀번호 찾기</Text>
                </TouchableOpacity>
                </View>
                <View>
                { this.state.Id?
                <FindId style={styles.item}></FindId>
                : <FindPassword style={styles.item}></FindPassword>
                }
                </View>
            </View>
        );
    }
}

export default FindAssign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flex:0.25
  },
  v1:{
    flexDirection: 'row',
    flex:1,
    alignItems:'center',
  },
  idbut:{
    flex:1,
    marginTop:5,
    backgroundColor: 'black',
  },
  pasbut:{
    flex:1,
    marginTop:5
  },
  textId:{
      margin :5
  },
  textPas:{
      margin :5
  }
  ,
  item:{
      flex:1
  }
});
