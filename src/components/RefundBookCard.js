import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const paymentBookCard = ({itemData, onPress}) => {
  return (
    <View
      onPress={onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#fffafa',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#ff7f50'}}>
            + {itemData.amount}원
          </Text>
          <View
            style={{
              borderTopWidth: 4,
              borderTopColor: '#48D1CC',
              width: '100%',
              borderTopRightRadius: 15,
              marginTop: 3,
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 15}}>
            {itemData.accountName}님{'  '}
          </Text>
          <Text style={{fontSize: 15}}>
            {itemData.bankKind}은행({itemData.accountNum})
          </Text>
        </View>
        {itemData.status == '0' && (
          <View style={styles.reservationBox}>
            <Text style={styles.bookingStyle}>환급전</Text>
          </View>
        )}
        {itemData.status == '1' && (
          <View style={styles.reservationBox}>
            <Text style={styles.bookingStyle}>환급완료</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default paymentBookCard;
const styles = StyleSheet.create({
  bookingStyle: {
    fontSize: 13,
    color: '#48D1CC',
      fontWeight: 'bold'
  },
  reservationBox: {
    borderWidth: 3,
    borderColor: '#48D1CC',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
