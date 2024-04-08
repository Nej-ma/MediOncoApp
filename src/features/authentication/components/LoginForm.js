import React, { useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../../context/authContext';
import { CommonActions } from '@react-navigation/native';

const LoginForm = () => {
    const [username, setusername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { loginError, isLoggedIn, login } = useAuthContext();
    const navigation = useNavigation();
    
    useEffect(() => {
        console.log('LoginForm:', isLoggedIn);

        if (isLoggedIn) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            );
        }
    }, [isLoggedIn, navigation]);

    const handleLogin = () => {
        console.log('handlelogin in LoginForm:', isLoggedIn);
        
        login(username, password);
    };

    const handleLoginAuto = () => {
        setusername('cristina.yang');
        setPassword('cricri123');

    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setusername}
                value={username}
                placeholder="Identifiant"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry

            />            

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>

            
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10, 
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#5A709F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginForm;