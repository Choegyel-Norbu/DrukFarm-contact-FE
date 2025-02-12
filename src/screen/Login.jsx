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

  const [error, setError] = useState({email: '', password: ''});

  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      email: '',
      password: '',
    };

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format.';
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

    const loginData = {email, password};
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
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <View style={styles.errorInputStyle}>
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}
        <CustomInput
          placeholder="Email"
          icon="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.errorInputStyle}>
        {error.password ? (
          <Text style={styles.errorText}>{error.password}</Text>
        ) : null}
        <CustomInput
          placeholder="Password"
          icon="lock"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <CustomButton title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    color: '#000',
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
