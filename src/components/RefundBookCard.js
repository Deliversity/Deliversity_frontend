import React from 'react';
import {View, Text} from 'react-native';
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
        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {itemData.createdAt}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 15}}>
          {itemData.accountName}님{'  '}
        </Text>
        <Text style={{fontSize: 15}}>
          {itemData.bankKind}은행({itemData.accountNum})
        </Text>
      </View>
    </View>
  );
};

export default paymentBookCard;
