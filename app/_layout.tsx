import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';





import { useColorScheme } from '@/hooks/useColorScheme';


import SplashScreenComponent from './splash_screen'; // Import SplashScreenComponent
import SignInScreen from './sign_in';
import RegisterScreen from './register';
import TabLayout from './(tabs)/_layout';



SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function RootLayout() {

  const Stack = createNativeStackNavigator();

  console.log('1');

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  const [isReady, setIsReady] = useState(false);

  
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setIsReady(true);
      }, 0);
    }
  }, [loaded]);

  

  return (

      <View style={{
          backgroundColor: '#0C0F14',
          width: '100%',
          height: '100%',
      }}>
        <Drawer.Navigator 
          initialRouteName="SignInScreen"
          screenOptions={{
            headerShown: false,
            swipeEnabled: false, // Vô hiệu hóa cử chỉ vuốt
          drawerType: 'front', // Đảm bảo không làm ảnh hưởng UI
      }}>
        <Drawer.Screen name="SplashScreen" component={SplashScreenComponent} />
        <Drawer.Screen name="SignInScreen" component={SignInScreen} />
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        <Drawer.Screen name="TabLayout" component={TabLayout} />
      </Drawer.Navigator>

     
      </View>

      

      

  );
  
}







