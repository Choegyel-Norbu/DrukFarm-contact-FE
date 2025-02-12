import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../stack/screens/ProfileScreen';
import HomeScreen from '../stack/screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerHome({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
