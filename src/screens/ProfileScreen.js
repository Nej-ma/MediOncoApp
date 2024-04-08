import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';
import * as AuthService from '../features/authentication/services/authService';
import { useEffect, useState } from 'react';
const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        firstname: "",
        Identifiant_ONCO: "",
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const currentUser = await AuthService.getStoredUserInfo();
            if (currentUser) {
                const name = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
                const firstname = currentUser.firstname.charAt(0).toUpperCase() + currentUser.firstname.slice(1);
                setUserInfo({
                    name: name,
                    firstname: firstname,
                    Identifiant_ONCO: currentUser.username
                });
            }
        };
    
        fetchUserInfo();
    }, []);
    

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image
                        source={{ uri: 'https://pergola-agava.si/wp-content/uploads/2020/08/profile-icon-png-898.png' }}
                        style={styles.profileImage}
                />
                <View style={styles.infoBox}>
                    <Text style={styles.label}>name</Text>
                    <Text style={styles.infoText}>{userInfo.name}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>firstname</Text>
                    <Text style={styles.infoText}>{userInfo.firstname}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Identifiant_ONCO</Text>
                    <Text style={styles.infoText}>{userInfo.Identifiant_ONCO}</Text>
                </View>
                <Text style={styles.bio}>{userInfo.bio}</Text>
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    infoBox: {
        width: '90%',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
    },
    bio: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        paddingHorizontal: 20,
    },
});

export default ProfileScreen;
