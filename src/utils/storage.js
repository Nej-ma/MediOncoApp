import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPatientDetails } from '../features/patients/services/patientsService';
import * as AuthService from '../features/authentication/services/authService';


const getUsername = async () => {
  try {
    const username = await AuthService.getStoredUserInfoString();
    return username;
  } catch (error) {
    console.error('Error getting username:', error);
    return null;
  }
};
const getRecentPatientsKey = async () => {
  return 'recent_patients_' + await getUsername();
};

export const getRecentPatients = async (token) => {
  try {
    const RECENT_PATIENTS_KEY = await getRecentPatientsKey();
    const patientIdsString = await AsyncStorage.getItem(RECENT_PATIENTS_KEY);
    const patientIds = patientIdsString ? JSON.parse(patientIdsString) : [];
    const patientDetailsPromises = patientIds.map(patientId => fetchPatientDetails(patientId, token));
    const patientsDetails = await Promise.all(patientDetailsPromises);
    return patientsDetails.filter(patient => patient);
  } catch (error) {
    console.error('Error fetching recent patients:', error);
    return [];
  }
};

export const addRecentPatient = async (patientId) => {
  try {
    const RECENT_PATIENTS_KEY = await getRecentPatientsKey();
    const patientIdsString = await AsyncStorage.getItem(RECENT_PATIENTS_KEY);
    let patientIds = patientIdsString ? JSON.parse(patientIdsString) : [];
    if (patientIds.includes(patientId)) {
      // Remove the patientId from the current position
      patientIds = patientIds.filter(id => id !== patientId);
    }
    // Add the patientId to the top of the list
    patientIds = [patientId, ...patientIds.slice(0, 4)];
    await AsyncStorage.setItem(RECENT_PATIENTS_KEY, JSON.stringify(patientIds));
  } catch (error) {
    console.error('Error adding recent patient:', error);
  }
};
