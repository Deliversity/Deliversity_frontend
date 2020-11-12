import React, {Component, PropTypes } from 'react';
import {View, StyleSheet } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated} from 'react-native-maps';
import axiosInstance from '../axiosConfig';
import {SERVER_KEY}from '../../env/development.json';
class Mapping extends Component{
    static navigationOptions = {
    title: 'Map',
  };
     constructor(props){
        super(props);
        this.sendMark=this.sendMark.bind(this);
          this.state={
              dataIsRetruned : false,
              category: this.props.cat,
              region: new AnimatedRegion({
                latitude: 52,
                longitude: 2,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
              }),
               markers: []
          };
         // console.log(this.state.category);
          this.getAddress();         
     };

     getAddress = async () => {
          await axiosInstance
            .get('/api/v1/myinfo/address')
            .then((res) => {
                 this.setState({
                      region:{
                           latitude: parseFloat(res.data.data.locX),
                           longitude: parseFloat(res.data.data.locY),
                           latitudeDelta: 0.0922,
                           longitudeDelta:0.0421
                      }
                 });                 
            })
            .catch((e) => {
              alert('배달 주소를 먼저 등록해 주세요 ' + e);
            });
            this.fetchNearestPlacesFromGoogle();
        };

        fetchNearestPlacesFromGoogle = () => {
          const latitude = this.state.region.latitude; // you can update it with user's latitude & Longitude
          const longitude = this.state.region.longitude;
          console.log(latitude, longitude);
          let radMetter = 3 * 1000; // Search withing 2 KM radius
      
          const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key='+SERVER_KEY;
         fetch(url)
         .then(res=>{
            return res.json()
         })
         .then(res=>{
             //console.log(res.results);
             for(let idx of res.results){
                //console.log(idx.types);
                 if(idx.types[0]==this.state.category){
                     //var shop=idx;
                     var a=this.state.markers;
                     a.push(idx);
                     this.setState({markers: a})
                     //console.log(this.state.markers);
                 }
             }
             this.sendMark();
             this.setState({dataIsRetruned: true});
         })
         .catch(err =>{
              console.log("error is "+err);
         });
        }

        sendMark=()=>{
            this.props.handler(this.state.markers);
        }

     render(){ 
          return(
          <View style={style.container} onChange={this.sendMark}>
               <View style={style.container}>
               <Animated 
               style={style.map} 
               provider={PROVIDER_GOOGLE}
               region={this.state.region}
               >
            {this.state.markers.map((marker, index) => (
            <Marker
            key={index}
            coordinate={{latitude:marker.geometry.location.lat, longitude:marker.geometry.location.lng}}
            title={marker.name}
            description={marker.vicinity}
            /> 
            ))}
       </Animated>
       </View>
       
       </View>
       )
     }
}

export default Mapping;

const style=StyleSheet.create({
     map:{
          ... StyleSheet.absoluteFillObject,
     },
     container:{
          flex:2,
     },
});