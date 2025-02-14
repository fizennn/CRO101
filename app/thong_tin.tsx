import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function thong_tin({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Chi Tiết</Text>
            <Image source={{ uri: item.avatar }} style={{ width: 150, height: 150 }} />
            <Text style={styles.detail}>ID: {item.id}</Text>
            <Text style={styles.detail}>Tên: {item.name}</Text>
            <Text style={styles.detail}>Ngày Tạo: {item.time}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  detail: {
      fontSize: 18,
  },
});

export default thong_tin