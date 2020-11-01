import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Button} from 'native-base';
import {StyleSheet} from 'react-native';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  handleSelect = () => {
    const {id} = this.data;
    this.props.onSelect({id});
  };

  render() {
    return (
      <ListItem thumbnail>
        <Body>
          <Text>CU 편의점</Text>
          <Text>감자 핫도그 3개요</Text>
        </Body>
        <Right>
          <Button transparent onPress={this.handleSelect}>
            <Text style={styles.textSize}>SELECT</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 11,
  },
});

export default OrderItem;
