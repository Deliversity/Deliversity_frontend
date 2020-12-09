import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const chatCard = ({itemData, onPress, onPressDelete}) => {
  return (
    <View style={styles.mainStyle}>
      <View
        style={{
          marginBottom: 13,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.profile}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {itemData.order_id}
            </Text>
          </View>
          <Text style={{fontSize: 13, marginTop: 15, marginLeft: 10}}>
            {itemData.guest_id}번님과 채팅하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 13}} onPress={onPressDelete}>
          <Icon name="exit-to-app" size={25} />
        </TouchableOpacity>
      </View>
    </View>
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
  mainStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
});
