import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
const InfoScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <CustomHeader />
      <Text style={styles.title}>Information</Text>
      
      <Text style={styles.paragraph}>
        Cette application a était réalisé dans le cadre d'un projet de fin de semestre en BUT3 informatique à Arles.
      </Text>
      
      <Text style={styles.paragraph}>
        Elle permet d'avoir accès à des informations sur des patients fictifs d'une clinique de cancérologie.
      </Text>

      <Text style={styles.paragraph}>
        Toute utilisation externe à ce cadre est strictement interdite.
      </Text>

      <Text style={styles.paragraph}>
        Si vous avez des difficultés à utiliser l'application, veuillez vous référer à la rubrique 
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
        <Text style={{color : '#007AFF',  fontSize:16}}> Aide </Text>
        </TouchableOpacity>
      </Text>

      <Text style={styles.footer}>
        © MOUALHI Nejma - 2023
      </Text>

      <Text style={styles.footer}>
        Toute copie, reproduction ou distribution non autorisée de cette application est strictement interdite.
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
        lineHeight: 24, 
    },
    footer: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 10,
        fontStyle: 'italic', 
    }
});

export default InfoScreen;
