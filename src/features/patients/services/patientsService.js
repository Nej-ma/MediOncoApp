// patientsService.js
import { fetchGet } from '../../../services/WebServiceConsumer';

export const fetchPatientsByDoctorId = async (doctorId, token) => {
    try {
        return await fetchGet(`patients/${doctorId}/patients-by-doctor`, token);
    } catch (error) {
        console.error('Error fetching patients by doctor ID:', error);
        throw error;
    }
};

export const fetchPatientDetails = async (patientId, token) => {
    try {
        return await fetchGet(`patients/${patientId}`, token);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        throw error;
    }
};

export const searchPatients = async (searchParams, token) => {
    try {
        const queryParams = new URLSearchParams(searchParams).toString();
        return await fetchGet(`patients/search?${queryParams}`, token);
    } catch (error) {
        console.error('Error searching patients:', error);
        throw error;
    }
};

// Fetch medical records for a specific patient
export const fetchMedicalRecords = async (patientId, token) => {
    try {
        // Assuming your endpoint to fetch medical records by patient ID follows this pattern
        return await fetchGet(`medical-records/patient/${patientId}`, token);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        throw error;
    }
};

// Fetch appointments for a specific patient
export const fetchAppointments = async (patientId, token) => {
    try {
        // Assuming your endpoint to fetch appointments by patient ID follows this pattern
        // Note: Adjust the endpoint as per your actual API design
        return await fetchGet(`appointments/patient/${patientId}`, token);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

export const fetchDoctorAppointments = async (doctorId, token) => {
    try {
        return await fetchGet(`appointments/doctor/${doctorId}`, token);
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        throw error;
    }
}

export const getPatientsInAgenda = async (doctorId, date, starttime, endtime, token) => {
    try {
        return await fetchGet(`patients/agenda?doctorId=${doctorId}&date=${date}&starttime=${starttime}&endtime=${endtime}`, token);
    }
    catch (error) {
        console.error('Error fetching doctor appointments:', error);
        throw error;
    }
}

export const getServiceList = async (token) => {
    try {
        return await fetchGet(`doctors/specialty`, token);
    } catch (error) {
        console.error('Error fetching specialty:', error);
        throw error;
    }
}

export const getDoctorList = async (specialty, token) => {
    try {
        return await fetchGet(`doctors/specialty/${specialty}`, token);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
}

export const fetchTreatmentsByPatientId = async (patientId, token) => {
    try {
        return await fetchGet(`treatments/patient/${patientId}`, token);
    } catch (error) {
        console.error('Error fetching treatments by patient ID:', error);
        throw error;
    }
};

export const fetchPrescriptionsByTreatmentId = async (treatmentId, token) => {
    try {
        return await fetchGet(`prescriptions/treatment/${treatmentId}`, token);
    } catch (error) {
        console.error('Error fetching prescriptions by treatment ID:', error);
        throw error;
    }
};