import {WebView} from 'react-native-webview'
import React, {useEffect} from 'react';

const mapping =()=>{
    const {kakao} = window;
    useEffect(()=>{
        const container = document.getElementById('myMap');
        const options={
            center: new kakao.map.LatLng(33.45, 126.57),
            level:3
        };
        const map=new kakao.maps.Map(container, options);
    }, []);
    return(
        <div id='myMap' stype={{
            width: '500px',
            height: '500px'
        }}>

        </div>
    )
}

export default mapping;