import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/authContext';

const DrawerContent = ({ navigation }) => {
  const { logout } = useAuthContext();
  const navig = useNavigation();

  const handleLogout = async () => {
      await logout();

  };
   
  return (
    <View style={styles.container}>
      {/* Profile */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.label}>Profil</Text>
      </TouchableOpacity>
      {/* Settings */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Paramètres')}>
        <Text style={styles.label}>Paramètres</Text>
      </TouchableOpacity>
      {/* Info */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.label}>Info</Text>
      </TouchableOpacity>
      {/* Disconnect */}
      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Text style={styles.label}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Adjust padding as needed
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
  },
});

export default DrawerContent;
