import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import {AuthContext} from '../custom/AuthContext';
import DrawerNavigation from './DrawerNavigation';

export default function AppNavigation() {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user !== null ? <DrawerNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
