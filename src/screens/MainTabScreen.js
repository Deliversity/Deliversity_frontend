import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
//import {HeaderBackButton} from 'react-navigation';
import HomeScreen from './ConsumerHome/HomeScreen';
import LoginScreen from './Auth/LoginScreen';
import SignupScreen from './Auth/SignupScreen';
import StoreScreen from './ConsumerHome/StoreScreen';
import MyPageScreen from './MyPage/MyPageScreen';
import SeekDeliveryScreen from './CourierHome/SeekDeliveryScreen';
import DetailDeliveryScreen from './CourierHome/DetailDeliveryScreen';
import ChatScreen from './Chat/ChatScreen';
import ChatHomeScreen from './Chat/ChatHomeScreen';
import SelectCourierScreen from './OrderManage/SelectCourierScreen';
import CourierReviewScreen from './OrderManage/CourierReviewScreen';
import ManageDeliveryScreen from './CourierHome/ManageDeliveryScreen';
import ViewUser from './Chat/ViewUser';
import PaymentScreen from './MyPage/PaymentScreen';
import ManageOrderScreen from './OrderManage/ManageOrderScreen';
import WriteReviewScreen from './Review/WriteReviewScreen';
import MyReviewScreen from './Review/MyReviewScreen';
import OrderReviewScreen from './Review/OrderReviewScreen';
import RefundScreen from './MyPage/RefundScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentBookScreen from './MyPage/PaymentBookScreen';
import RefundBookScreen from './MyPage/RefundBookScreen';
import {getUserStorage, autoLogin} from '../store/actions/action';
import {connect} from 'react-redux';
import ExploreScreen from './ConsumerHome/ExploreScreen';
import OrderScreen from './ConsumerHome/OrderScreen';
import CourierLocationScreen from './OrderManage/CourierLocationScreen';
import iamport from './MyPage/PGScreen';
import {NavigationContainer} from '@react-navigation/native';
import QApage from './MyPage/QApage';
import Report from './MyPage/Report';
import FindAssign from './Auth/FindAssign';
import {ActivityIndicator} from 'react-native-paper';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  token: state.authentication.token,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (data) => dispatch(autoLogin(data)),
});

function getTabBarVisibility(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (
    routeName === 'Chat' ||
    routeName === 'iamport' ||
    routeName === 'Payment' ||
    routeName === 'WriteReview' ||
    routeName === 'OrderReview' ||
    routeName === 'SelectCourier' ||
    routeName === 'CourierReview' ||
    routeName === 'WriteReview' ||
    routeName === 'MyReview' ||
    routeName === 'QApage' ||
    routeName === 'Report' ||
    routeName === 'Refund' ||
    routeName === 'Store' ||
    routeName === 'Explore' ||
    routeName === 'Order' ||
    routeName === 'DetailDelivery' ||
    routeName === 'PaymentBook' ||
    routeName === 'RefundBook' ||
    routeName === 'CourierLocation'
  ) {
    return false;
  }

  return true;
}

class MainTabScreen extends Component {
  state = {
    loaded: false,
  };
  constructor(props) {
    super(props);
    getUserStorage('userToken').then((data) => {
      if (!data) {
        return;
      }
      this.props.autoLogin({token: data});
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({loaded: true});
    }, 3000); //runs after 5sec
  }
  render() {
    if (this.state.loaded === true) {
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
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/logo_D.png')}
            style={{width: 200, height: 200, marginBottom: 10}}
          />
          <ActivityIndicator size="large" />
        </View>
      );
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
      <Stack.Screen
        options={{
          title: '계정 찾기',
          headerStyle: {
            backgroundColor: '#AD5389',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: 'white',
          },
        }}
        name="FindAssign"
        component={FindAssign}
      />
    </Stack.Navigator>
  );
}
function ChatStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="ChatHome">
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatHome"
        component={ChatHomeScreen}
      />
      <Stack.Screen
        options={{
          title: '채팅하기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Payment');
                }}>
                <Text>💰</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
        name="Chat"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="View"
        component={ViewUser}
      />
      <Stack.Screen
        options={{
          title: '정산하기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        name="Payment"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="iamport"
        component={iamport}
      />
    </Stack.Navigator>
  );
}
function DeliveryManageStack() {
  return (
    <Stack.Navigator initialRouteName="ManageDelivery">
      <Stack.Screen
        options={{headerShown: false}}
        name="ManageDelivery"
        component={ManageDeliveryScreen}
      />
      <Stack.Screen
        name="WriteReview"
        options={{
          title: '주문자 리뷰 쓰기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={WriteReviewScreen}
      />
      <Stack.Screen
        name="OrderReview"
        options={{
          title: '내가 작성한 리뷰',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={OrderReviewScreen}
      />
    </Stack.Navigator>
  );
}
function OrderManageStack() {
  return (
    <Stack.Navigator initialRouteName="ManageOrder">
      <Stack.Screen
        options={{headerShown: false}}
        name="ManageOrder"
        component={ManageOrderScreen}
      />
      <Stack.Screen
        name="SelectCourier"
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
        component={SelectCourierScreen}
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
      <Stack.Screen
        name="WriteReview"
        options={{
          title: '배달원 리뷰 쓰기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={WriteReviewScreen}
      />
      <Stack.Screen
        name="OrderReview"
        options={{
          title: '내가 작성한 리뷰',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        component={OrderReviewScreen}
      />
      <Stack.Screen
        name="CourierLocation"
        options={{
          title: '배달원 위치 조회',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }} //CourierLocationScreen
        component={CourierLocationScreen}
      />
    </Stack.Navigator>
  );
}
function myPageStack() {
  return (
    <Stack.Navigator initialRouteName="MyStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyPage"
        component={MyPageScreen}
      />
      <Stack.Screen
        options={{
          title: '받은 전체 후기',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        name="MyReview"
        component={MyReviewScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="QApage"
        component={QApage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Report"
        component={Report}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="iamport"
        component={iamport}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Refund"
        component={RefundScreen}
      />
      <Stack.Screen
        options={{
          title: '결제 내역',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        name="PaymentBook"
        component={PaymentBookScreen}
      />
      <Stack.Screen
        options={{
          title: '환급 내역',
          headerStyle: {
            backgroundColor: '#f4da6c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        name="RefundBook"
        component={RefundBookScreen}
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
          },
        }}
        component={OrderScreen}
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
    </Stack.Navigator>
  );
}

function CourierTabStack() {
  return (
    <Tab.Navigator activeColor="#fff">
      <Tab.Screen
        name="Courier"
        component={CourierStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Home',
          tabBarColor: '#00fa9a',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#e9967a'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="ManageDelivery"
        component={DeliveryManageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: '배달 관리',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="work" color={'#e9967a'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="ChatHome"
        component={ChatStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: '채팅',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={'#e9967a'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="MyPage"
        component={myPageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Me',
          tabBarColor: '#00fa9a',
          tabBarIcon: ({color}) => (
            <Icon name="face-retouching-natural" color={'#e9967a'} size={26} />
          ),
        })}
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
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Home',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#FFA500'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="ManageOrder"
        component={OrderManageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: '주문 관리',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="grading" color={'#FFA500'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="ChatHome"
        component={ChatStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: '채팅',
          tabBarColor: '#ff7f50',
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={'#FFA500'} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="MyPage"
        component={myPageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Me',
          tabBarColor: '#00fa9a',
          tabBarIcon: ({color}) => (
            <Icon name="face-retouching-natural" color={'#FFA500'} size={26} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
