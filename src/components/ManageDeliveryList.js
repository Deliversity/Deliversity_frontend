import React, {Component} from 'react';
import {
  ListItem,
  Right,
  Body,
  Text,
  Button,
} from 'native-base';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class ManageDeliveryList extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    if (this.data.orderStatus === '1') {
      this.text = '배달원 선발 완료';
    } else if (this.data.orderStatus === '2') {
      this.text = '배달중';
    } else if (this.data.orderStatus === '3') {
      this.text = '배달 완료';
    } else {
      this.text = '후기 작성 완료';
    }
    let arr = this.data.expArrivalTime.split(' ')[1];
    let hour = arr.split(':')[0];
    let min = arr.split(':')[1];
    this.time = hour + ':' + min;
  }
  handlePress = () => {
    const {id} = this.data;
    this.props.onPress({id});
  };

  render() {
    return (
      <ListItem>
        <Body>
          <View style={{flexDirection: 'row'}}>
            <Text>주문번호: {this.data.id}</Text>
            <View style={styles.reservationBox}>
              <Text style={styles.bookingStyle}>{this.text}</Text>
            </View>
            {this.data.reservation === false ? null : (
              <View style={styles.reservationBox}>
                <Text style={styles.bookingStyle2}>{this.time}</Text>
              </View>
            )}
          </View>
          <View style={this.cardBox}>
            <Text note>가게명: {this.data.storeName}</Text>
            <Text note>
              {this.data.storeAddress} {this.data.storeDetailAddress}
            </Text>
          </View>
          <View style={this.cardBox}>
            <Text note style={{color: '#ff7f50'}}>
              고객님 주소
            </Text>
            <Text note style={{color: '#ff7f50'}}>
              {this.data.address} {this.data.detailAddress}
            </Text>
          </View>
        </Body>
        <Right>
          <Button transparent onPress={this.handleSelect}>
            <Icon name="chevron-right" size={30} />
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default ManageDeliveryList;

const styles = StyleSheet.create({
  bookingStyle: {
    fontSize: 13,
    color: '#6495ed',
    paddingHorizontal: 5,
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#6495ed',
    marginLeft: 6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bookingStyle2: {
    fontSize: 13,
    color: '#6495ed',
  },
  cardBox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ff7f50',
  },
});
