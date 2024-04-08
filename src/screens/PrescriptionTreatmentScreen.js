import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { fetchTreatmentsByPatientId, fetchPrescriptionsByTreatmentId, fetchPatientDetails } from '../features/patients/services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import BottomMenu from '../components/BottomMenu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/fr';

const PrescriptionTreatmentScreen = () => {
    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');
    const [treatments, setTreatments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const navigation = useNavigation();

    moment.locale('fr');

    const handleSearch = async () => {
        const token = await AsyncStorage.getItem('auth_token');
        try {
            const patientDetails = await fetchPatientDetails(patientId, token);
            setPatientName(`${patientDetails.firstname} ${patientDetails.name}`);
            const fetchedTreatments = await fetchTreatmentsByPatientId(patientId, token);
            setTreatments(fetchedTreatments);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du patient ou des traitements:', error);
            setPatientName('');
            setTreatments([]);
            setPrescriptions([]);
        }
    };

    const handleTreatmentSelect = async (treatmentId) => {
        const token = await AsyncStorage.getItem('auth_token');
        const fetchedPrescriptions = await fetchPrescriptionsByTreatmentId(treatmentId, token);
        setPrescriptions(fetchedPrescriptions);
    };

    return (
        <View style={styles.container}>
            <CustomHeader navigation={navigation} />
            <Text style={styles.title}>Suivi posologique</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Entrez l'ID du patient"
                    value={patientId}
                    onChangeText={setPatientId}
                    keyboardType="numeric"
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Rechercher</Text>
                </TouchableOpacity>
            </View>
            {patientName ? <Text style={styles.patientName}>Patient : {patientName}</Text> : null}
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Traitements</Text>
                {treatments.map((treatment) => (
                    <TouchableOpacity key={treatment.id} style={styles.treatmentCard} onPress={() => handleTreatmentSelect(treatment.id)}>
                        <Icon name="hospital-box-outline" size={24} color="#4CAF50" />
                        <View style={styles.treatmentInfo}>
                            <Text style={styles.treatmentText}>{treatment.description}</Text>
                            <Text style={styles.treatmentDate}>Du {moment(treatment.startdate).format('LL')} au {moment(treatment.enddate).format('LL')}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Prescriptions</Text>
                {prescriptions.map((prescription) => (
                    <View key={prescription.id} style={styles.prescriptionCard}>
                        <Icon name="pill" size={24} color="#FF9800" />
                        <View style={styles.prescriptionInfo}>
                            <Text style={styles.prescriptionText}>Médicament : {prescription.medication}</Text>
                            <Text style={styles.prescriptionText}>Dosage : {prescription.dosage}</Text>
                            <Text style={styles.prescriptionText}>Fréquence : {prescription.frequency}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#5A709F',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    scrollContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginLeft: 10,
    },
    treatmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8f5e9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    treatmentInfo: {
        marginLeft: 10,
    },
    treatmentText: {
        fontSize: 18,
        color: '#4CAF50',
    },
    treatmentDate: {
        fontSize: 16,
        color: '#333',
    },
    prescriptionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff3e0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginHorizontal: 30,
    },
    prescriptionInfo: {
        marginLeft: 10,
    },
    prescriptionText: {
        fontSize: 16,
        color: '#FF9800',
    },
});

export default PrescriptionTreatmentScreen;
