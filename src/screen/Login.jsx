import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from 'react-native';

import React, {useContext, useState} from 'react';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import axios from 'axios';
import API_BASE_URL from '../config';
import {AuthContext} from '../custom/AuthContext';
import Toast from 'react-native-toast-message';

export default function Login({navigation}) {
  const {logIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState({email: '', password: '', phone: ''});

  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      email: '',
      password: '',
      phone: '',
    };

    // if (!email.trim()) {
    //   newErrors.email = 'Email is required.';
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = 'Invalid email format.';
    //   isValid = false;
    // }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const loginData = {email, password, phone};
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/login`,
        loginData,
        {
          headers: {
            'Content-Type': 'Application/json',
          },
        },
      );

      if (response.status === 200) {
        logIn(response.data.token, response.data.userDTO);
      }
    } catch (error) {
      if (error.response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'User not found!',
          position: 'top',
          visibilityTime: 3000, // Auto-dismiss in 3s
          onHide: () => navigation.navigate('Login'), // Redirect after hiding
        });
      }

      if (error.response.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Invalid credential!',
          text2: 'Check your password',
          position: 'top',
          visibilityTime: 3000, // Auto-dismiss in 3s
          onHide: () => navigation.navigate('Login'), // Redirect after hiding
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={styles.signup}>Sign In</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* <View style={styles.errorInputStyle}>
        <CustomInput
          placeholder="Email"
          icon="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}
      </View> */}

      <View style={styles.errorInputStyle}>
        <CustomInput
          placeholder="Phone"
          icon="phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
        />
        {error.phone ? (
          <Text style={styles.errorText}>{error.phone}</Text>
        ) : null}
      </View>

      <View style={styles.errorInputStyle}>
        <CustomInput
          placeholder="Password"
          icon="lock"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error.password ? (
          <Text style={styles.errorText}>{error.password}</Text>
        ) : null}
      </View>

      <Pressable style={styles.register} onPress={handleLogin}>
        <Text style={{color: '#fff'}}>Sign In</Text>
      </Pressable>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: '#00b8e6', fontWeight: 400}}>Register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  register: {
    backgroundColor: '#00b8e6',
    alignItems: 'center',
    width: '40%',
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 30,
  },
  signup: {
    fontSize: 40,
    fontWeight: '900',
    color: '#00b8e6',
    fontStyle: '',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
  },
  footerText: {
    color: '#000',
    marginTop: 40,
  },
  footerLink: {
    color: '#3399ff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff1a1a',
    fontSize: 12,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  errorInputStyle: {
    alignItems: 'flex-start',
    width: '100%',
  },
});
