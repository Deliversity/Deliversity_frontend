import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
const HomeStack = createStackNavigator();
const LoginScreenStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Login" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#ff7f50',
        tabBarIcon: ({color}) => (
          <Icon name="home" color={'#e9967a'} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Login"
      component={LoginStackScreen}
      options={{
        tabBarLabel: 'Login',
        tabBarColor: '#ff7f50',
        tabBarIcon: ({color}) => (
          <Icon name="face" color={'#e9967a'} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Home"
      component={HomeScreen}
    />
  </HomeStack.Navigator>
);
const LoginStackScreen = ({navigation}) => (
  <LoginScreenStack.Navigator>
    <LoginScreenStack.Screen
      options={{headerShown: false}}
      name="Login"
      component={LoginScreen}
    />
  </LoginScreenStack.Navigator>
);
