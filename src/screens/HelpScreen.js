import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader />
      <Text style={styles.text}>Écran d'aide</Text>
      <Text style={styles.description}>
        Bienvenue sur l'écran d'aide ! Ici, vous pouvez trouver des informations et des instructions sur l'utilisation l'application.
      </Text>
      <Text style={styles.sectionTitle}>Questions fréquemment posées</Text>
      <Text style={styles.question}>Q: Comment rechercher un patient ?</Text>
      <Text style={styles.answer}>
        R: Dans le menu en bas de l'écran, cliquez sur "Patients" pour accéder à la recherche de patients. Vous pouvez rechercher un patient par son nom, son prénom ou son ID.
      </Text>
      <Text style={styles.question}>Q: Comment voir les détails d'un patient ?</Text>
      <Text style={styles.answer}>
        R: Il suffit de cliquer sur le patient dans la liste des résultats de recherche pour voir ses détails.
      </Text>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default HelpScreen;
