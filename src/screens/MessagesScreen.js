import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenu from '../components/BottomMenu';
import CustomHeader from '../components/CustomHeader';

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
        <CustomHeader />
      <Text style={styles.text}>Messages Screen</Text>
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
    }
});

export default MessagesScreen;
