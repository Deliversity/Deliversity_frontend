import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const manageDeliveryCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{paddingHorizontal: 25, paddingVertical: 20, borderBottomWidth: 2, borderBottomColor:'#fffafa'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          주문번호: {itemData.id}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.reservationBox}>
            {itemData.orderStatus === '1' && (
              <Text style={styles.bookingStyle}>배달원 선발 완료</Text>
            )}
            {itemData.orderStatus === '2' && (
              <Text style={styles.bookingStyle}>배달중</Text>
            )}
            {itemData.orderStatus === '3' && (
              <Text style={styles.bookingStyle}>후기 작성 하기</Text>
            )}
            {itemData.orderStatus === '3' && (
              <Text style={styles.bookingStyle}>후기 작성 완료</Text>
            )}
          </View>
          {itemData.reservation === false ? null : (
            <View style={styles.reservationBox}>
              <Text style={styles.bookingStyle2}>
                {itemData.expArrivalTime.split(' ')[1].split(':')[0]}:
                {itemData.expArrivalTime.split(' ')[1].split(':')[1]}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.cardBox}>
        <Text note>가게명: {itemData.storeName}</Text>
        <Text note>
          {itemData.storeAddress} {itemData.storeDetailAddress}
        </Text>
      </View>
      <View style={styles.cardBox}>
        <Text note style={{color: '#ff7f50'}}>
          {itemData.address} {itemData.detailAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default manageDeliveryCard;

const styles = StyleSheet.create({
  bookingStyle: {
    fontSize: 13,
    color: '#6495ed',
    paddingHorizontal: 5,
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#6495ed',
    paddingHorizontal: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginRight: 5,
  },
  bookingStyle2: {
    fontSize: 13,
    color: '#6495ed',
  },
  cardBox: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 4,
  },
});
