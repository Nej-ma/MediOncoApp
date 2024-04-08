import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuthContext } from '../context/authContext';

const SplashScreen = ({ navigation }) => {
  const { isLoggedIn, loading } = useAuthContext();
  useEffect(() => {
    if (!loading) {
      navigation.replace(isLoggedIn ? 'Home' : 'Login');
    }
  }, [isLoggedIn, loading, navigation]);


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo_onco.png')} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
  },
});
