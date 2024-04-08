import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../../context/authContext';
const MicrosoftLogin = ({}) => {
    const navigation = useNavigation();
    const { loginMicrosoft  } = useAuthContext();



    const handleLogin = () => {
        loginMicrosoft();
        navigation.navigate('Home');
        

    };


    return (
        <TouchableOpacity style={styles.socialButton} onPress={handleLogin}>
            <Image source={require('../../../../assets/microsoft_logo.png')} style={styles.socialLogo} />
            <Text style={styles.socialButtonText}>Continuer avec Microsoft</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        width: '100%',
    },
    socialLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#555',
    },
});

export default MicrosoftLogin;
