import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BT1 from './bt1';
import BT2 from './bt2';
import BT3 from './bt3';
import BT4 from './bt4';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return(

    <Drawer.Navigator 
    initialRouteName="Bài Tập 1">
      <Drawer.Screen name="Bài Tập 1" component={BT1} />
      <Drawer.Screen name="Bài Tập 2" component={BT2} />
      <Drawer.Screen name="Bài Tập 3" component={BT3} />
      <Drawer.Screen name="Bài Tập 4" component={BT4} />
    </Drawer.Navigator>
  );
}
