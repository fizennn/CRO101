import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const bt4 = () => {
  return (
    <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://vcdn1-giaitri.vnecdn.net/2020/12/27/Jack-5775-1609042368.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=AyQh7XQknwvQvA1VLzYvuw' }}
            style={styles.image}
          />
        </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default bt4