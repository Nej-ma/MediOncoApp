import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';
import RecentPatientsList from '../features/patients/components/RecentPatientsList';
import { useAuthContext } from '../context/authContext';
import { getRecentPatients, addRecentPatient } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [recentPatients, setRecentPatients] = useState([]);
  const { user } = useAuthContext();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    console.log('HomeScreen:', isLoggedIn);
  }, [isLoggedIn]);
  
  useFocusEffect(
    useCallback(() => {
      fetchRecentPatients();
    }, [fetchRecentPatients])
  );

  const fetchRecentPatients = useCallback(async () => {
    const fetchedPatients = await getRecentPatients(user.login, user.token);
    setRecentPatients(fetchedPatients);
  }, [user.login]);

  const handlePatientSelect = async (patientId) => {
    await addRecentPatient(patientId, user.login);
    navigation.navigate('Patient', { patientId });
};
  

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} />
      <Text style={styles.welcomeText}>
        Bienvenue {user ? `${user.firstname.charAt(0).toUpperCase()+user.firstname.slice(1)} ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}` : ''}
      </Text>
      {recentPatients.length > 0 && (
        <RecentPatientsList patients={recentPatients} onPatientSelect={handlePatientSelect} />
      )}
      <BottomMenu navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    patientCard: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 15,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    patientName: {
      fontSize: 18,
      color: '#000',
    },
    navItem: {
      alignItems: 'center',
      flex: 1,
    },
    navText: {
      fontSize: 12,
      color: '#5A709F',
      marginTop: 5,
    },
});

export default HomeScreen;
