import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({
  title,
  onPress,
  textStyle,
  style,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    paddingVertical: 12,
    backgroundColor: '#eeeee4',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '##21130d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0C4DE',
  },
});
