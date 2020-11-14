import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Text} from 'native-base';
import axios from '../axiosConfig';
import {connect} from 'react-redux';
class WriteReviewScreen extends Component {
  static navigationOptions = {
    title: 'WriteReview',
  };
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      comment: '',
    };
  }
  onClickSendReview = async () => {
    const data = {
      orderId: this.props.route.params.orderID,
      rating: this.state.score,
      content: this.state.comment,
    };
    if (this.props.user === '사용자') {
      await axios
        .post('/api/v1/order/review/rider', data)
        .then((res) => {
          alert('후기가 전달되었습니다.');
        })
        .catch((e) => {
          alert(e.response.data.message);
          this.props.navigation.goBack(null);
        });
    }
    if (this.props.user === '배달원') {
      await axios
        .post('/api/v1/order/review/user', data)
        .then((res) => {
          alert('후기가 전달되었습니다.');
        })
        .catch((e) => {
          alert(e.response.data.message);
          this.props.navigation.goBack(null);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>
            {this.props.route.params.riderID}님의 점수를 매겨 주세요:)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 15,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>1</Text>
              <RadioButton
                value="score"
                status={this.state.score === 1 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({score: 1})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>2</Text>
              <RadioButton
                value="score"
                status={this.state.score === 2 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({score: 2})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>3</Text>
              <RadioButton
                value="score"
                status={this.state.score === 3 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({score: 3})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>4</Text>
              <RadioButton
                value="score"
                status={this.state.score === 4 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({score: 4})}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.imageSubTitle}>5</Text>
              <RadioButton
                value="score"
                status={this.state.score === 5 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({score: 5})}
              />
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.imageTitle}>코멘트 남기기</Text>
          <Text style={{fontSize: 10, marginBottom: 5}}>ex)매너가 좋아요</Text>
          <TextInput
            style={styles.textInputBox}
            value={this.state.comment}
            onChangeText={(text) => this.setState({comment: text})}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.onClickSendReview();
            }}>
            <Text style={styles.panelButtonTitle}>후기 보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
  },
  radiobox: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffaf0',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  imageSubTitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  imageTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  textInputBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#fafad2',
    borderWidth: 3,
    borderColor: 'gray',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#8fbc8f',
    width: '100%',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.authentication.user,
});
export default connect(mapStateToProps, {})(WriteReviewScreen);
