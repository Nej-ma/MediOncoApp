import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';
import {Linking} from 'react-native';
const SettingsScreen = () => {

  const openAppSettings = () => {

    Linking.openSettings();

  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <Text style={styles.title}>Paramètres</Text>
      
      <Text style={styles.paragraph}>
        Pour le bon fonctionnement de l'application, l'accès à la caméra est nécessaire.
      </Text>
      
      <Text style={styles.paragraph}>
        Si vous n'avez pas encore accordé cette permission, veuillez suivre les étapes ci-dessous pour l'activer dans les paramètres de votre appareil.
      </Text>

 

      <Text style={styles.instructionsTitle}>
        Instructions pour activer la permission :
      </Text>

      <Text style={styles.instructions}>
        1. Ouvrez les paramètres de l'application.
      </Text>
      <Text style={styles.instructions}>
        2. Cliquez sur 'Permissions'.
      </Text>
      <Text style={styles.instructions}>
        3. Activez la permission pour utiliser la caméra.
      </Text>

      <TouchableOpacity onPress={openAppSettings}>
        <Text style={styles.linkText}>
          Ouvrir les paramètres de l'application
        </Text>
      </TouchableOpacity>

      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'justify',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    instructions: {
        fontSize: 16,
        textAlign: 'justify',
        marginHorizontal: 20,
        marginBottom: 5,
    }
});

export default SettingsScreen;
