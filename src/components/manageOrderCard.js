import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const manageOrderCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainStyle}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          주문번호: {itemData.id}
        </Text>
        <View style={styles.reservationBox}>
          {itemData.orderStatus === '0' && (
            <Text style={styles.bookingStyle}>주문접수 완료</Text>
          )}
          {itemData.orderStatus === '1' && (
            <Text style={styles.bookingStyle}>배달원 선택 완료</Text>
          )}
          {itemData.orderStatus === '2' && (
            <Text style={styles.bookingStyle}>배달중</Text>
          )}
          {itemData.orderStatus === '3' &&
            itemData.reviewedByUser === false && (
              <Text style={styles.bookingStyle}>후기 작성 하기</Text>
            )}
          {itemData.orderStatus === '3' && itemData.reviewedByUser === true && (
            <Text style={styles.bookingStyle}>후기 작성 완료</Text>
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
      <Text style={styles.textSize}>{itemData.storeName}</Text>
      <Text style={{fontSize: 13}}>{itemData.content}</Text>
    </TouchableOpacity>
  );
};

export default manageOrderCard;

const styles = StyleSheet.create({
  textSize: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
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
  },
  mainStyle: {
    paddingHorizontal: 24,
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
