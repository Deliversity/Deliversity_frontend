import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {requestLogout} from '../store/actions/action';
import {connect} from 'react-redux';
class MyPageScreen extends Component {
  constructor(props) {
    super(props);
  }
  onClickLogout = async () => {
    await this.props.requestLogout();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>MyPage</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.onClickLogout();
            }}>
            <Text style={styles.textSize}>🔐 LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffd700',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const mapStateToProps = (state) => ({
  token: state,
});
const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
