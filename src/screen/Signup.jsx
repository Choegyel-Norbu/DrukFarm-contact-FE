import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import CustomInput from '../custom/CustomInput';
import axios from 'axios';
import API_BASE_URL from '../config.jsx';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from 'react-native-social-buttons';

export default function Signup({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  // Validation

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    };
    if (!userName.trim()) {
      newErrors.userName = 'Username is required.';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is requried.';
    } else if (!/^\d{8}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number (must be 8 digits).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUserRegister = async () => {
    console.log('Inside signup action');
    if (!validateForm()) {
      return;
    }

    console.log('After validation');
    const userData = {userName, email, phone, password};
    console.log('before axions');
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/registration`,
        userData,
      );
      Toast.show({
        type: 'success',
        text1: 'Registration Successful! 🎉',
        position: 'top',
        visibilityTime: 3000, // Auto-dismiss in 3s
        onHide: () => navigation.navigate('Login'), // Redirect after hiding
      }),
        console.log('After axios');
    } catch (error) {
      Alert.alert(error);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('This feature is not available currently!');
  };
  const handleFacebookLogin = () => {
    Alert.alert('This feature is not available currently!');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.signup}>Sign Up</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{
            borderWidth: 0.5,
            margin: 3,
            paddingVertical: 10,
            height: 'auto',
          }}>
          <View style={styles.content}>
            <View style={styles.errorInputStyle}>
              <CustomInput
                placeholder="Username"
                icon="person"
                value={userName}
                onChangeText={setUserName}
              />
              {errors.userName ? (
                <Text style={styles.errorText}>{errors.userName}</Text>
              ) : null}
            </View>
            <View style={styles.errorInputStyle}>
              <CustomInput
                placeholder="Email"
                icon="email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.errorInputStyle}>
              <CustomInput
                placeholder="Phone number"
                icon="phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              {errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
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
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.errorInputStyle}>
              <CustomInput
                placeholder="Confirm Password"
                icon="lock"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <CheckBox />
              <Text>Rememer Me</Text>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View>
                <GoogleSocialButton onPress={handleGoogleLogin} />
              </View>
              <View>
                <FacebookSocialButton onPress={handleFacebookLogin} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable style={styles.register} onPress={handleUserRegister}>
            <Text style={{color: '#fff'}}>Sign Up</Text>
          </Pressable>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#00b8e6', fontWeight: 400}}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '60%',
    marginHorizontal: '10%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 40,
    paddingHorizontal: 5,
    // iOS Shadow Properties
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
    // Android Shadow Property
    elevation: 5,
    backgroundColor: '#fff',
  },
  inputStyle: {},
  footer: {
    height: '20%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  loginOptions: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginVertical: 10,
  },
  signup: {
    fontSize: 40,
    fontWeight: '900',
    color: '#00b8e6',
    fontStyle: '',
  },
  register: {
    backgroundColor: '#00b8e6',
    alignItems: 'center',
    width: '60%',
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 10,
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
