import React from 'react';
import Postcode from 'react-native-daum-postcode';
export default function PostCode(props) {
  return (
    <Postcode
      jsOptions={{animated: true}}
      onSelected={(data) => alert(JSON.stringify(data))}
    />
  );
}
