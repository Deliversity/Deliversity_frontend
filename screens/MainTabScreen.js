import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
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
        tabBarColor: '#009387',
      }}
    />
    <Tab.Screen
      name="Login"
      component={LoginStackScreen}
      options={{
        tabBarLabel: 'Login',
        tabBarColor: '#1f65ff',
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);
const LoginStackScreen = ({navigation}) => (
  <LoginScreenStack.Navigator>
    <LoginScreenStack.Screen name="Login" component={LoginScreen} />
  </LoginScreenStack.Navigator>
);
