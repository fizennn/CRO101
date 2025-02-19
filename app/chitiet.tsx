import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function chitiet({ navigation, route }) {
  const { duLieu } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào bạn {duLieu}</Text>
      <Button title="Trở Lại Bằng Go Back" onPress={() => navigation.goBack()} />
      <Button title="Trở Lại Bằng Reset" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'ManChinh' }] })} />
      <Button title="Trở Lại Bằng Pop" onPress={() => navigation.pop()} />
      <Button title="Trở Lại Bằng PopToTop" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default chitiet;
