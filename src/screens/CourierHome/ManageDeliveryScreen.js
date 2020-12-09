import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {Text} from 'native-base';
import Card from '../../components/manageDeliveryCard';
import axios from '../../axiosConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';
class ManageDeliveryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deliveryList: '',
      orderId: '',
      refreshing: false,
      isProgress: true,
      progressDeliveryList: '',
      completeDeliveryList: '',
    };
  }
  componentDidMount() {
    this.onClickGetDelivery();
  }
  onClickGetDelivery = async () => {
    await this.setState({refreshing: true});
    await axios
      .get('/api/v1/order/deliverList')
      .then((res) => {
        const deliveryList = res.data.data;
        const progressOrder = deliveryList.filter(function (ele) {
          return ele.orderStatus !== '3';
        });
        const untilOrder = deliveryList.filter(function (ele) {
          return ele.orderStatus === '3';
        });
        this.setState({
          progressDeliveryList: progressOrder,
          completeDeliveryList: untilOrder,
          refreshing: false,
        });
      })
      .catch((e) => {
        alert(e);
      });
  };
  onClickConfirmDelivery = async (orderId) => {
    await axios
      .get(`/api/v1/order/complete?orderId=${orderId}`)
      .then((res) => {
        alert('배달 완료 신청이 완료 되었습니다.');
        this.onClickGetDelivery();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  handleRefresh = async () => {
    await this.onClickGetDelivery();
  };
  renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        onPress={() => {
          if (item.orderStatus == 3 && item.reviewedByRider == false) {
            this.props.navigation.navigate('WriteReview', {
              orderID: item.id,
              riderID: item.userId,
            });
          } else if (item.orderStatus == 3 && item.reviewedByRider == true) {
            this.props.navigation.navigate('OrderReview', {
              orderID: item.id,
              riderID: item.userId,
            });
          } else if (item.orderStatus == 2) {
            Alert.alert(
              '⚠',
              '배달완료를 처리 하시겠습니까?',
              [
                {
                  text: '취소',
                },
                {
                  text: '배달완료',
                  onPress: () => this.onClickConfirmDelivery(item.id),
                },
              ],
              {cancelable: false},
            );
          }
        }}
      />
    );
  };
  render() {
    let view =
      this.state.isProgress === true ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          extraData={this.state}
          data={this.state.progressDeliveryList}
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
          data={this.state.completeDeliveryList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>나의 배달 리스트</Text>
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
          <View style={{flex: 9}}>{view}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9967a',
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
    borderBottomColor: '#e9967a',
  },
  textbef: {
    margin: 5,
    color: '#53565A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textaft: {
    margin: 5,
    color: '#53565A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  View: {
    flex: 1,
  },
});

export default ManageDeliveryScreen;
