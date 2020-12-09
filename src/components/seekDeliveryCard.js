import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Body} from 'native-base';

const seekDeliveryCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.textSize}>{itemData.storeName}</Text>
        {itemData.reservation === false ? null : (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.reservationBox}>
              <Text style={styles.bookingStyle}>예약</Text>
            </View>
            <Text style={styles.bookingStyle}>
              {itemData.expArrivalTime.split(' ')[1].split(':')[0]}:
              {itemData.expArrivalTime.split(' ')[1].split(':')[1]}
            </Text>
          </View>
        )}
      </View>
      <Text style={{fontSize: 14, marginTop: 2}}>{itemData.content}</Text>
    </TouchableOpacity>
  );
};

export default seekDeliveryCard;

const styles = StyleSheet.create({
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
    marginRight: 5,
  },
  mainStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 6,
    shadowColor: 'darkgray',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
