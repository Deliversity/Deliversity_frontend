import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PostCode from '../components/PostCode';
import axios from '../axiosConfig';
class StoreScreen extends Component {
  static navigationOptions = {
    title: 'Store',
  };
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.route.params ? this.props.route.params.category : '',
      address: '',
    };
    console.log(this.state.category);
    this.onClickGetAddress();
  }
  onClickPostCode = async () => {
    this.props.navigation.navigate('PostCode');
  };
  onClickGetAddress = async () => {
    const address = await axios.get('/api/v1/myinfo/address/list');
    const data = address.data.data;
    console.log(data.address);
    this.setState({address: address.data.data.address});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Text autoCapitalize="none" style={{flex: 1, padding: 0}}>
            등록된 위치: 원천동
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.onClickPostCode();
            }}>
            <Icon name="saved-search" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default StoreScreen;
const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
