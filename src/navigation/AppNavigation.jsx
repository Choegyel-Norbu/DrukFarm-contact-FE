import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import {AuthContext} from '../custom/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import DrawerNavigation from './DrawerNavigation';

export default function AppNavigation() {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    // return (
    //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //     <ActivityIndicator size="large" color="#3498db" />
    //   </View>
    // );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <DrawerNavigation /> : <AuthNavigation />}
      {/* <DrawerNavigation /> */}
    </NavigationContainer>
  );
}
