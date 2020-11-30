import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Right, Body, Text, Button} from 'native-base';
const addressBook = ({itemData, handleDelete, handleSelect}) => {
  return (
    <ListItem thumbnail>
      <Body>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>
          {itemData.address}
        </Text>
        <Text style={{fontSize: 13}}>{itemData.detailAddress}</Text>
      </Body>
      <Right>
        <Button transparent onPress={handleSelect}>
          <Text style={styles.textSize}>SELECT</Text>
        </Button>
        <Button transparent onPress={handleDelete}>
          <Text style={styles.textSize}>DELETE</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

export default addressBook;
const styles = StyleSheet.create({
  textSize: {
    fontSize: 11,
  },
});
