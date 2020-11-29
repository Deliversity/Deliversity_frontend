import React, {Component, PropTypes, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
// import MapView, {
//   PROVIDER_GOOGLE,
//   Marker,
//   AnimatedRegion,
//   Animated,
// } from 'react-native-maps';

import NaverMapView, {
  Region,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

import axiosInstance from '../axiosConfig';
import {SERVER_KEY, KAKAO_KEY} from '../../env/development.json';
import axios from 'axios';

class Mapping extends Component {
  static navigationOptions = {
    title: 'Map',
  };
  constructor(props) {
    super(props);
    //     this.sendMark = this.sendMark.bind(this);
    this.state = {
      dataIsRetruned: false,
      category: this.props.cat,
      region: {latitude: 37.2794469469635, longitude: 127.047519717452},
      markers: [],
      address: '',
      query: this.props.cat,
    };
    this.check();
    this.getAddress();
    //     console.log("여기 불림!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  }
  check = () => {
    if (this.state.category == '편의점') {
      return 'CS2';
    }
    if (this.state.category == '카페') {
      return 'CE7';
    }
    if (this.state.category == '세탁소') {
      return null;
    }
    if (this.state.category == '음식점') {
      return 'FD6';
    }
    if (this.state.category == '문구점') {
      return null;
    }
  };
  getAddress = async () => {
    await axiosInstance
      .get('/api/v1/myinfo/address')
      .then((res) => {
        this.setState({
          region: {
            latitude: parseFloat(res.data.data.locX),
            longitude: parseFloat(res.data.data.locY),
          },
          address: res.data.data.address + ' ' + res.data.data.detailAddress,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    this.fetchNearestPlacesFromKakao();
  };

  fetchNearestPlacesFromKakao = (current) => {
    if (current) {
      console.log('map move' + current.x + ' ' + current.y);
      this.setState({
        region: {
          latitude: current.latitude,
          longitude: current.longitude,
        },
      });
      if (this.state.category == '기타') {
        Alert.alert(
          '',
          'Marker?',
          [
            {text: 'Cancel'},
            {
              text: 'OK',
              onPress: () => {
                console.log('chagne);');
                var p = this.state.markers;
                p.push({
                  x: current.longitude,
                  y: current.latitude,
                  place_name: '사용자 지정',
                });
                this.setState({markers: p});
                this.sendMark();
              },
            },
          ],
          {cancelable: false},
        );
      }
    }

    const latitude = this.state.region.latitude; // you can update it with user's latitude & Longitude
    const longitude = this.state.region.longitude;

    console.log(latitude, longitude);
    let radMetter = 1000; // Search withing 2 KM radius
    const a = [
      'convenience_store',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ];
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    let data = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
      },
      params: {
        query: this.state.query,
        x: this.state.region.longitude,
        y: this.state.region.latitude,
        radius: radMetter,
        sort: 'distance',
      },
    };
    if (this.check()) {
      data.params.category_group_code = this.check();
    }
    axios(data)
      .then((res) => res.data)
      .then((response) => {
        // console.log(response)
        let marker = [];
        for (let idx of response.documents) {
          // console.log(idx)
          // console.log(idx.place_name)
          // console.log(idx.category_name)
          // console.log(idx.category_name.includes(this.state.category))
          if (
            !marker.find((t) => t === idx) &&
            idx.category_name.includes(this.state.category)
          ) {
            marker.push(idx);
          }
        }
        this.setState({markers: marker});
        this.sendMark();
        this.setState({dataIsRetruned: true});
      });
  };

  sendMark = () => {
    this.props.handler(this.state.markers);
  };
  updateCategory = (value) => {
    console.log(value);
    this.setState({query: value});
    this.fetchNearestPlacesFromKakao();
  };

  render() {
    if (this.state.address != this.props.ad && this.props.ad != '') {
      this.getAddress();
    }

    // console.log(this.state.markers);

    return (
      <View style={style.container} onChange={this.sendMark}>
        <View style={style.container}>
          <NaverMapView
            style={{width: '100%', height: '100%'}}
            showsMyLocationButton={true}
            useTextureView={true}
            center={{...this.state.region, zoom: 15}}
            //onCameraChange={this.fetchNearestPlacesFromKakao}
            //onCameraChange={e => this.fetchNearestPlacesFromKakao(e)}
            onMapClick={this.fetchNearestPlacesFromKakao}
            //onTouch={this.fetchNearestPlacesFromKakao}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                coordinate={{
                  latitude: parseFloat(marker.y),
                  longitude: parseFloat(marker.x),
                }}
                caption={{text: marker.place_name}}
                subCaption={{text: marker.phone}}
                key={index}
              />
            ))}
          </NaverMapView>
        </View>
      </View>
    );
  }
}

export default Mapping;

const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 2,
  },
});
