import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseNavigationContainer} from '@react-navigation/native';

export default function Cart() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.cartContainer}>
        <Text>Item</Text>
        <View style={styles.itemContainer}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    height: '100%',
    width: '100%',
    padding: '2%',
  },
  itemContainer: {
    height: 190,
    width: '100%',
    backgroundColor: '#cccccc',
  },
});
