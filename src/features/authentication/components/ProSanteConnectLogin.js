import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProSanteConnectLogin = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        console.log('ProSanteConnectLogin');
        navigation.navigate('Home');
    };

    return (
        <TouchableOpacity style={styles.socialButton} onPress={handleLogin}>
            <Image
                source={require('../../../../assets/prosanteconnect_button-removebg-preview.png')}
                style={styles.fullWidthButton}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fullWidthButton: {
        height: 50,
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});

export default ProSanteConnectLogin;