import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from '../axiosConfig';
import NaverMapView, {
  Region,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import useInterval from '../useInterval';
function CourierLocationScreen(props) {
  let [P2, setP2] = useState({
    latitude: parseFloat(props.route.params.storeLat),
    longitude: parseFloat(props.route.params.storeLng),
  });
  let [center, setCenter] = useState({
    latitude:
      (parseFloat(props.route.params.storeLat) +
        parseFloat(props.route.params.myLat)) /
      2,
    longitude:
      (parseFloat(props.route.params.storeLng) +
        parseFloat(props.route.params.myLng)) /
      2,
  });
  useInterval(async () => {
    //실제는 이걸 사용.
    // await axios
    //   .get(`/api/v1/order/riderloc?orderId=${props.route.params.orderID}`)
    //   .then((res) => {
    //     setP2({
    //       ...P2,
    //       latitude: parseFloat(res.data.data.lat),
    //       longitude: parseFloat(res.data.data.lng),
    //     });
    //     console.log('hi!');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // 테스트용입니다. (30초 단위로 update)
    setP2({
      ...P2,
      latitude: P2.latitude - 0.0001,
      longitude: P2.longitude + 0.0001,
    });
    console.log('hi!');
  }, 1000 * 30);
  return (
    <View style={styles.container}>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        useTextureView={true}
        center={{...center, zoom: 15}}>
        <Marker
          coordinate={{
            latitude: parseFloat(props.route.params.myLat),
            longitude: parseFloat(props.route.params.myLng),
          }}
          caption={{text: '나의집'}}
          onClick={() => console.warn('onClick! p0')}
        />
        <Marker
          coordinate={{
            latitude: parseFloat(props.route.params.storeLat),
            longitude: parseFloat(props.route.params.storeLng),
          }}
          pinColor="blue"
          caption={{text: props.route.params.storeName}}
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          caption={{text: '배달원'}}
          onClick={() => console.warn('onClick! p2')}
        />
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourierLocationScreen;
