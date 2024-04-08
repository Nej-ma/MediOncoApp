import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchPatientDetails, fetchMedicalRecords, fetchAppointments } from '../features/patients/services/patientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';


const PatientScreen = ({ route }) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSSN, setShowSSN] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        const loadPatientData = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const patientDetails = await fetchPatientDetails(patientId, token);
                const patientMedicalRecords = await fetchMedicalRecords(patientId, token);
                const patientAppointments = await fetchAppointments(patientId, token);

                setPatient(patientDetails);
                setMedicalRecords(Array.isArray(patientMedicalRecords) ? patientMedicalRecords : []);
                setAppointments(Array.isArray(patientAppointments) ? patientAppointments : []);
            } catch (error) {
                console.error('Error loading patient data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPatientData();
    }, [patientId]);

    const toggleSSNVisibility = () => {
        setShowSSN(!showSSN);
         
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!patient) {
        return (
            <View style={styles.container}>
                <Text>Rien à voir ici...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.header}>Informations du Patient</Text>
                <PatientDetail icon="person" label="NOM prénom" value={patient.name.toUpperCase() + " " + patient.firstname} />
                <PatientDetail icon="cake" label="Date de naissance" value={formatDate(patient.dateofbirth)} />
                {showSSN ? (
                    <PatientDetail icon="fingerprint" label="INS" value={patient.socialsecuritynumber} />
                ) : (
                    <TouchableOpacity onPress={toggleSSNVisibility}>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="fingerprint" size={24} style={styles.icon} />
                            <Text style={styles.detailLabel}>INS:</Text>
                            <Text style={styles.detailLabel}>********</Text>
                            <Text style={styles.detailValue}>(Cliquez pour afficher)</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <PatientDetail icon="home" label="Adresse" value={patient.address} />
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Historique Médical</Text>
                <MedicalRecords records={medicalRecords} />
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Rendez-vous à Venir</Text>
                <Appointments appointments={appointments} />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const PatientDetail = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
        <MaterialIcons name={icon} size={24} style={styles.icon} />
        <Text style={styles.detailLabel}>{label} : </Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const MedicalRecords = ({ records }) => {
    if (records.length === 0) {
        return <Text style={styles.infoText}>Aucun historique médical disponible.</Text>;
    }

    return records.map((record, index) => (
        <View key={index} style={styles.recordCard}>
            <Text style={styles.infoText}>Historique de visite: {record.visithistory}</Text>
            <Text style={styles.infoText}>Notes médicales: {record.medicalnotes}</Text>
            <Text style={styles.infoText}>Allergies : {record.allergies}</Text>
            <Text style={styles.infoText}>Condition préexistante : {record.preexistingconditions}</Text>
        </View>
    ));
};

const Appointments = ({ appointments }) => {
    const navigation = useNavigation();
    if (appointments.length === 0) {
        return <Text style={styles.infoText}>Aucun rendez-vous à venir.</Text>;
    }
    const formatDate = (dateString) => {
        const parsedDate = Date.parse(dateString);
        const modifiedDate = new Date(parsedDate);
        modifiedDate.setDate(modifiedDate.getDate() + 1);
        return format(modifiedDate, "dd/MM/yyyy", { locale: fr });
    };
    return appointments.map((appointment, index) => (
        console.log(appointment.date),
        <TouchableOpacity
            key={index}
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('Agenda')}
        >
            <Text style={styles.appointmentText}>Date: {formatDate(appointment.date)}</Text>
            <Text style={styles.appointmentText}>Heure: {appointment.time}</Text>
            <Text style={styles.appointmentText}>Motif de consultation : {appointment.purpose}</Text>
        </TouchableOpacity>
    ));
};

const formatDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return format(parsedDate, "dd/MM/yyyy", { locale: fr });
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
        marginTop: 30,    
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',       
    },
    section: {
        marginBottom: 30,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
        color: '#5A709F',
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    detailValue: {
        flex: 1,
    },
    recordCard: {
        backgroundColor: '#e8eaf6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    appointmentCard: {
        backgroundColor: '#c5cae9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    appointmentText: {
        fontSize: 16,
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#5A709F',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PatientScreen;
