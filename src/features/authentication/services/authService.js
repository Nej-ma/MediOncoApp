import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthToken as fetchAuthToken, fetchGet } from '../../../services/WebServiceConsumer';

const API_URL = "http://10.0.2.2:3000"; // Ensure this matches your backend API URL
const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

export const authenticate = async (username, password) => {
    try {
        const token = await fetchAuthToken(username, password);
        if (token) {
            await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
            return { success: true, token };
        } else {
            return { success: false, message: 'Authentication failed' };
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return { success: false, message: error.message || 'Authentication error' };
    }
};

// Ensure this function is properly catching and returning errors.
export const changePassword = async (userId, currentPassword, newPassword) => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    console.log('changePassword : ' + userId + ' ' + currentPassword + ' ' + newPassword);
    try {
        const response = await fetch(`${API_URL}/users/${userId}/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.text();
        try {
            const jsonData = JSON.parse(data);
            if (response.ok) {
                return { success: true, data: jsonData };
            } else {
                return { success: false, message: jsonData.message || 'Failed to change password' };
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return { success: false, message: 'Unexpected response from the server' };
        }
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, message: error.message || 'Error changing password' };
    }
};

  
export const logout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_INFO_KEY);
};

export const verifyToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            return false;
        }
        const response = await fetchGet('users/verify-token', token);
        if (response.success) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};

export const getUserInfo = async (token) => {
    try {
        const userInfo = await fetchGet('users/me', token);
        await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export const getStoredUserInfo = async () => {
    const userInfoString = await AsyncStorage.getItem(USER_INFO_KEY);
    return userInfoString ? JSON.parse(userInfoString) : null;
};

export const getStoredUserInfoString = async () => {
    const userInfoString = await AsyncStorage.getItem(USER_INFO_KEY);
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    return userInfo ? userInfo.username : null;
};