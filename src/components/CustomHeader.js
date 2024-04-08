import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const CustomHeader = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo_onco.png')} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
          <Icon name="menu" size={30} color="#5A709F" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1, 
    alighItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 45,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 10,
  },
});

export default CustomHeader;
