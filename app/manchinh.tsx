import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function ManChinh( {navigation}) {

  const [noiDung,setNoiDung] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào Bạn, Đây Là Màn Hình Chính</Text>
      <TextInput style={styles.input} placeholder="Nhập Vào Nội Dung" onChangeText={(noiDung)=>{setNoiDung(noiDung)}} />
      <Button title="Đi Tới Màn Hình Chi Tiết" onPress={() => {navigation.navigate('ChiTiet',{ duLieu: noiDung })}} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '85%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});

export default ManChinh;
