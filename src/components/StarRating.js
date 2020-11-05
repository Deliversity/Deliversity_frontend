import React from 'react';
import {StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRating = (props) => {
  let stars = [];
  for (var i = 1; i <= 5; i++) {
    let name = 'star';
    if (i > props.ratings) {
      name = 'star-border';
    }
    stars.push(<Icon name={name} size={15} style={styles.star} key={i} />);
  }
  return <View style={styles.container}>{stars}</View>;
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FF8C00',
  },
});
