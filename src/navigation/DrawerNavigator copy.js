import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import StackNavigator from './StackNavigator'; 
import { useAuthContext } from '../context/authContext';


const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const { isLoggedIn, user, logout } = useAuthContext();
  console.log("DrawerNavigator isLoggedIn:", isLoggedIn);
  console.log("DrawerNavigator user:", user);
  if (user == null)
    logout();
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      swipeEnabled: isLoggedIn,
      drawerLockMode: isLoggedIn ? 'unlocked' : 'locked-closed',
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
      <Drawer.Screen name="HomeStack" component={StackNavigator} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="Paramètres" component={SettingsScreen} />
      <Drawer.Screen name="Info" component={InfoScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


