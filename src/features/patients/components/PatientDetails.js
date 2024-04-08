import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PatientDetails = ({ patient, onTakePhoto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.patientName}>{patient.firstname} {patient.name}</Text>
      <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
        <Text style={styles.buttonText}>Prendre une photo</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
},
buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default PatientDetails;