import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { AuthProvider } from './src/context/authContext';

const App = () => {
  return (
    <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
