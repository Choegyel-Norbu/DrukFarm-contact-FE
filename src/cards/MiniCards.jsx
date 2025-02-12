import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MiniCards({filePath, title}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
      }}>
      {/* <Icon name={iconName} size={24} /> */}
      <Image source={filePath} style={{height: 50, width: 50}} />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
