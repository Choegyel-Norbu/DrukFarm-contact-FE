import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';

export default function RegistrationSuccess({navigation}) {
  return (
    <View style={styles.container}>
      {/* Success Animation */}
      <LottieView
        source={{
          uri: 'https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json',
        }} // Success animation
        autoPlay
        loop={false}
        style={styles.animation}
      />

      {/* Success Message */}
      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.subtitle}>
        You have successfully created an account.
      </Text>

      {/* Navigation Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>

      {/* Decorative Image */}
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2020/06/12/06/22/online-registration-5285433_1280.jpg',
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '90%',
    height: 180,
    marginTop: 20,
    borderRadius: 10,
  },
});
