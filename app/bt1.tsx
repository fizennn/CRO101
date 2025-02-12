import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const bt1 = () => {
  return (
    <View style={styles.container}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam magna urna, varius quis convallis ac, fringilla a nulla. Donec in faucibus sapien. Duis a ultricies libero. Nam quis lorem ut urna lobortis dignissim. In vulputate urna eget volutpat vehicula. Cras hendrerit elit sit amet felis posuere, a vulputate urna tristique. Sed eu ultricies massa, vitae pellentesque eros. Etiam sed orci quis arcu mattis tincidunt ut at quam. Cras tempus purus nec est vestibulum volutpat.</Text>
      <Text style={styles.customFont}>Nunc pretium quis mi ac faucibus. Cras felis quam, dictum id gravida tincidunt, tincidunt sed turpis. Proin facilisis rhoncus erat, ultrices pretium ante viverra vel. Vestibulum vitae neque eu turpis viverra lobortis vitae sed tortor. Proin ornare pharetra finibus. Integer in ipsum eu dui euismod feugiat et vitae lorem. Aliquam erat volutpat. Phasellus a urna neque.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customFont: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
});

export default bt1;
