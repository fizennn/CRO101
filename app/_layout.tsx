import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import bt1 from './bt1';
import bt2 from './bt2';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        initialRouteName="Bai1"
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
        }}
        >
        <Stack.Screen name="Bai1" component={bt1} options={{ title: 'Bai1' }} />
        <Stack.Screen name="Bai2" component={bt2} options={{ title: 'Bai2' }} />
       
      </Stack.Navigator>
  );
}