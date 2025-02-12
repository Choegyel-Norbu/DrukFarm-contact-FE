import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import LogoutDialog from './LogoutDialog';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const logIn = async (token, userData) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      setIsLoading(false);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
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
        firstName,
        lastName,
        email,
      }}>
      children
      {isLoading ? <ActivityIndicator size={'large'} /> : children}
    </AuthContext.Provider>
  );
};
