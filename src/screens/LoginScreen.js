import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LoginForm from '../features/authentication/components/LoginForm';
import MicrosoftLogin from '../features/authentication/components/MicrosoftLogin';
import ProSanteConnectLogin from '../features/authentication/components/ProSanteConnectLogin';

const LoginScreen = () => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image source={require('../../assets/logo_onco.png')} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Merci de saisir vos données de connexion</Text>

      <LoginForm/>

      <View style={styles.separatorContainer}>
    <View style={styles.separatorLine} />
    <View style={styles.orTextContainer}>
        <Text style={styles.orText}>ou</Text>
    </View>
    <View style={styles.separatorLine} />
    </View>

    <MicrosoftLogin/>
      <ProSanteConnectLogin/>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orTextContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
