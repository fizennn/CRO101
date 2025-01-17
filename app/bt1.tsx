import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const bt1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLine}>
        Em vào đời bằng <Text style={styles.highlightRed}>vang đỏ</Text> anh vào đời bằng <Text style={styles.highlightYellow}>nước trà</Text>
      </Text>
      <Text style={styles.textLine}>
        Bằng cơn mưa thơm <Text style={styles.highlightBrown}>mùi đất</Text> và bằng hoa đại mọc trước nhà
      </Text>
      <Text style={styles.textLine}>
        Em vào đời bằng kế hoạch anh vào đời bằng mộng mơ
      </Text>
      <Text style={styles.textLine}>
        Lý trí em là <Text style={styles.underline}> c ô n g  c ụ </Text> còn trái tim anh là <Text style={styles.underline}> đ ộ n g  c ơ </Text>
      </Text>
      <Text style={styles.textRight}>
        Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình
      </Text>
      <Text style={styles.textCenter}>
        <Text style={styles.highlightOrange}>Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình</Text>
      </Text>
      <Text style={styles.textLine}>
        Em vào đời bằng <Text style={styles.highlightGray}>mây trắng</Text> em vào đời bằng <Text style={styles.highlightGreen}>nắng xanh</Text>
      </Text>
      <Text style={styles.textLine}>
        Em vào đời bằng <Text style={styles.highlightRed}>đại lộ</Text> và con đường đời giờ <Text style={styles.highlightYellow}>vàng anh</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 20,
  },
  textLine: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
    textAlign: 'left',
  },
  textRight: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
    textAlign: 'right',
  },
  textCenter:{
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
    textAlign: 'center',
  },
  highlightRed: {
    color: 'red',
  },
  highlightYellow: {
    color: 'yellow',
  },
  highlightBrown: {
    fontSize: 25,
    color: 'brown',
  },
  highlightOrange: {
    color: 'orange',
    fontWeight: 'bold',
  },
  highlightGray: {
    color: 'gray',
  },
  highlightGreen: {
    color: 'green',
  },
  underline: {
    textDecorationLine: 'underline',
  },

});

export default bt1