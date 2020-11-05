import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import axios from '../axiosConfig';
import CustomerOrderList from '../components/CustomerOrderList';
import {List} from 'native-base';
class MatchingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      orderId: '', ///orderList
    };
    this.getOrderInfo();
  }
  handleItemDataOnPress = (articleData) => {
    console.log(articleData.id);
    this.props.navigation.navigate('DeliveryMan', {
      orderID: articleData.id,
    });
  };
  getOrderInfo = async () => {
    //console.log(this.state.orderID);
    await axios.get('/api/v1/order/orderList').then((res) => {
      //console.log(res.data.data);
      this.setState({
        orderInfo: res.data.data,
      });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>나의 주문 리스트</Text>
        </View>
        <View style={styles.footer}>
          <List
            keyExtractor={(item, index) => index.toString()}
            dataArray={this.state.orderInfo}
            renderRow={(item) => {
              return (
                <CustomerOrderList
                  onPress={this.handleItemDataOnPress}
                  data={item}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
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
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
});

export default MatchingScreen;
