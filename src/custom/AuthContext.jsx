import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  const logIn = async (token, userData) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', userData.id.toString());
      await AsyncStorage.setItem('userRegistered', JSON.stringify(true));
      setIsLoading(false);
      setUserName(userData.userName);
      setEmail(userData.email);
      setUser(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        isLoading,
        userName,
        email,
        user,
      }}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../animation/loader.json')}
            autoPlay
            loop
            style={styles.loader}
          />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loader: {
    width: 100,
    height: 100,
  },
});
