import React, {Component} from 'react';
import {ListItem, Right, Body, Text, Button} from 'native-base';
import {StyleSheet} from 'react-native';

class DataItem extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
    }
    handleDelete = () => {
        const {id, address} = this.data;
        this.props.onDelete({id, address});
    };
    handleSelect = () => {
        const {id, address} = this.data;
        this.props.onSelect({id, address});
    };

    render() {
        return (
            <ListItem thumbnail>
                <Body>
                    <Text>{this.data.address}</Text>
                    <Text>{this.data.detailAddress}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={this.handleSelect}>
                        <Text style={styles.textSize}>SELECT</Text>
                    </Button>
                    <Button transparent onPress={this.handleDelete}>
                        <Text style={styles.textSize}>DELETE</Text>
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

export default DataItem;
