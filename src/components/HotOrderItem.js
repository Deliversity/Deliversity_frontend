import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Button, Left} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HotOrderItem extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    let arr = this.data.expArrivalTime.split(' ')[1];
    let hour = arr.split(':')[0];
    let min = arr.split(':')[1];
    this.time = hour + ':' + min;
  }
  handleSelect = () => {
    const {id} = this.data;
    console.log(id);
    //this.props.onSelect({id}); arrow-forward-io
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleSelect();
        }}>
        <ListItem thumbnail>
          <Body>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.textSize}>{this.data.storeName}</Text>
              {this.data.reservation === false ? null : (
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.reservationBox}>
                    <Text style={styles.bookingStyle}>예약</Text>
                  </View>
                  <Text style={styles.bookingStyle}>{this.time}</Text>
                </View>
              )}
            </View>
            <Text style={{fontSize: 13}}>{this.data.content}</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.handleSelect}>
              <Icon name="chevron-right" size={30} />
            </Button>
          </Right>
        </ListItem>
      </TouchableOpacity>
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

export default HotOrderItem;
