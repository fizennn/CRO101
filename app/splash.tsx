import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';




const SplashScreen = ({ navigation}) => {
  
    const timer = setTimeout(() => {
      navigation.navigate('SignInScreen');
    }, 3000);

   

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style='light'/>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0F14',
  },
  logo: {
    width: 189,
    height: 189,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
