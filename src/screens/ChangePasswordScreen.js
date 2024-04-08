// ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthContext } from '../context/authContext'; // Ajustez le chemin d'importation si nécessaire

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { user, changePassword } = useAuthContext();
    const { logout } = useAuthContext();



    const handleSave = async () => {
        setError(''); // Clear existing errors
        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
    
        const response = await changePassword(user.userid, currentPassword, newPassword);
        console.log("response",response);
        if (response.success) {
            await logout(); // Ensure logout is properly awaited if async
            navigation.navigate('Login', { message: 'Mot de passe modifié. Veuillez vous connecter avec votre nouveau mot de passe.' });
        
        
        } else {
            setError(response.message || 'Échec du changement de mot de passe. Veuillez réessayer.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Changer le mot de passe</Text>
            <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Mot de passe actuel"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nouveau mot de passe"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmer le nouveau mot de passe"
                secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#5A709F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default ChangePasswordScreen;
