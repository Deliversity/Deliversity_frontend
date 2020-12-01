import React from 'react';
import {View, Text} from 'react-native';
import StarRating from './StarRating';
const myReviewCard = ({itemData, onPress}) => {
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
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#ff7f50'}}>
            {itemData.nickName}님
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>으로 부터</Text>
        </View>
        <StarRating ratings={itemData.rating} />
      </View>
      <View
        style={{
          borderTopWidth: 4,
          borderTopColor: '#f4da6c',
          width: '35%',
          borderTopRightRadius: 15,
          marginBottom: 5,
        }}
      />
      <Text style={{fontSize: 15}}>{itemData.content}</Text>
    </View>
  );
};

export default myReviewCard;
