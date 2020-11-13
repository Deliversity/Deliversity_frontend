import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../axiosConfig';
import {connect} from 'react-redux';
import Mapping from './mapping';
class StoreScreen extends Component {
  static navigationOptions = {
    title: 'Store',
  };
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      category: this.props.route.params ? this.props.route.params.category : '', //카테고리 페이지에서 props로 가져온겁니다.
      address: this.props.address,
      markers: [],
    };
    console.log(this.state.category); // 카테고리명: 카테고리로 주변찾기 검색할 때 쓰세요
    this.onClickGetAddress();
  }
  onClickPostCode = async () => {
    this.props.navigation.navigate('Explore');
  };
  onClickGetAddress = async () => {
    await axios
      .get('/api/v1/myinfo/address')
      .then((res) => {
        const address =
          res.data.data.address + ' ' + res.data.data.detailAddress;
        this.setState({address: address});
      })
      .catch((e) => {
        alert('배달 받을 주소를 등록해주세요!');
      });
  };

  handler = (data) => {
    // console.log(data);
    this.setState({markers: data});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Text autoCapitalize="none" style={{flex: 1, padding: 0}}>
            등록된 위치:{' '}
            {this.props.address === ''
              ? this.state.address
              : this.props.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.onClickPostCode();
            }}>
            <Icon name="saved-search" size={30} />
          </TouchableOpacity>
        </View>
        <Mapping cat={this.state.category} handler={this.handler} />
        <View style={styles.listCon}>
          <ScrollView style={styles.scro}>
            {this.state.markers.map((marker, index) => (
              <View style={styles.listCon}>
                <Text style={styles.txt2}>{marker.name}</Text>
                <TouchableOpacity
                  style={styles.store}
                  onPress={() => {
                    this.props.navigation.navigate('Order', {
                      name: marker.name,
                    });
                  }}>
                  <Text style={styles.txt}>선택</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  address: state.authentication.address,
});
export default connect(mapStateToProps, {})(StoreScreen);
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
  listCon: {
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scro: {
    margin: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  store: {
    backgroundColor: '#F87C56',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  txt: {
    color: 'white',
  },
  txt2: {
    padding: 4,
    textAlign: 'center',
    paddingLeft: 20,
  },
});
