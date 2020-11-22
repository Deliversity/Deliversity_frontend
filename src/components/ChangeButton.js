import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {requestChangeUser} from '../store/actions/action';
import {connect} from 'react-redux';
import {getUserStorage, setUserStorage} from '../store/actions/action';
//배달원 혹은 사용자로 탭 전환하는 버튼
class ChangeButton extends Component {
  constructor(props) {
    super(props);
  }

  geo = () => {
    Geolocation.getCurrentPosition((position) => {
      axios.post('/api/v1/myinfo/currentLocation', position).then(() => true);
    });
  };

  async startPostPosition() {
    const timerId = setInterval(this.geo, 5 * 60000);
    await setUserStorage('timerId', timerId.toString());
  }

  async stopPostPosition() {
    const timerId = parseInt(await getUserStorage('timerId'));
    clearInterval(timerId);
  }

  onClickChange = async () => {
    // console.log(this.props.user);
    if (this.props.user === '사용자') {
      if (this.props.grade !== 2) {
        alert('등업 신청을 하세요!');
      } else {
        await this.props.requestChangeUser('배달원');
      }
    } else {
      await this.props.requestChangeUser('사용자');
    }
  };
  render() {
    return (
      <View style={styles.profile}>
        <TouchableOpacity
          onPress={() => {
            this.onClickChange();
            this.props.onPress();
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
  grade: state.authentication.grade,
});
const mapDispatchToProps = (dispatch) => ({
  requestChangeUser: (data) => dispatch(requestChangeUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangeButton);
