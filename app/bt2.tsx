import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'

const bt2 = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    Alert.alert('Thông tin nhập vào', `Họ tên: ${name}\nSố điện thoại: ${phone}\nMật khẩu: ${password}`);
  };


  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Nhập họ tên"
        placeholderTextColor="#888"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={style.input}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={style.input}
        placeholder="Nhập mật khẩu"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Đăng nhập" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
});

export default bt2