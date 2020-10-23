import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//배달원 혹은 사용자로 탭 전환하는 버튼
export default function ChangeButton() {
  return (
    <View style={styles.profile}>
      <Icon name="bubble-chart" color="#f4da6c" size={35} />
      <Text style={styles.text_header}>사용자</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text_header: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
