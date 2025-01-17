import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const notifications = () => {
  return (
    <View style={styles.container}>
      <Text>notifications</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0C0F14',
  }
});

export default notifications