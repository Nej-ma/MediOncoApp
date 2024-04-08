import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { searchPatients } from '../services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SearchPatient = ({ onPatientSelect }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    id: '',
    firstName: '',
    name: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  const handleInputChange = (field, value) => {
    setSearchCriteria({ ...searchCriteria, [field]: value });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('auth_token');
    const criteria = {
      ...(searchCriteria.id && { id: searchCriteria.id }),
      ...(searchCriteria.firstName && { firstname: searchCriteria.firstName }),
      ...(searchCriteria.name && { nom: searchCriteria.name }),
    };
    const results = await searchPatients(criteria, token);
    setSearchResults(results);
    setIsLoading(false);
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchCriteria.id}
        onChangeText={(text) => handleInputChange('id', text)}
        placeholder="id"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={searchCriteria.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
        placeholder="Prénom"
      />
      <TextInput
        style={styles.input}
        value={searchCriteria.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Nom de famille"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Rechercher</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color="#5A709F" style={styles.loadingIndicator} />
      ) : searchResults.length === 0 ? (
        <Text style={styles.noResultsText}>Aucun résultat.</Text>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {searchResults.map((patient, index) => (
            <TouchableOpacity key={index} onPress={() => onPatientSelect(patient.id)} style={styles.patientCard}>
              <Text style={styles.patientName}>{patient.firstname} {patient.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  resultsContainer: {
    padding: 10,
    height: 500,
    marginBottom: 30,
    
  },
  datePickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  datePickerText: {
    color: 'gray',
  },
  patientCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
  },
  patientName: {
    fontSize: 18,
  },
  searchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5A709F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButtonText:{
    fontSize:18,
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default SearchPatient;
