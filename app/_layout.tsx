import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BT1 from './bt1';
import BT2 from './bt2';
import BT3 from './bt3';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return(

    <Drawer.Navigator 
    initialRouteName="Bài 1">
      <Drawer.Screen name="Bài 1" component={BT1} />
      <Drawer.Screen name="Bài 2" component={BT2} />
      <Drawer.Screen name="Bài 3" component={BT3} />
    </Drawer.Navigator>
  );
}