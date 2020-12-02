import React, {Component, useState} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import axios from '../axiosConfig';
import Card from '../components/paymentBookCard';
class PaymentBookScreen extends Component {
  static navigationOptions = {
    title: 'PaymentBook',
  };
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      refreshing: false,
    };
  }
  componentDidMount(): void {
    this.getPaymentList();
  }

  onRefresh = async () => {
    await this.getPaymentList();
  };
  getPaymentList = async () => {
    try {
      this.setState({refreshing: true});
      await axios
        .get('/api/v1/myinfo/paids')
        .then((res) => {
          this.setState({
            content: res.data.data,
            refreshing: false,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (e) {
      alert('error' + e);
    }
  };
  renderItem = ({item}) => {
    return <Card itemData={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <View style={styles.write}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              extraData={this.state}
              data={this.state.content}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'column',
  },
  write: {
    marginTop: 10,
  },
});

export default PaymentBookScreen;
