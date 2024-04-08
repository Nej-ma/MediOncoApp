import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigateTo('Home')} style={styles.navItem}>
          <Icon name="home" size={30} color="#5A709F" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Patients')} style={styles.navItem}>
          <Icon name="group" size={30} color="#5A709F" />
          <Text style={styles.navText}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Help')} style={styles.navItem}>
          <Icon name="live-help" size={30} color="#5A709F" />
          <Text style={styles.navText}>Aide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Agenda')} style={styles.navItem}>
          <Icon name="event" size={30} color="#5A709F" />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Suivi')} style={styles.navItem}>
          <Icon name="assignment" size={30} color="#5A709F" />
          <Text style={styles.navText}>Suivi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#5A709F',
    marginTop: 5,
  },
});

export default BottomMenu;