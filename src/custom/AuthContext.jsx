import React, {createContext, useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import API_BASE_URL from '../config';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const addRolesContext = newRoles => {
    setRoles(prevRoles => [...prevRoles, ...newRoles]); // Merge arrays

    console.log('Triggered role context ' + roles);
  };

  const logIn = async (token, userData) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', userData.id.toString());
      await AsyncStorage.setItem('userRegistered', JSON.stringify(true));
      await fetchUserRoles(token, userData.id.toString());
      setUserName(userData.userName);
      setEmail(userData.email);
      setUser(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserRoles = useCallback(async (token, id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/getRoles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const roleNames = response.data.map(role => role.name);
      setRoles(roleNames);
      console.log('User Roles:', roleNames);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }, []);

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
        roles,
        addRolesContext,
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
