import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import BottomMenu from '../components/BottomMenu';
import PatientListItem from '../features/patients/components/PatientListItem';
import FilterPanel from '../features/patients/components/FilterPanel';
import { getPatientsInAgenda } from '../features/patients/services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addRecentPatient } from '../utils/storage';

const AgendaScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return token;
  }

  const handleFilterChange = async (filter) => {
    setLoading(true);
    const token = await getToken();
    try {
        // Ensure filter contains a valid doctorId and date
        const fetchedPatients = await getPatientsInAgenda(filter.doctorId, filter.date, filter.starttime, filter.endtime, token);
        setPatients(fetchedPatients);
    } catch (error) {
        console.error('Failed to fetch patients:', error);
    } finally {
        setLoading(false);
    }
};

  const handlePatientSelect = (patientId) => {
    addRecentPatient(patientId);
    navigation.navigate('Patient', { patientId });
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} />
      <Text style={styles.title}>Agenda </Text>
      <FilterPanel onFilterChange={handleFilterChange} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : patients.length === 0 ? (
        <Text style={styles.emptyText}>Aucun patients trouvés.</Text>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PatientListItem patient={item} onSelect={() => handlePatientSelect(item.id)} />
          )}
          style={styles.list}
        />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default AgendaScreen;
