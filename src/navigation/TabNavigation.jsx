import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PRscr from '../screen/DcHScrn/PRscr';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScr from '../screen/DcHScrn/HomeScr';
import PRdetails from '../screen/DcHScrn/PRdetails';
import HRlisingScr from '../screen/DcHScrn/HRlisingScr';
import Service from '../screen/DcHScrn/Service';
import ProfileScr from '../screen/DcHScrn/ProfileScr';
import Offer from '../screen/DcHScrn/Offer';
import Request from '../screen/DcHScrn/Request';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3399ff', // Active icon and label color
        tabBarInactiveTintColor: '#4d4d4d', // Inactive icon and label color
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={28} color={color} />,
        }}
      />

      <Tab.Screen
        name="Offer"
        component={Offer}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="local-offer" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="request-page" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScr}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
