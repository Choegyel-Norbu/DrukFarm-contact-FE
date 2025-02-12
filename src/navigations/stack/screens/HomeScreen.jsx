import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from './ProfileScreen';
import MainDashBoradScreen from './MainDashBoradScreen';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="MainDashboard">
      <Drawer.Screen
        name="MainDashboard"
        component={MainDashBoradScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
