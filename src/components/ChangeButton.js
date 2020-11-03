import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {requestChangeUser} from '../store/actions/action';
import {connect} from 'react-redux';

//배달원 혹은 사용자로 탭 전환하는 버튼
class ChangeButton extends Component {
  constructor(props) {
    super(props);
  }
  onClickChange = async () => {
    // console.log(this.props.user);
    const data = '';
    if (this.props.user === '사용자') {
      this.data = '배달원';
    } else {
      this.data = '사용자';
    }
    await this.props.requestChangeUser(this.data);
  };
  render() {
    return (
      <View style={styles.profile}>
        <TouchableOpacity
          onPress={() => {
            this.onClickChange();
          }}>
          <Icon name="bubble-chart" color="#f4da6c" size={35} />
          <Text style={styles.text_header}>{this.props.user}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text_header: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
const mapStateToProps = (state) => ({
  user: state.authentication.user,
});
const mapDispatchToProps = (dispatch) => ({
  requestChangeUser: (data) => dispatch(requestChangeUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangeButton);