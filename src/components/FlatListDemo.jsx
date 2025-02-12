import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {dummyArray} from './DummyArray';

export default function FlatListDemo() {
  const listArray = dummyArray();

  const showArrayItems = items => {
    <View>
      <Text>{items.name}</Text>
      <Text>{items.age}</Text>
      <Text>{items.homeTown}</Text>
    </View>;
  };

  return (
    <FlatList
      data={listArray}
      keyExtractor={items => items.name}
      renderItem={showArrayItems}
    />
  );
}

const styles = StyleSheet.create({});
