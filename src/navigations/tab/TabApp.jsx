import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../stack/screens/HomeScreen'; // Ensure the path is correct
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from '../stack/screens/ProfileScreen';

const Tab = createBottomTabNavigator(); // Correct instantiation of the navigator

export default function TabApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue', // Active tint color for the icons and text
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'}, // Styling for the labels
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
          // headerShown: false,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="create" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
