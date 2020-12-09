import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Body} from 'native-base';

const seekDeliveryCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginBottom: 13,
        borderBottomColor: '#d2b48c',
      }}>
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
      <Text style={{fontSize: 14}}>{itemData.content}</Text>
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
});
