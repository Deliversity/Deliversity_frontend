import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  Modal,
  Platform,
  Dimensions,
  TextInput,
  Picker,
} from 'react-native';
import ChangeButton from '../components/ChangeButton';
import axios from '../axiosConfig';
import {getUserStorage} from '../store/actions/action';
import Card from '../components/seekDeliveryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeInfo from '../../assets/seekDetail.png';
const minusHeight = Platform.OS === 'ios' ? 123 : 14;
const {width, height} = Dimensions.get('window');
class SeekDeliveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HotOrderList: '',
      DefaultOrderList: '',
      isHotDeal: true,
      refreshing: false,
      modalVisible: true,
      filterOrder: '',
      selectedValue: '전체',
      bufferHotOrder: '',
      bufferDefaultOrder: '',
    };
  }
  componentDidMount(): void {
    this.onClickGetHotDeal();
    this.onClickGetDefault();
  }
  handleRefresh = async () => {
    this.setState({
      filterOrder: '',
      selectedValue: '전체',
    });
    this.textInput.clear();
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
        this.setState({
          HotOrderList: HotDealList,
          bufferHotOrder: HotDealList,
          refreshing: false,
        });
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
        this.setState({
          DefaultOrderList: DefaultOrderList,
          bufferDefaultOrder: DefaultOrderList,
          refreshing: false,
        });
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

  stopPostPosition = async () => {
    console.log('stop geo');
    const timerId = parseInt(await getUserStorage('timerId'));
    clearInterval(timerId);
  };
  gotoHotDeal = () => {
    this.setState({
      filterOrder: '',
      selectedValue: '전체',
      isHotDeal: true,
    });
    this.textInput.clear();
    this.handleRefresh();
  };

  gotoDefault = () => {
    this.setState({
      filterOrder: '',
      selectedValue: '전체',
      isHotDeal: false,
    });
    this.textInput.clear();
    this.handleRefresh();
  };

  searchOrderList = () => {
    //카테고리 선택된것
    const select = this.state.selectedValue;
    //검색된 것
    const name = this.state.filterOrder;
    if (this.state.filterOrder === '' && this.state.selectedValue === '전체') {
      this.handleRefresh();
    } else if (
      this.state.filterOrder === '' &&
      this.state.selectedValue !== '전체'
    ) {
      //카테고리만 검색한 경우
      this.setState({
        refreshing: true,
      });
      if (this.state.isHotDeal === true) {
        const orderList = this.state.HotOrderList;
        const searchOrder = orderList.filter(function (ele) {
          return ele.categoryName === select;
        });
        this.setState({
          bufferHotOrder: searchOrder,
          refreshing: false,
        });
      } else {
        const orderList = this.state.DefaultOrderList;
        const searchOrder = orderList.filter(function (ele) {
          return ele.categoryName === select;
        });
        this.setState({
          bufferDefaultOrder: searchOrder,
          refreshing: false,
        });
      }
    } else {
      //카테고리+필터검색한경우
      this.setState({
        refreshing: true,
      });
      if (this.state.isHotDeal === true) {
        const orderList = this.state.HotOrderList;
        if (select === '전체') {
          //필터만 검색한 경우
          const searchOrder = orderList.filter(function (ele) {
            return ele.storeName.includes(name);
          });
          this.setState({
            bufferHotOrder: searchOrder,
            refreshing: false,
          });
        } else {
          const searchOrder = orderList.filter(function (ele) {
            return ele.storeName.includes(name) && ele.categoryName === select;
          });
          this.setState({
            bufferHotOrder: searchOrder,
            refreshing: false,
          });
        }
      } else {
        const orderList = this.state.DefaultOrderList;
        if (select === '전체') {
          //필터만 검색한 경우
          const searchOrder = orderList.filter(function (ele) {
            return ele.storeName.includes(name);
          });
          this.setState({
            bufferDefaultOrder: searchOrder,
            refreshing: false,
          });
        } else {
          const searchOrder = orderList.filter(function (ele) {
            return ele.storeName.includes(name) && ele.categoryName === select;
          });
          this.setState({
            bufferDefaultOrder: searchOrder,
            refreshing: false,
          });
        }
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.submitBtn}>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: false})}
            style={{marginRight: 10, marginTop: 10}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: 6,
                fontSize: 15,
              }}>
              ❓
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 11}}>
              도움말
            </Text>
          </TouchableOpacity>
          <ChangeButton onPress={this.stopPostPosition} />
        </View>
        <View style={styles.header}>
          <Text style={styles.text_header}>Deliversity</Text>
          <Text style={styles.text_sub}>원하는 배달건을 찾아보세요!</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.cardStyle}>
            <TextInput
              ref={(input) => {
                this.textInput = input;
              }}
              style={styles.textInputBox}
              placeholder=" Search the store"
              onChangeText={(text) => this.setState({filterOrder: text})}
            />
            <Picker
              selectedValue={this.state.selectedValue}
              style={{
                width: 115,
                color: 'gray',
                size: 12,
                placeholderTextColor: 'gray',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedValue: itemValue})
              }>
              <Picker.Item label="전체" value="전체" />
              <Picker.Item label="음식점" value="음식점" />
              <Picker.Item label="카페" value="카페" />
              <Picker.Item label="편의점" value="편의점" />
              <Picker.Item label="세탁소" value="세탁소" />
              <Picker.Item label="문구점" value="문구점" />
              <Picker.Item label="기타" value="기타" />
            </Picker>
            <TouchableOpacity
              style={styles.searchStore}
              onPress={() => this.searchOrderList()}>
              <Icon name="search" color={'gray'} size={28} />
            </TouchableOpacity>
          </View>
          {this.state.isHotDeal === true ? (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              extraData={this.state}
              data={this.state.bufferHotOrder}
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
              data={this.state.bufferDefaultOrder}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 6}}>
            <TouchableOpacity onPress={() => this.gotoHotDeal()}>
              {this.state.isHotDeal === true ? (
                <Text style={styles.panelActivateButtonTitle}>핫딜</Text>
              ) : (
                <Text style={styles.panelButtonTitle}>핫딜</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.gotoDefault()}>
              {this.state.isHotDeal === false ? (
                <Text style={styles.panelActivateButtonTitle}>기본</Text>
              ) : (
                <Text style={styles.panelButtonTitle}>기본</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible === false}>
          <View style={{opacity: 0.7, backgroundColor: 'white'}}>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: true})}
              style={{marginLeft: 10, marginTop: 10}}>
              <Icon name="clear" color={'#000000'} size={25} />
            </TouchableOpacity>
            <Image
              source={HomeInfo}
              style={{height: height - minusHeight, width: width}}
            />
          </View>
        </Modal>
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
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  text_sub: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#e9967a',
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
    backgroundColor: '#f4da6c',
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
  input: {
    borderWidth: 1,
    borderColor: '#f4da6c',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '50%',
    height: 40,
  },
  searchStore: {
    padding: 5,
  },
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'darkgray',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#fafad2',
    width: '96%',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  textInputBox: {
    width: '50%',
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: 'gray',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 40,
  },
});

export default SeekDeliveryScreen;
