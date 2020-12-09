import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const manageDeliveryCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainStyle}>
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
            {itemData.orderStatus === '3' &&
              itemData.reviewedByRider === false && (
                <Text style={styles.bookingStyle}>후기 작성 하기</Text>
              )}
            {itemData.orderStatus === '3' &&
              itemData.reviewedByRider === true && (
                <Text style={styles.bookingStyle}>후기 작성 완료</Text>
              )}
          </View>
          {itemData.reservation === false ? null : (
            <Text style={styles.bookingStyle2}>
              {itemData.expArrivalTime.split(' ')[1].split(':')[0]}:
              {itemData.expArrivalTime.split(' ')[1].split(':')[1]}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 4,
          borderTopColor: '#4682b4',
          width: '35%',
          borderTopRightRadius: 15,
        }}
      />
      <View style={{marginTop: 5}}>
        <Text style={{fontSize: 16}}>{itemData.storeName} </Text>
        <Text>
          {itemData.storeAddress} {itemData.storeDetailAddress}
        </Text>
      </View>
      <View style={styles.cardBox}>
        <Text
          style={{
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
            paddingVertical: 5,
          }}>
          {itemData.content}
        </Text>
      </View>
      <View style={styles.cardBox}>
        <Text note style={{fontWeight: 'bold'}}>
          🏠{itemData.address} {itemData.detailAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default manageDeliveryCard;

const styles = StyleSheet.create({
  bookingStyle: {
    fontSize: 13,
    color: '#ff7f50', //ff7f50
    paddingHorizontal: 5,
  },
  reservationBox: {
    borderWidth: 2,
    borderColor: '#ff7f50',
    paddingHorizontal: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginRight: 5,
  },
  bookingStyle2: {
    fontSize: 13,
    color: '#ff7f50',
  },
  cardBox: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 4,
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
    width: '96%',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
