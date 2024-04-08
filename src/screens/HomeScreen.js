import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';
import RecentPatientsList from '../features/patients/components/RecentPatientsList';
import { useAuthContext } from '../context/authContext';
import { getRecentPatients, addRecentPatient } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [recentPatients, setRecentPatients] = useState([]);
  const { user, isLoggedIn } = useAuthContext();
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    if (isLoggedIn && navigation.isFocused()) {
      fetchRecentPatients();
      fetchNextAppointment();
    }
  }, [isLoggedIn, navigation]);

  const fetchNextAppointment = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const doctorId = user?.id;
      if (doctorId && token) {
        const response = await fetch(`http://10.0.2.2:3000/appointments/next/${doctorId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const nextAppointments = await response.json();
          if (nextAppointments.length > 0) {
            setNextAppointment(nextAppointments[0]);
          } else {
            setNextAppointment(null);
          }
        } else {
          console.error('Failed to fetch next appointment');
        }
      }
    } catch (error) {
      console.error('Error fetching next appointment:', error);
    }
  };
  
  const fetchRecentPatients = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const fetchedPatients = await getRecentPatients(token);
      setRecentPatients(fetchedPatients || []);
    } catch (error) {
      console.error('Error fetching recent patients:', error);
    }
  };

  const handlePatientSelect = async (patientId) => {
    try {
      await addRecentPatient(patientId);
      navigation.navigate('Patient', { patientId });
    } catch (error) {
      console.error('Error handling patient select:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} />
      <Text style={styles.welcomeText}>
        Bienvenue Dr.{user?.firstname ? `${user.firstname} ${user.name}` : ''}
      </Text>
      {nextAppointment ? (
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentTitle}>Votre prochaine consultation :</Text>
          <View style={styles.appointmentRow}>
            <Icon name="event" size={20} color="#4F8EF7" />
            <Text style={styles.appointmentText}>Date : {nextAppointment.date.split('T')[0]}</Text>
          </View>
          <View style={styles.appointmentRow}>
            <Icon name="access-time" size={20} color="#4F8EF7" />
            <Text style={styles.appointmentText}>Horaire : 17:30</Text>
          </View>
          <View style={styles.appointmentRow}>
            <Icon name="person" size={20} color="#4F8EF7" />
            <Text style={styles.appointmentText}>Patient : Denny Duquette</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noAppointmentText}>Aucune consultation à venir</Text>
      )}
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
    appointmentCard: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    appointmentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    appointmentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    appointmentText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#555',
    },
    noAppointmentText: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
});

export default HomeScreen;
