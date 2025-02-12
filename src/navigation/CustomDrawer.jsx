import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../custom/AuthContext';
import LogoutDialog from '../custom/LogoutDialog';

export default function CustomDrawer(props) {
  const {logOut, firstName, lastName, email} = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let userName = `${firstName} ${lastName}`;
    setUserName(userName);
  }, []);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    hideDialog();
    logOut();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={require('../images/donate.png')} style={styles.avatar} />
        <Text style={styles.username}>{userName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Drawer Menu Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />2
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={showDialog}>
        <Icon name="logout" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
        <LogoutDialog
          visible={visible}
          onDismiss={hideDialog}
          onConfirm={handleLogout}
        />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cc5200',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});
