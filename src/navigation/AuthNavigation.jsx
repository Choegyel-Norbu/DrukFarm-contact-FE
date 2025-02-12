import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
import OnboardingScreen from '../screen/DcHScrn/OnboardingScreen';
import SignupScreen from '../screen/Signup';
import RegistrationSuccess from '../screen/SucessScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Onboard" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Success" component={RegistrationSuccess} />
    </AuthStack.Navigator>
  );
}
