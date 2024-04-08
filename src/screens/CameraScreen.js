import React, { useState, useEffect } from 'react';
import CameraModule from '../components/CameraModule';
import { View, StyleSheet } from 'react-native';
import { fetchPatientDetails } from '../features/patients/services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CameraScreen = ({ route, navigation }) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState(null);
    
    useEffect(() => {
        const fetchPatientData = async () => {
            const token = await AsyncStorage.getItem('auth_token');
            const patientDetails = await fetchPatientDetails(patientId, token);
            setPatient({ ...patientDetails});
        };
        fetchPatientData();
    }, [patientId]);
    const onPictureTaken = (filePath) => {
        console.log(`Picture saved at ${filePath}`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CameraModule onPictureTaken={onPictureTaken} patient={patient} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CameraScreen;
