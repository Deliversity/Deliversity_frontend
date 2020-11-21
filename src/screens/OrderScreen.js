import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import axios from '../axiosConfig';
class OrderScreen extends Component {
  static navigationOptions = {
    title: 'Order',
  };
  constructor(props) {
    super(props);
    this.state = {
      gender: false,
      hotDeal: false,
      orderType: '',
      hour: '',
      min: '',
      mark: this.props.route.params ? this.props.route.params.mk : '',
      lat:'',
      lng:'',
      money: '',
      ad: '',
      content:'',
      reservation:false,
    };
    this.onClickGetAddress();
  }

  onClickGetAddress = async () => {
    await axios
      .get('/api/v1/myinfo/address')
      .then((res) => {
        const lat =res.data.data.locX;
        const lng=res.data.data.locY;
        this.state.ad=res.data.data.address + ' ' + res.data.data.detailAddress;
        this.setState({lat: lat, lng:lng});
      })
      .catch((e) => {
        alert('배달 받을 주소를 등록해주세요!');
      });
      this.getMoney();
  };

  getMoney(){
    var cost=3000;
    var fee=parseFloat(this.getDistanceFromLatLonInKm(this.state.mark.y,
      this.state.mark.x,this.state.lat, this.state.lng))-1;
    if(fee>0) cost += Math.round((550 * fee / 0.5)/100)*100;
    if(this.state.hotDeal==true) cost+=1000;
    this.setState({money:cost});
  }

  getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(parseFloat(lat2)-parseFloat(lat1));  // deg2rad below
    const dLon = deg2rad(parseFloat(lng2)-parseFloat(lng1));
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(parseFloat(lat1))) * Math.cos(deg2rad(parseFloat(lat2))) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  }
  onClickOrder= async ()=>{
    try{
      if(this.state.orderType=="booking"){
        this.setState({reservation: true});
      }
    const data={
      storeName: this.state.mark.place_name,
      storeAddress: this.state.mark.address_name,
      storeDetailAddress: '',
      gender: this.state.gender,
      hotDeal: this.state.hotDeal,
      expHour: this.state.hour,
      expMinute: this.state.min,
      content: this.state.content,
      categoryName: this.state.mark.category_group_name,
      reservation: this.state.reservation,
      storeLat:this.state.mark.y,
      storeLng:this.state.mark.x,
      userLat:this.state.lat,
      userLng:this.state.lng
    }
    await axios
          .post('/api/v1/order', data)
          .then((response) => {
            alert(response.data.data.userId + '님. 주문이 접수되었습니다.');
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
    this.props.navigation.goBack(null);
  }catch(e){
    alert("error : "+ e);
  }
  }
  changeMoney=()=>{
    this.setState({hotDeal: !this.state.hotDeal})
    if(this.state.hotDeal==1) {
      this.setState({money: this.state.money-1000})
    }
    else{
      this.setState({money: this.state.money+1000})
    }
  }
  storeFunc=()=>{
    if(this.state.mark.place_name=='사용자 지정'){
      return(
        <TextInput placeholder="자세한 가게이름을 입력해주세요." style={styles.martTt}></TextInput>
      )
    }
    else{
      console.log("iun");
      return(
          <Text>{this.state.mark.place_name}</Text>
      )
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>요청할 가게</Text>
          {this.storeFunc()}
        </View>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>배달 요청 하기</Text>
          <TextInput placeholder="ex) 감자핫도그 3개요" style={styles.textInputBox} onChangeText={(content) => this.setState({content:content})}
        value={this.state.content} multiline={true} numberOfLines={5}/>
        </View>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>배달 받을 장소</Text>
          <Text>{this.state.ad}</Text>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <View>
              <Text style={styles.imageTitle}>동성 배달원 요청</Text>
              <Text style={styles.imageSubTitle}>
                미설정시 랜덤으로 배달원이 설정됩니다
              </Text>
            </View>
            <RadioButton
              value="gender"
              status={this.state.gender === true ? 'checked' : 'unchecked'}
              onPress={() => this.setState({gender: !this.state.gender})}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.imageTitle}>핫딜 신청</Text>
              <Text style={styles.imageSubTitle}>
                배달원의 배달건 리스트 맨 상단에 올라가게 됩니다(+1000원)
              </Text>
            </View>
            <RadioButton
              value="hotDeal"
              status={this.state.hotDeal === true ? 'checked' : 'unchecked'}
              onPress={() => this.changeMoney()}
            />
          </View>
        </View>
        <View style={styles.orderRadiobox}>
          <Text style={styles.imageTitle}>주문 유형</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>실시간</Text>
              <RadioButton
                value="realTime"
                status={
                  this.state.orderType === 'realTime' ? 'checked' : 'unchecked'
                }
                onPress={() => this.setState({orderType: 'realTime'})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>예약주문</Text>
              <RadioButton
                value="booking"
                status={
                  this.state.orderType === 'booking' ? 'checked' : 'unchecked'
                }
                onPress={() => this.setState({orderType: 'booking'})}
              />
            </View>
          </View>
        </View>
        {this.state.orderType !== 'booking' ? null : (
          <View style={styles.orderRadiobox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                placeholder="hour"
                placeholderTextColor="#e9967a"
                underlineColorAndroid="#e9967a"
                value={this.state.hour}
                onChangeText={(text) => this.setState({hour: text})}
              />
              <TextInput
                value="시간"
                editable={false}
                style={{color: 'black'}}
              />
              <TextInput
                placeholder="min"
                placeholderTextColor="#e9967a"
                underlineColorAndroid="#e9967a"
                value={this.state.min}
                onChangeText={(text) => this.setState({min: text})}
              />
              <TextInput
                value="분 후에 보내주세요!"
                editable={false}
                style={{color: 'black'}}
              />
            </View>
          </View>
        )}
        <View style={styles.rightBox}>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.imageTitle}>예상 배달비</Text>
            <Text>{this.state.money}원</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.onClickOrder();
          }}>
          <Text style={styles.panelButtonTitle}>신청하기</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  address: state.authentication.address,
});
const mapDispatchToProps = (dispatch) => ({
  requestOrder: (data) => dispatch(requestOrder(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
  },
  rightBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  radiobox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  orderRadiobox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  imageSubTitle: {
    fontSize: 10,
  },
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  martTt:{
    backgroundColor: '#fafad2',
    borderWidth: 3,
    borderColor: 'gray',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  textInputBox: {
    width: '100%',
    backgroundColor: '#fafad2',
    borderWidth: 3,
    borderColor: 'gray',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#8fbc8f',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
