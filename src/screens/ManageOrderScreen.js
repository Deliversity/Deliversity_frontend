import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import axios from '../axiosConfig';
import Card from '../components/manageOrderCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
class ManageOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: '',
      orderId: [], ///orderList
      refreshing: false,
      isProgress: true,
      progressOrderInfo: '',
      completeOrderInfo: '',
    };
  }
  componentDidMount() {
    this.getOrderInfo();
  }
  getOrderInfo = async () => {
    //console.log(this.state.orderID);
    this.setState({refreshing: true});
    await axios
      .get('/api/v1/order/orderList')
      .then((res) => {
        const orderList = res.data.data;
        const progressOrder = orderList.filter(function (ele) {
          return ele.orderStatus !== '3';
        });
        const untilOrder = orderList.filter(function (ele) {
          return ele.orderStatus === '3';
        });
        this.setState({
          progressOrderInfo: progressOrder,
          completeOrderInfo: untilOrder,
          refreshing: false,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  handleRefresh = async () => {
    await this.getOrderInfo();
  };
  renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        onPress={() => {
          if (item.orderStatus == 3 && item.reviewedByUser == false) {
            this.props.navigation.navigate('WriteReview', {
              orderID: item.id,
              riderID: item.riderId,
            });
          } else if (item.orderStatus == 3 && item.reviewedByUser == true) {
            this.props.navigation.navigate('OrderReview', {
              orderID: item.id,
              riderID: item.riderId,
            });
          } else if (item.orderStatus == 2) {
            this.props.navigation.navigate('CourierLocation', {
              myLat: item.lat,
              myLng: item.lng,
              storeLat: item.storeLat,
              storeLng: item.storeLng,
              storeName: item.storeName,
              orderID: item.id,
            });
          } else {
            this.props.navigation.navigate('DeliveryMan', {
              orderID: item.id,
            });
          }
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
          <View style={styles.v1}>
            <View style={styles.View}>
              <TouchableOpacity
                style={
                  (styles.aftbut,
                  this.state.isProgress ? styles.aftbut : styles.befbut)
                }
                onPress={() => this.setState({isProgress: true})}>
                <Text
                  style={
                    (styles.textbef,
                    this.state.isProgress ? styles.textbef : styles.textaft)
                  }>
                  진행중
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.View}>
              <TouchableOpacity
                style={
                  (styles.aftbut,
                  !this.state.isProgress ? styles.aftbut : styles.befbut)
                }
                onPress={() => this.setState({isProgress: false})}>
                <Text
                  style={
                    (styles.textbef,
                    !this.state.isProgress ? styles.textbef : styles.textaft)
                  }>
                  진행완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 9}}>
            {this.state.isProgress === true ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                  />
                }
                extraData={this.state}
                data={this.state.progressOrderInfo}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                  />
                }
                extraData={this.state}
                data={this.state.completeOrderInfo}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
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
  v1: {
    flexDirection: 'row',
    flex: 1,
  },
  befbut: {
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: 'lightgray',
  },
  aftbut: {
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#8fbc8f',
  },
  textbef: {
    margin: 5,
    color: '#53565A',
    fontWeight: 'bold',
  },
  textaft: {
    margin: 5,
    color: '#53565A',
    fontWeight: 'bold',
  },
  View: {
    flex: 1,
  },
});

export default ManageOrderScreen;
