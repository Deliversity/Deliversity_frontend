import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import StoreScreen from './StoreScreen';
import MyPageScreen from './MyPageScreen';
import SeekDeliveryScreen from './SeekDeliveryScreen';
import DetailDeliveryScreen from './DetailDeliveryScreen';
import MatchingScreen from './MatchingScreen';
import ChatScreen from './ChatScreen';
import ChatHomeScreen from './ChatHomeScreen';
import DeliveryManScreen from './DeliveryManScreen';
import CourierReviewScreen from './CourierReviewScreen';
import ManageDeliveryScreen from './ManageDeliveryScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getUserStorage, storeData} from '../store/actions/action';
import {connect} from 'react-redux';
import ExploreScreen from './ExploreScreen';
import OrderScreen from './OrderScreen';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  token: state.authentication.token,
});

const mapDispatchToProps = (dispatch) => ({
  storeData: (data) => dispatch(storeData(data)),
});
class MainTabScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.token === null) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={AuthStack}
          />
        </Stack.Navigator>
      );
    } else {
      if (this.props.user === '배달원') {
        return (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="CourierTab"
              component={CourierTabStack}
            />
          </Stack.Navigator>
        );
      } else {
        return (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="ConsumerTab"
              component={ConsumerTabStack}
            />
          </Stack.Navigator>
        );
      }
    }
  }
}
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}
function OrderManageStack() {
  return (
    <Stack.Navigator initialRouteName="Matching">
      <Stack.Screen
        options={{headerShown: false}}
        name="Matching"
        component={MatchingScreen}
      />
      <Stack.Screen
        name="DeliveryMan"
        options={{
          title: '배달원 리스트 보기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={DeliveryManScreen}
      />
      <Stack.Screen
        name="CourierReview"
        options={{
          title: '배달원 리뷰 보기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={CourierReviewScreen}
      />
    </Stack.Navigator>
  );
}
function ConsumerStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Store"
        component={StoreScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Explore"
        component={ExploreScreen}
      />
      <Stack.Screen
        name="Order"
        options={{
          title: '주문 요청 하기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
          },
        }}
        component={OrderScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OrderManage"
        component={OrderManageStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Chat"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}
function CourierStack() {
  return (
    <Stack.Navigator initialRouteName="SeekDelivery">
      <Stack.Screen
        options={{headerShown: false}}
        name="SeekDelivery"
        component={SeekDeliveryScreen}
      />
      <Stack.Screen
        name="DetailDelivery"
        options={{
          title: '배달 신청 하기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={DetailDeliveryScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Chat"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}

function CourierTabStack() {
  return (
    <Tab.Navigator activeColor="#fff">
      <Tab.Screen
        name="Courier"
        component={CourierStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#00fa9a',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ManageDelivery"
        component={ManageDeliveryScreen}
        options={{
          tabBarLabel: '배달 관리',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="work" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatHome"
        component={ChatHomeScreen}
        options={{
          tabBarLabel: '채팅',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarColor: '#00fa9a',
          tabBarIcon: ({color}) => (
            <Icon name="face-retouching-natural" color={'#e9967a'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function ConsumerTabStack() {
  return (
    <Tab.Navigator activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={ConsumerStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Matching"
        component={OrderManageStack}
        options={{
          tabBarLabel: '주문 관리',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="grading" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatHome"
        component={ChatHomeScreen}
        options={{
          tabBarLabel: '채팅',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="face" color={'#e9967a'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
