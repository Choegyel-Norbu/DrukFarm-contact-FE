import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import LogoutDialog from './LogoutDialog';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const logIn = async (token, userData) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', userData.id.toString());
      setUserToken(token);
      setIsLoading(false);
      setUserName(userData.userName);
      setEmail(userData.email);
      console.log('Token saved successfully @@@ ' + token);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        isLoading,
        userToken,
        userName,
        email,
      }}>
      {isLoading ? <ActivityIndicator size={'large'} /> : children}
    </AuthContext.Provider>
  );
};
