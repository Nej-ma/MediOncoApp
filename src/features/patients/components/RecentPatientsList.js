import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RecentPatientsList = ({ patients, onPatientSelect }) => {
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Derniers Patients Consultés</Text>
            {patients.map((patient, index) => (
                <TouchableOpacity key={index} onPress={() => onPatientSelect(patient.id)} style={styles.patientCard}>
                    <Text style={styles.patientName}>{patient.firstname} {patient.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 20,
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
});

export default RecentPatientsList;
