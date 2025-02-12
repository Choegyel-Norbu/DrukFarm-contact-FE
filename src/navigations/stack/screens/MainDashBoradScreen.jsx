import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavItem} from '../../../constant/NavItem';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MainDashBoradScreen({navigation}) {
  const [userName, setUserName] = useState('');

  const handleNavAction = index => {
    switch (index) {
      case 0:
        navigation.navigate('ProfileTab');
        break;
      case 1:
        Linking.openURL('youtube.com');
        break;
      case 2:
        Linking.openURL('facebook.com');
        break;
    }
  };

  const navItems = NavItem();

  return (
    <SafeAreaView style={{flex: 1, padding: 15}}>
      <View style={styles.homeHeader}>
        <Icon name="person" size={24} color="#000" />
        <Text>Chogyal</Text>
      </View>
      <View style={styles.homeNav}>
        <ScrollView horizontal>
          {navItems.map((item, index) => (
            <TouchableOpacity onPress={() => handleNavAction(index)}>
              <Text style={styles.navItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.content}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  homeNav: {},
  navItem: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
  },
});
