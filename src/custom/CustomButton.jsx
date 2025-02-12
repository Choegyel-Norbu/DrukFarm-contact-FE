import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#3399ff', '#0066cc']}
        style={styles.button}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
