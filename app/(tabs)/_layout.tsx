import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  console.log('2')
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false, // Ẩn tiêu đề
        tabBarStyle: {
          display: 'none',
        },
      }}>



    <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/home.png') // Icon khi được chọn
                  : require('@/assets/images/home.png') // Icon mặc định
              }
              style={{ width: 28, height: 28}}
            />
          ),
          tabBarStyle: { display: 'flex' ,backgroundColor: '#0C0F14',height: 50 , borderTopWidth: 0},
        }}
      />




      <Tabs.Screen
        name="cart"
        options={{

          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/cart.png') // Icon khi được chọn
                  : require('@/assets/images/cart.png') // Icon mặc định
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          tabBarStyle: { display: 'flex' ,backgroundColor: '#0C0F14',height: 50 , borderTopWidth: 0},
        }}
      />


      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/heart.png') // Icon khi được chọn
                  : require('@/assets/images/heart.png') // Icon mặc định
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          tabBarStyle: { display: 'flex' ,backgroundColor: '#0C0F14',height: 50 , borderTopWidth: 0},
        }}
      />


      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/notification.png') // Icon khi được chọn
                  : require('@/assets/images/notification.png') // Icon mặc định
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          tabBarStyle: { display: 'flex' ,backgroundColor: '#0C0F14',height: 50 , borderTopWidth: 0},
        }}
      />



      
    </Tabs>
    
    
  );
}
