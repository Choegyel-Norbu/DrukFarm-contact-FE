import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
import OnboardingScreen from '../screen/DcHScrn/OnboardingScreen';
import SignupScreen from '../screen/Signup';
import RegistrationSuccess from '../screen/SucessScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

const AuthStack = createStackNavigator();

export default function AuthNavigation() {
  const [isUserRegistered, setIsUserRegistered] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('userRegistered');
        console.log('Values @@@ ' + value);
        setIsUserRegistered(value ? JSON.parse(value) : false);
        console.log('After parse ' + isUserRegistered);
      } catch (error) {
        console.log(error);
      }
    };
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    console.log('After parse: ' + isUserRegistered);
  }, [isUserRegistered]);

  if (isUserRegistered === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00b8e6" />
      </View>
    );
  }

  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isUserRegistered ? 'Login' : 'Onboard'}>
      <AuthStack.Screen name="Onboard" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Success" component={RegistrationSuccess} />
    </AuthStack.Navigator>
  );
}
