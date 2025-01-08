import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const players = [
  { name: 'Messi', goals: 30 },
  undefined,
  { name: 'Ronaldo', goals: 28 },
  { name: 'Neymar', goals: 22 },
  { goals: 2 },
  { name: 'Mbappé', goals: 25 },
  { name: 'Pele', goals: null },
];

// Hàm kiểm tra cầu thủ hợp lệ
function isValidPlayer(player) {
  return player?.name && typeof player?.goals === 'number';
}

// Lọc ra danh sách cầu thủ hợp lệ
const validPlayers = players.filter(isValidPlayer);

// Tìm cầu thủ có số bàn thắng nhiều nhất
let topScorer = null;
if (validPlayers.length > 0) {
  topScorer = validPlayers.reduce((max, player) => 
    player.goals > max.goals ? player : max
  , validPlayers[0]);
}

// Kết quả
console.log('Danh sách cầu thủ hợp lệ:', validPlayers);
console.log('Cầu thủ ghi bàn nhiều nhất:', topScorer);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Luu Quang Huy , PH49142</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});


