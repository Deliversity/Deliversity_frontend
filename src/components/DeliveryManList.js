import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Button} from 'native-base';
import {StyleSheet, View} from 'react-native';

class DeliveryManList extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  handleReview = () => {
    const {riderId} = this.data;
    //console.log(id);
    this.props.onPressReview({riderId});
  };
  handleSelect = () => {
    const {riderId} = this.data;
    //console.log(id);
    this.props.onPressSelect({riderId});
  };

  render() {
    return (
      <ListItem thumbnail>
        <Body>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textSize}>라이더 번호 {this.data.riderId}</Text>
          </View>
          <Text style={{fontSize: 13}}>
            (추가 배달비) {this.data.extraFee}원
          </Text>
        </Body>
        <Right>
          <View style={{flexDirection: 'row'}}>
            <Button transparent onPress={this.handleReview}>
              <Text>리뷰</Text>
            </Button>
            <Button transparent onPress={this.handleSelect}>
              <Text>결정</Text>
            </Button>
          </View>
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default DeliveryManList;
