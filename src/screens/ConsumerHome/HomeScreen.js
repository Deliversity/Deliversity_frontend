import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Store from './StoreScreen';
import axios from '../../axiosConfig';
import ChangeButton from '../../components/ChangeButton';
import Geolocation from '@react-native-community/geolocation';
import {setUserStorage} from '../../store/actions/action';
import HomeInfo from '../../../assets/homeDetail.png';
type Props = {};
const minusHeight = Platform.OS === 'ios' ? 123 : 14;
const {width, height} = Dimensions.get('window');
export default class App extends Component<Props> {
  state = {
    modalVisible: true,
  };

  onClickCategory = async (data) => {
    this.props.navigation.navigate('Store', {
      category: data,
    });
  };

  geo = async () => {
    Geolocation.getCurrentPosition(async (position) => {
      await axios.post('/api/v1/myinfo/currentLocation', position);
    });
  };

  startPostPosition = async () => {
    console.log('geo');
    const timerId = setInterval(this.geo, 1000 * 60 * 3);
    await setUserStorage('timerId', timerId.toString());
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.submitBtn}>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: false})}
            style={{marginRight: 10, marginTop: 10}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: 6,
                fontSize: 15,
              }}>
              ❓
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 11}}>
              도움말
            </Text>
          </TouchableOpacity>
          <ChangeButton onPress={this.startPostPosition} />
        </View>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/Deliver2.png')}
            
          />
        </View>
        <View style={styles.footer}>
          <Text style={{textAlign: 'center', fontSize: 15}}>
            카테고리를 선택하여 주문을 시작하세요!
          </Text>
          <View
            style={{
              alignSelf: 'center',
              borderTopWidth: 5,
              borderTopColor: '#8fbc8f',
              width: '85%',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          />
          <View style={styles.content}>
            <View style={styles.elem}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('편의점');
                  }}>
                  <View style={styles.profile}>
                    <Icon
                      name="local-convenience-store"
                      color={'#000000'}
                      size={50}
                    />
                    <Text style={styles.name}>편의점</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('커피전문점');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="local-cafe" color={'#000000'} size={50} />
                    <Text style={styles.name}>카페</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('음식점');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="local-restaurant" color={'#000000'} size={50} />
                    <Text style={styles.name}>음식점</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.elem}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('세탁소');
                  }}>
                  <View style={styles.profile}>
                    <Icon
                      name="local-laundry-service"
                      color={'#000000'}
                      size={50}
                    />
                    <Text style={styles.name}>세탁소</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('문구');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="local-printshop" color={'#000000'} size={50} />
                    <Text style={styles.name}>문구점</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('기타');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="add" color={'#ffff'} size={50} />
                    <Text style={styles.name}>기타</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible === false}>
          <View style={{opacity: 0.7, backgroundColor: 'white'}}>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: true})}
              style={{marginLeft: 10, marginTop: 10}}>
              <Icon name="clear" color={'#000000'} size={25} />
            </TouchableOpacity>
            <Image
              source={HomeInfo}
              style={{height: height - minusHeight, width: width}}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },

  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ffd700',
  },
  name: {
    fontWeight: 'bold',
  },
  submitBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});
