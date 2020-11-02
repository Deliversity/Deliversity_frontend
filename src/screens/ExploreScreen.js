import React, {Component} from 'react';
import Postcode from 'react-native-daum-postcode';
import axios from '../axiosConfig';
import {StyleSheet, TouchableOpacity, View, TextInput} from 'react-native';
import {List, Text} from 'native-base';
import DataItem from '../components/DataItem';
import {connect} from 'react-redux';
import {requestUpdateAddress} from '../store/actions/action';
class ExploreScreen extends Component {
  static navigationOptions = {
    title: 'Explore',
  };
  constructor(props) {
    super(props);
    this.state = {
      rootAddress: '',
      buildingName: '',
      detailAddress: '',
      addressBook: '',
      selectedAddress: '',
      addressId: '',
    };
    this.onClickGetAddress();
  }
  onClickGetAddress = async () => {
    const data = await axios.get('/api/v1/myinfo/address/list');
    //console.log(data.data.data);
    const addressBook = data.data.data;
    this.setState({addressBook: addressBook});
  };
  //rootaddress설정
  onClickSubmit = async (data) => {
    try {
      this.setState({
        rootAddress: data.address,
        buildingName: data.buildingName,
      });
    } catch (e) {
      alert('error' + e);
    }
  };
  //주소록에 추가
  onClickSave = async () => {
    const data = {
      address: this.state.rootAddress,
      detailAddress: this.state.detailAddress,
      setDefault: '0',
    };

    this.setState({
      rootAddress: '',
    });
    console.log(data);
    await axios
      .post('api/v1/myinfo/address', data)
      .then(() => {
        alert('SUCCESS SAVE');
        this.onClickGetAddress();
      })
      .catch((err) => {
        alert("CAN'T SAVE ADDRESS : " + err);
      });
  };

  handleItemDataonSelect = (articleData) => {
    const data = {
      addressId: articleData.id,
    };
    axios.put('/api/v1/myinfo/address/set', data).then((res) => {
      alert('해당 위치로 설정되었습니다.');
      this.props.requestUpdateAddress(articleData.address);
      this.props.navigation.goBack();
    });
  };

  handleItemDataonDelete = (articleData) => {
    const data = {
      addressId: articleData.id,
    };
    console.log(data);
    axios({
      url: '/api/v1/myinfo/address/',
      data: data,
      method: 'delete',
    }).then((res) => {
      alert('삭제되었습니다.');
      this.onClickGetAddress();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Postcode
            jsOptions={{animated: true}}
            onSelected={(data) => this.onClickSubmit(data)}
          />
        </View>
        {this.state.rootAddress === '' ? (
          <View style={styles.center}>
            <List
              dataArray={this.state.addressBook}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => {
                return (
                  <DataItem
                    onSelect={this.handleItemDataonSelect}
                    onDelete={this.handleItemDataonDelete}
                    data={item}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.textStyle}>
              {this.state.rootAddress} {this.state.buildingName}
            </Text>
            <TextInput
              placeholder="상세주소 입력하기"
              placeholderTextColor="#e9967a"
              underlineColorAndroid="#e9967a"
              autoCorrect={false}
              value={this.state.detailAddress}
              style={[styles.textInput]}
              onChangeText={(text) => this.setState({detailAddress: text})}
            />
            <TouchableOpacity
              onPress={() => {
                this.onClickSave();
              }}>
              <Text style={styles.panelButtonTitle}>저장</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  address: state.authentication.address,
});
const mapDispatchToProps = (dispatch) => ({
  requestUpdateAddress: () => dispatch(requestUpdateAddress()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
  },
  center: {
    flex: 1,
  },
  footer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    justifyContent: 'center',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 5,
  },
  textInput: {
    marginBottom: 10,
    paddingLeft: 10,
    color: '#05375a',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#e9967a',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
