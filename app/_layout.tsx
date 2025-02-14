import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './danh_sach';
import DetailsScreen from './thong_tin';
import EditScreen from './chinh_sua';
import AddScreen from './them';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
        }}
        >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Chi tiết' }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Chỉnh Sửa' }} />
        <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Thêm' }} />
      </Stack.Navigator>
  );
}