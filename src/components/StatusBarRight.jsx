import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function StatusBarRight() {
  const [isMenuPressed, setIsMenuPressed] = useState(false);

  const openLink = url => {
    Linking.openURL(url);
  };

  const menuItems = [
    {
      id: 1,
      desc: 'Home',
    },
    {
      id: 2,
      desc: 'Open chat head',
    },
    {
      id: 3,
      desc: 'Delete conversation',
    },
    {
      id: 5,
      desc: 'Block',
    },
    {
      id: 4,
      desc: 'Report technical problem',
    },
  ];

  const handleItemPress = id => {
    switch (id) {
      case 1:
        openLink('https://www.facebook.com/');
        break;

      case 2:
        openLink('https://www.facebook.com/ne.yo.927543');
        break;

      case 3:
        Alert.alert('Pressed 3');
        break;

      case 4:
        Alert.alert('Pressed 4');
        break;

      case 5:
        Alert.alert('Pressed 5');
        break;
      default:
        Alert.alert('Error', 'Unknown action');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsMenuPressed(false)}>
      <View style={styles.container}>
        <Pressable onPress={() => setIsMenuPressed(true)} style={{margin: 20}}>
          {/* <Image source={require('../images/menuIcon.png')} /> */}

          <Icon name="more-vert" size={28} color="#000" />
        </Pressable>

        {isMenuPressed ? (
          <View>
            {menuItems.map(item => (
              <View key={item.id} style={styles.menuListContainer}>
                <Pressable onPress={() => handleItemPress(item.id)}>
                  <Text>{item.desc}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
  menuListContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});
