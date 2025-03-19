import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScr from '../screen/DcHScrn/HomeScr';
import PRdetails from '../screen/DcHScrn/PRdetails';
import HRlisingScr from '../screen/DcHScrn/HRlisingScr';
import ProfileScr from '../screen/DcHScrn/ProfileScr';
import Product from '../screen/DrukFarm/Product';
import ProductDetail from '../screen/DrukFarm/ProductDetail';
import Settings from '../screen/DrukFarm/Settings';
import Detail from '../screen/DrukFarm/Detail';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Cart from '../screen/DrukFarm/Cart';
import ProductListed from '../screen/DrukFarm/ProductListed';
import ProductEdit from '../screen/DrukFarm/ProductEdit';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack (No tab hiding required)
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScr}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PRdetails" component={PRdetails} />
      <Stack.Screen name="HRlisting" component={HRlisingScr} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

// Product Stack (Hide tab bar when inside ProductDetail)
const ProductStack = ({navigation, route}) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ProductDetail' || 'ProduceEdit') {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProduceEdit"
        component={ProductEdit}
        options={{
          headerShown: true,
          title: 'Edit Product',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({navigation, route}) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Details') {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScr} />
      <Stack.Screen
        name="Details"
        component={Detail}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="ProductListed"
        component={ProductListed}
        options={{
          headerShown: true,
          title: 'Products',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// Main Bottom Tab Navigation
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3399ff',
        tabBarInactiveTintColor: '#4d4d4d',
        tabBarHideOnKeyboard: true,
        tabBarStyle: getTabBarVisibility(route),
      })}>
      <Tab.Screen
        name="Homestack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={28} color={color} />,
        }}
      />

      <Tab.Screen
        name="Productstack"
        component={ProductStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="local-offer" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName === 'Details' ||
    routeName === 'ProductDetail' ||
    routeName === 'Cart' ||
    routeName === 'ProductListed' ||
    routeName === 'ProduceEdit'
    ? {display: 'none'}
    : {display: 'flex'};
};
