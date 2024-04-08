import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = 'user_auth';

const DUMMY_DOCTORS = {
    mer: { firstName: 'Meredith', lastName: 'Grey', username: 'mer', password: 'greys' },
    maya: { firstName: 'Maya', lastName: 'Bishop', username: 'maya', password: 'bishop' },
    carina: { firstName: 'Carina', lastName: 'Deluca', username: 'carina', password: 'deluca' }
};

export const authenticate = async (username, password) => {
    const user = DUMMY_DOCTORS[username];
    console.log('authenticate : ' + username + ' ' + password);
    if (user && password === user.password) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Identifiant ou mot de passe incorrect' };
    }
};

export const logout = async () => {
    console.log('logout');
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getCurrentUser = async () => {
    const userString = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return userString ? JSON.parse(userString) : null;
};
