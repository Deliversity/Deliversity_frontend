import React, {Component, PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
// import MapView, {
//   PROVIDER_GOOGLE,
//   Marker,
//   AnimatedRegion,
//   Animated,
// } from 'react-native-maps';

import NaverMapView, {Region, Marker, Path, Polyline, Polygon} from "react-native-nmap";

import axiosInstance from '../axiosConfig';
import {SERVER_KEY,KAKAO_KEY} from '../../env/development.json';
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
      region:{latitude: 37.2794469469635, longitude: 127.047519717452},
     //  region: new AnimatedRegion({
     //    latitude: 37.2794469469635,
     //    longitude: 127.047519717452,
     //    latitudeDelta: 0.01,
     //    longitudeDelta: 0.002,
     //  }),
      markers: [],
    };
    this.check();
    this.getAddress();
//     console.log("여기 불림!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  }
  check = () => {
    if (this.state.category == '편의점') {
      return 'CS2';
    }
    if (this.state.category == '약국') {
      return 'PM9';
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
        });
      })
      .catch((e) => {
        alert('배달 주소를 먼저 등록해 주세요 ' + e);
      });
    this.fetchNearestPlacesFromKakao();
  };

  fetchNearestPlacesFromKakao = (current) => {
    if (current) {
         console.log("map move")
      this.setState({
        region: {
          latitude: current.latitude,
          longitude: current.longitude,
        }
      });
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
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    let data = {
     method:"GET",
     url:url,
     headers:{
          'Authorization': `KakaoAK ${KAKAO_KEY}`
     },
     params:{
          query:this.state.category,
          x:this.state.region.longitude,
          y:this.state.region.latitude,
          radius: radMetter,
          sort: "distance",
          }
     }
     if(this.check()) data.params.category_group_code = this.check()
     axios(data)
     .then(res=> res.data)
     .then((response)=>{
          // console.log(response)
          let marker = [];
          for (let idx of response.documents) {
               console.log(idx)
               console.log(idx.place_name)
               console.log(idx.category_name)
               console.log(idx.category_name.includes(this.state.category))
            if(!marker.find(t=>t===idx) && idx.category_name.includes(this.state.category)) marker.push(idx);
          }
          this.setState({markers: marker});
          this.sendMark();
          this.setState({dataIsRetruned: true});
     })
//     fetch(url)
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         //    console.log(res.results);
     //    let marker = [];
     //    for (let idx of res.results) {
     //      console.log(idx.types);
     //      if (idx.types.includes(this.check())) {
     //        marker.push(idx);
     //      }
     //    }
     //    this.setState({markers: marker});
     //    this.sendMark();
     //    this.setState({dataIsRetruned: true});
//       })
//       .catch((err) => {
//         console.log('error is ' + err);
//       });
  };

  sendMark = () => {
    this.props.handler(this.state.markers);
  };

  render() {
    return (
      <View style={style.container} onChange={this.sendMark}>
        <View style={style.container}>
          <NaverMapView style={{width: '100%', height: '100%'}}
                    showsMyLocationButton={true}
                    useTextureView={true}
                    center={{...this.state.region, zoom: 15}}
                    // onCameraChange={this.fetchNearestPlacesFromKakao}
                    // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                    onMapClick={this.fetchNearestPlacesFromKakao}
                    >
               {this.state.markers.map((marker,index)=>
                    <Marker
                    coordinate={{
                              latitude:parseFloat(marker.y),
                              longitude:parseFloat(marker.x)
                    }}
                    caption={{text:marker.place_name}}
                    subCaption={{text:marker.phone}}
                    />
               )}
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
