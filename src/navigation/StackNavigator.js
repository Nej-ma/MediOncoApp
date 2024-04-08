import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Patients from '../screens/PatientsScreen';
import Patient from '../screens/PatientScreen';
import CameraScreen from '../screens/CameraScreen';
import HelpScreen from '../screens/HelpScreen';
import AgendaScreen from '../screens/AgendaScreen';
import PrescriptionTreatmentScreen from '../screens/PrescriptionTreatmentScreen';
import { useAuthContext } from '../context/authContext';
const Stack = createStackNavigator();

const StackNavigator = () => {

  const { isLoggedIn } = useAuthContext();
  
  console.log("DrawerNavigator isLoggedIn:", isLoggedIn);
 

    <Stack.Screen name="Splash" component={SplashScreen} />

    return (
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Patients" component={Patients} />
            <Stack.Screen name="Patient" component={Patient} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Agenda" component={AgendaScreen} />
            <Stack.Screen name="Suivi" component={PrescriptionTreatmentScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    );
  };


export default StackNavigator;
