import React,{ useState } from "react";
import {TextInput, StyleSheet, Text, View, Button, Alert} from "react-native";

const CustomView1 = () => {
  return (
    <View
      style={{
        backgroundColor: "lightblue",
        height: 200,
        width: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>Hello World!</Text>
    </View>
  );
};

const CustomView2 = () => {
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
        Lý trí em là <Text style={styles.underline}>công cụ</Text> còn trái tim anh là <Text style={styles.underline}>động cơ</Text>
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
};

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

const CustomView3 = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    Alert.alert('Thông tin nhập vào', `Họ tên: ${name}\nSố điện thoại: ${phone}\nMật khẩu: ${password}`);
  };


  return (
    <View style={style1.container}>
      <TextInput
        style={style1.input}
        placeholder="Nhập họ tên"
        placeholderTextColor="#888"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={style1.input}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={style1.input}
        placeholder="Nhập mật khẩu"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Đăng nhập" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
};

const style1 = StyleSheet.create({
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

export default CustomView3;