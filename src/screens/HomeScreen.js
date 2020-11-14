import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Store from './StoreScreen';
import ChangeButton from '../components/ChangeButton';
type Props = {};
export default class App extends Component<Props> {
  onClickCategory = async (data) => {
    this.props.navigation.navigate('Store', {
      category: data,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.submitBtn}>
          <ChangeButton />
        </View>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 200, height: 200}}
          />
          <Text style={styles.text_header}>Deliversity</Text>
        </View>
        <View style={styles.footer}>
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
                    this.onClickCategory('약국');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="local-pharmacy" color={'#000000'} size={50} />
                    <Text style={styles.name}>약국</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
                    <Text style={styles.name}>세탁물</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.elem}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickCategory('음식점');
                  }}>
                  <View style={styles.profile}>
                    <Icon name="local-restaurant" color={'#000000'} size={50} />
                    <Text style={styles.name}>음식</Text>
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
                    this.onClickCategory('point_of_interest');
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
  userComment: {
    padding: 8,
    backgroundColor: '#ffd700',
    borderRadius: 5,
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
  },
});
