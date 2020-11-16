import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import ChangeButton from '../components/ChangeButton';
import axios from '../axiosConfig';
import {getUserStorage} from '../store/actions/action';
import Card from '../components/seekDeliveryCard';
class SeekDeliveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HotOrderList: '',
      DefaultOrderList: '',
      isHotDeal: true,
      refreshing: false,
    };
  }
  componentDidMount(): void {
    this.onClickGetHotDeal();
    this.onClickGetDefault();
  }
  handleRefresh = async () => {
    await this.onClickGetHotDeal();
    await this.onClickGetDefault();
  };
  onClickGetHotDeal = async () => {
    await this.setState({refreshing: true});
    await axios
      .get('/api/v1/order/orders')
      .then((res) => {
        const orderList = res.data.data.orders;
        const HotDealList = orderList.filter(function (ele) {
          return ele.hotDeal === true;
        });
        this.setState({HotOrderList: HotDealList, refreshing: false});
      })
      .catch((e) => {});
  };
  onClickGetDefault = async () => {
    await this.setState({refreshing: true});
    await axios
      .get('/api/v1/order/orders')
      .then((res) => {
        //console.log(res.data.data.orders);
        const orderList = res.data.data.orders;
        const DefaultOrderList = orderList.filter(function (ele) {
          return ele.hotDeal === false;
        });
        this.setState({DefaultOrderList: DefaultOrderList, refreshing: false});
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          this.props.navigation.navigate('DetailDelivery', {
            orderID: item.id,
          })
        }
      />
    );
  };

  stopPostPosition=async ()=>{
    console.log("stop geo")
    const timerId = parseInt(await getUserStorage('timerId'));
    clearInterval(timerId)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.submitBtn}>
          <ChangeButton onPress={this.stopPostPosition}/>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 150, height: 150}}
          />
          <Text style={styles.text_header}>Deliversity</Text>
        </View>
        <View style={styles.footer}>
          {this.state.isHotDeal === true ? (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              extraData={this.state}
              data={this.state.HotOrderList}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
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
              data={this.state.DefaultOrderList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({isHotDeal: true})}>
              {this.state.isHotDeal === true ? (
                <Text style={styles.panelActivateButtonTitle}>핫딜</Text>
              ) : (
                <Text style={styles.panelButtonTitle}>핫딜</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({isHotDeal: false})}>
              {this.state.isHotDeal === false ? (
                <Text style={styles.panelActivateButtonTitle}>기본</Text>
              ) : (
                <Text style={styles.panelButtonTitle}>기본</Text>
              )}
            </TouchableOpacity>
          </View>
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
  submitBtn: {
    alignSelf: 'flex-end',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 35,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
  panelButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#ff7f50',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 5,
    paddingVertical: 5,
  },
  panelActivateButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#ff7f50',
    borderWidth: 1,
    borderColor: '#f4da6c',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 5,
    paddingVertical: 5,
  },
  filterButtonTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 2,
    borderColor: 'gray',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default SeekDeliveryScreen;
