import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Left, Body} from 'native-base';

const chatCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginBottom: 13,
        borderBottomColor: '#d2b48c',
      }}>
      <Body>
        <View style={styles.profile}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            {itemData.order_id}
          </Text>
        </View>
      </Body>
      <Body>
        <Text style={{fontSize: 13}}>{itemData.guest_id}번님과 채팅하기</Text>
      </Body>
    </TouchableOpacity>
  );
};

export default chatCard;

const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // borderWidth: 5,
    // borderColor: 'pink',
    backgroundColor: '#ffd700',
  },
});
