import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import BottomMenu from '../components/BottomMenu';
import SearchPatient from '../features/patients/components/SearchPatient';
import { useNavigation } from '@react-navigation/native';
import { addRecentPatient } from '../utils/storage';

const PatientsScreen = () => {
    const navigation = useNavigation();

    const handlePatientSelect = (patientId) => {
        addRecentPatient(patientId);
        navigation.navigate('Patient', { patientId });
    };

    return (
        <View style={styles.container}>
            <CustomHeader navigation={navigation} />
            <SearchPatient onPatientSelect={handlePatientSelect} />
            <BottomMenu navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default PatientsScreen;
