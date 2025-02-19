import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native'; // Thêm NavigationContainer
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon

import BT1 from './bai1';
import Chat from './chat';
import Setting from './setting';
import Article from './article';
import CustomDrawer from './CustomDrawer'; // Import Custom Drawer

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveTintColor: 'blue',
          drawerInactiveTintColor: 'gray',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        {/* Thêm icon cho từng mục */}
        <Drawer.Screen
          name="Home"
          component={BT1}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="chat" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={Setting}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Article"
          component={Article}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="article" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
}
