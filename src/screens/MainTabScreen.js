import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import StoreScreen from './StoreScreen';
import MyPageScreen from "./MyPageScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getUserStorage, storeData} from '../store/actions/action';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => ({
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
    return (
      <Stack.Navigator>
        {this.props.token === null ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={AuthStack}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="TabStack"
            component={TabStack}
          />
        )}
      </Stack.Navigator>
    );
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
      <Stack.Screen
        options={{headerShown: false}}
        name="Store"
        component={StoreScreen}
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
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
    </Stack.Navigator>
  );
}
function TabStack() {
  return (
    <Tab.Navigator activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#e9967a'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'me',
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
