import React, { useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons'; // Import icon từ Expo

// Các màn hình trong tab
const FirstRoute = () => (
  <View style={[styles.scene]}>
    <Text>Tab 1</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene]}>
    <Text>Tab 2</Text>
  </View>
);

// Tạo Scene Map
const renderScene = SceneMap({
  tab1: FirstRoute,
  tab2: SecondRoute,
});

export default function bt2() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'tab1', title: 'Tab 1', icon: 'home' },
    { key: 'tab2', title: 'Tab 2', icon: 'settings' },
  ]);

  // Tùy chỉnh TabBar
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
      renderIcon={({ route }) => {
        const color = props.descriptors[route.key]?.options.tabBarIconColor || 'gray';
        return <Ionicons name={route.icon} size={24} color={color} />;
      }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'orange',
  },
  indicatorStyle: {
    backgroundColor: 'blue',
    height: 3,
  },
  labelStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});
