import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import chitiet from './chitiet';
import manchinh from './manchinh';

const Stack = createStackNavigator();

export default function bai1() {
  return (
      <Stack.Navigator 
        initialRouteName="ManChinh"
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
        }}
        >
        <Stack.Screen name="ChiTiet" component={chitiet} options={{ title: 'Chi Tiet' }} />
        <Stack.Screen name="ManChinh" component={manchinh} options={{ title: 'Trang chủ' }} />
      </Stack.Navigator>
  );
}