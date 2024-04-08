import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientListItem = ({ patient, onSelect, appointmentTime }) => {
    const getAppointmentTypeColor = () => {
        if (new Date(appointmentTime) < new Date()) {
            return '#ff4d4d';
        }
        return '#4d79ff';

    };

    return (
        <TouchableOpacity onPress={() => onSelect(patient.nip)} style={styles.patientCard}>
            <View style={styles.timeContainer}>
                <Text style={styles.appointmentTime}>{appointmentTime}</Text>
                <Icon name="clock-outline" size={16} color="#555" />
            </View>
            <View style={[styles.typeIndicator, { backgroundColor: getAppointmentTypeColor() }]} />
            <Text style={styles.patientName}>{patient.firstname} {patient.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    patientCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    typeIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PatientListItem;
