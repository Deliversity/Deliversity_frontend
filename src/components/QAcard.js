import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const QAcard = ({itemData, onPress}) => {
  return (
    <View
      onPress={onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#fffafa',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#005687'}}>
          {itemData.qnaKind}
        </Text>
        {itemData.status == '0' && (
          <View style={styles.reservationBox}>
            <Text style={styles.bookingStyle}>답변전</Text>
          </View>
        )}
        {itemData.status == '1' && (
          <View style={styles.reservationBox}>
            <Text style={styles.bookingStyle}>답변완료</Text>
          </View>
        )}
      </View>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>{itemData.content}</Text>
      {itemData.status == '1' && (
        <Text
          style={{
            fontSize: 14,
            backgroundColor: 'lightgray',
            padding: 10,
            borderWidth: 3,
            borderColor: '#005687',
            borderRadius: 15,
            marginTop: 10,
          }}>
          답변:{'\n'}
          {itemData.answer}
        </Text>
      )}
    </View>
  );
};

export default QAcard;
const styles = StyleSheet.create({
  bookingStyle: {
    fontSize: 12,
    color: '#005687',
    fontWeight: 'bold',
  },
  reservationBox: {
    borderWidth: 3,
    borderColor: '#005687',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
