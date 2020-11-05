import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Left} from 'native-base';
import StarRating from './StarRating';
class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <ListItem thumbnail>
        <Left>
          <StarRating ratings={this.data.rating} />
        </Left>
        <Body>
          <Text style={{fontSize: 13}}>{this.data.content}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default ReviewItem;
