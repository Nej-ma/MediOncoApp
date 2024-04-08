import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getServiceList, getDoctorList } from '../../../features/patients/services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendaLibellePicker = ({ onServiceDoctorSelected }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);
    const doctorOpacity = useRef(new Animated.Value(0)).current;
    const getToken = async () => {
        const token = await AsyncStorage.getItem('auth_token');
        return token;
      }

    useEffect(() => {
        fetchServiceList();
    }, []);

    useEffect(() => {
        fetchDoctorList(selectedService);
    }, [selectedService]);

    const fetchServiceList = async () => {
        const token = await getToken();
        const fetchedServices = await getServiceList(token);
        if (Array.isArray(fetchedServices)) {
            setServices(fetchedServices);
        } else {
            console.error("Fetched services is not an array.");
        }
    };
    
    const fetchDoctorList = async (specialty) => {
        console.log('fetchDoctorList', specialty);
        if (!specialty) {
            setDoctors([]);
            setSelectedDoctor('');
            onServiceDoctorSelected('', '');
            return;
        }
        try {
            const token = await getToken();
            // Assuming your API returns an array of doctor objects
            const fetchedDoctors = await getDoctorList(specialty, token);
            console.log('fetchedDoctors', fetchedDoctors);
            setDoctors(fetchedDoctors.map(doctor => doctor.name));
            animateDoctor();
            if (fetchedDoctors.length > 0) {
                const firstDoctorId = fetchedDoctors[0].id; // Assuming each doctor object has an id
                console.log('firstDoctorId', firstDoctorId);
                setSelectedDoctor(firstDoctorId);
                onServiceDoctorSelected(specialty, firstDoctorId);
            }
        } catch (error) {
            console.error('Error fetching doctor list:', error);
        }
    };
    const animateDoctor = () => {
        Animated.timing(doctorOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleServiceChange = (service) => {
        setSelectedService(service);
        setSelectedDoctor('');
    };

    const handleDoctorChange = (doctor) => {
        setSelectedDoctor(doctor);
        onServiceDoctorSelected(selectedService, doctor);
    };

    return (
        <View>
            <Text style={styles.label}>Service:</Text>
            <Picker
                selectedValue={selectedService}
                onValueChange={handleServiceChange}
                style={styles.picker}
            >
                <Picker.Item label="Choisir un service" value="" />
                {services.map((service, index) => (
                    <Picker.Item key={index} label={service} value={service} />
                ))}
            </Picker>
            {selectedService && doctors.length > 0 && (
                <>
                    <Text style={styles.label}>Doctor:</Text>
                    <Animated.View style={{ opacity: doctorOpacity }}>
                        <Picker
                            selectedValue={selectedDoctor}
                            onValueChange={handleDoctorChange}
                            style={styles.picker2}
                        >
                            {doctors.map((doctor, index) => (
                                <Picker.Item key={index} label={doctor} value={doctor} />
                            ))}
                        </Picker>
                    </Animated.View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14, 
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    picker: {
        marginBottom: 1, // Reduce the margin
        height: 40, 
    },
    picker2: {
        marginBottom: 15, 
        height: 40, 
    },
});

export default AgendaLibellePicker;