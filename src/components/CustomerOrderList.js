import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Button, Left} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CustomerOrderList extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    if (this.data.orderStatus === '0') {
      this.text = '주문접수 완료';
    } else{
      this.text = '배달원 선택 완료';
    }
  }
  handleSelect = () => {
    const {id} = this.data;
    this.props.onPress({id});
  };

  render() {
    return (
      <ListItem thumbnail>
        <Body>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textSize}>{this.data.storeName}</Text>
            <View style={styles.reservationBox}>
              <Text style={styles.bookingStyle}>{this.text}</Text>
            </View>
          </View>
          <Text style={{fontSize: 13}}>{this.data.content}</Text>
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

const styles = StyleSheet.create({
  textSize: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  bookingStyle: {
    fontSize: 13,
    color: '#ff7f50',
    marginLeft: 10,
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#ff7f50',
    marginLeft: 6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default CustomerOrderList;
