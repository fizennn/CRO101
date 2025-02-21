import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import các màn hình
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';

import bt2 from './bt2';

const Tab = createBottomTabNavigator();

// Hàm render Label (Ẩn nếu không focus)
const renderLabel = ({ focused, color, children }: { focused: boolean; color: string; children: string }) =>
  focused ? <Text style={[styles.labelStyle, { color }]}>{children}</Text> : null;

// Hàm render Icon với màu từ props.color
const renderIcon = ({ icon, props }: { icon: string; props: { focused: boolean; color: string; size: number } }) => (
  <Ionicons name={icon} size={props.size} color={props.color} />
);

// Hàm lấy tên icon phù hợp với từng tab
const getIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Tab1': return focused ? 'home' : 'home-outline';
    case 'Tab2': return focused ? 'settings' : 'settings-outline';
    case 'Tab3': return focused ? 'folder' : 'folder-outline';
    case 'Tab4': return focused ? 'person' : 'person-outline';
    default: return 'help-circle-outline';
  }
};

// Màu nền cho từng tab khi được chọn
const getBackgroundColor = (routeName: string, focused: boolean) => {
  if (!focused) return 'white'; // Màu nền mặc định
  switch (routeName) {
    case 'Tab1': return '#FFB6C1'; // Hồng nhạt
    case 'Tab2': return '#FFB6C1'; // Xanh nhạt
    case 'Tab3': return '#FFB6C1'; // Xanh lá nhạt
    case 'Tab4': return '#FFB6C1'; // Vàng
    default: return 'white';
  }
};

export default function bt1() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused, color }) => renderLabel({ focused, color, children: route.name }),
        tabBarIcon: ({ focused, color, size }) =>
          renderIcon({ icon: getIconName(route.name, focused), props: { focused, color, size } }),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        
        tabBarStyle: {
          backgroundColor: 'white', // Màu nền mặc định
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          height: 60,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarButton: (props) => {
          const { children, accessibilityState, onPress } = props;
          const focused = accessibilityState?.selected || false;
          return (
            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.tabButton,
                { backgroundColor: getBackgroundColor(route.name, focused) },
              ]}
            >
              {children}
            </TouchableOpacity>
          );
        },
        tabBarLabelPosition: 'beside-icon',
      })}
    >
      <Tab.Screen name="Tab1" component={bt2} />
      <Tab.Screen name="Tab2" component={Tab2} />
      <Tab.Screen name="Tab3" component={Tab3} />
      <Tab.Screen name="Tab4" component={Tab4} />
    </Tab.Navigator>
  );
}

// Style
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabButton: {
    flex: 1,
    borderRadius: 15,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
