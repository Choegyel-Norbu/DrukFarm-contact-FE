import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScr from '../screen/DcHScrn/HomeScr';
import CustomDrawer from './CustomDrawer';
import HRlisingScr from '../screen/DcHScrn/HRlisingScr';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTab"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="MainTab" component={TabNavigation} />
      <Drawer.Screen name="HR" component={HRlisingScr} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
