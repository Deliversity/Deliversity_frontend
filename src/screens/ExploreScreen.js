import React, {Component} from 'react';
import Postcode from 'react-native-daum-postcode';
import axios from '../axiosConfig';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';

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
    };
  }
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
  onClickSave = async () => {
    const data = {
      address: this.state.rootAddress,
      detailAddress: this.state.detailAddress,
      locX: '1',
      locY: '1',
      setDefault: '1',
    };
    console.log(data);
    await axios
      .post('api/v1/myinfo/address', data)
      .then(() => {
        alert('SUCCESS SAVE');
        this.props.navigation.goBack(null);
      })
      .catch((err) => {
        alert("CAN'T SAVE ADDRESS : " + err);
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
        <View style={styles.footer}>
          {this.state.rootAddress === '' ? null : (
            <View>
              <Text style={styles.textStyle}>
                {this.state.rootAddress} {this.state.buildingName}
              </Text>
              <View>
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
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
  },
  footer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    justifyContent: 'center',
    fontSize: 18,
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
