import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const cart = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');
  const [newList, setNewList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'flex', backgroundColor: '#0C0F14', borderTopWidth: 0 },
    });
    const fetchUsername = async () => {
      const value = await AsyncStorage.getItem('username');
      if (value) {
        setUsername(value);
      }
    };
    fetchUsername();
  });

  useEffect(() => {
    if (username) {
      fetchOrders();
    }
  }, [username]);

  const fetchOrders = async () => {
    try {
      // Lấy danh sách đơn hàng
      const response = await axios.get(`https://working-tabbie-fizennn-addbb4df.koyeb.app/api/cart/${username}`);
      const orders = response.data;
      setOrders(orders);

      // Tạo một mảng các promise để gọi API song song
      const productPromises = orders.map(async (product) => {
        try {
          const productResponse = await axios.get(`https://working-tabbie-fizennn-addbb4df.koyeb.app/api/getCafeById/${product.idProduct}`);
              return {
            ten: productResponse.data.data.ten,
            avatar: productResponse.data.data.anh,
            mota: productResponse.data.data.diKem,
            gia: productResponse.data.data.gia,
            size: product.size,
            count: product.count,
            ordersid: product._id,
          };
        } catch (e) {
          console.error("Lỗi khi lấy thông tin sản phẩm:", e);
          return null;
        }
      });

      // Đợi tất cả các promise hoàn thành
      const updatedList = (await Promise.all(productPromises)).filter((item) => item !== null);

      // Cập nhật state newList một lần duy nhất
      setNewList(updatedList);
      console.log("Updated newList:", updatedList); // Log để kiểm tra dữ liệu
      setTotalPrice(updatedList.reduce((total, product) => total + product.gia * product.count, 0));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.avatar }} // Sửa thành { uri: item.avatar }
          style={styles.image}
          onError={(e) => console.log("Lỗi tải ảnh:", e.nativeEvent.error)}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.ten}</Text>
          <Text style={styles.subtitle}>{item.mota}</Text>
          <View style={styles.row}>
            <Text style={styles.size}>Size: {item.size}</Text>
            <Text style={styles.price}>${item.gia}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <Image source={require('../assets/images/nav.png')} />
              <Text style={styles.title}>Cart</Text>
              <Image source={require('../assets/images/user.png')} />
            </View>
      <FlatList
        data={newList} // Sử dụng newList thay vì orders
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key nếu item không có id
      />

    <View style={styles1.container}>
      {/* Phần hiển thị giá */}
      <View style={styles1.priceContainer}>
        <Text style={styles1.label}>Total Price</Text>
        <View style={styles1.priceRow}>
          <Text style={styles1.dollarSign}>$</Text>
          <Text style={styles1.price}>{totalPrice}</Text>
        </View>
      </View>

      {/* Nút Thanh Toán */}
      <TouchableOpacity style={styles1.payButton}>
        <Text style={styles1.payText}>Pay</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0C0F14", // Màu nền đen
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: "column",
  },
  label: {
    color: "#A0A0A0", // Màu chữ xám
    fontSize: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSign: {
    color: "#f59042", // Màu cam nâu
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    color: "#FFFFFF", // Màu chữ trắng
    fontSize: 20,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#f59042", // Màu cam nâu giống trong ảnh
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 20, // Bo góc cho nút
  },
  payText: {
    color: "#FFFFFF", // Chữ trắng
    fontSize: 22,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 52,
    flex: 1,
    backgroundColor: '#0C0F14',
    padding: 10,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
    backgroundColor: '#ccc', // Background tránh trường hợp ảnh lỗi
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  size: {
    backgroundColor: '#333',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  price: {
    color: '#f59042',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent:'space-between',
  },
  button: {
    display: 'flex',
    height: 40,
    width: 40,
    backgroundColor: '#f59042',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
  quantity: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

});

export default cart;