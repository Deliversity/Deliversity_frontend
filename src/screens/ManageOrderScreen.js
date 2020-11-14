import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import axios from '../axiosConfig';
import Card from '../components/manageOrderCard';
class ManageOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      orderId: [], ///orderList
      refreshing: false,
    };
  }
  componentDidMount() {
    this.getOrderInfo();
  }
  getOrderInfo = async () => {
    //console.log(this.state.orderID);
    await this.setState({refreshing: true});
    const res = await axios.get('/api/v1/order/orderList');
    await this.setState({refreshing: false, orderInfo: res.data.data});
    //return res.data.data;
  };
  handleRefresh = async () => {
    await this.getOrderInfo();
  };
  renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        onPress={() => {
          item.orderStatus === '3'
            ? this.props.navigation.navigate('WriteReview', {
                orderID: item.id,
                riderID: item.riderId,
              })
            : this.props.navigation.navigate('DeliveryMan', {
                orderID: item.id,
              });
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>나의 주문 리스트</Text>
        </View>
        <View style={styles.footer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
            extraData={this.state}
            data={this.state.orderInfo}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
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
  textSize: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  bookingStyle: {
    fontSize: 13,
    color: '#ff7f50',
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#ff7f50',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
  },
});

export default ManageOrderScreen;
