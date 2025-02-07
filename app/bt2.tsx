import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import React, { useState } from 'react';

const Bt2 = () => {
  const [barStyle, setBarStyle] = useState<'default' | 'light-content' | 'dark-content'>('light-content');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBarStyle(prev => (prev === 'light-content' ? 'dark-content' : 'light-content'));
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <StatusBar barStyle={barStyle} translucent backgroundColor="transparent" />
      <Text style={styles.text}>Kéo xuống để đổi màu StatusBar</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  }
});

export default Bt2;
