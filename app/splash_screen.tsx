import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ navigation}) => {
  
    const timer = setTimeout(() => {
      navigation.navigate('SignInScreen'); // When splash screen is done, navigate to SignInScreen
    }, 3000);

   

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style='light'/>
      <Image
        source={require('../assets/images/logo.png')} // Đảm bảo bạn có logo.png trong thư mục assets
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
    backgroundColor: '#0C0F14', // Màu nền Splash Screen
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

export default SplashScreenComponent;
