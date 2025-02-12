import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import OnboardingScreen from './screen/DcHScrn/OnboardingScreen';
import {AuthProvider} from './custom/AuthContext';
import Toast from 'react-native-toast-message';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
      {/* ensures the Toast component is always available. */}
      <Toast />
    </AuthProvider>
  );
};

export default App;
