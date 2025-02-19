import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Phần Avatar & Tên */}
      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#007bff' }}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQ1P8b3Z2QvkhtwMZ268ACNGVXyHYdDHU1g&s' }} // Thay bằng link ảnh avatar thật
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
        />
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Lưu Quang Huy</Text>
        <Text style={{ color: 'white', fontSize: 14 }}>Developer</Text>
      </View>

      {/* Danh sách menu */}
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Nút Đăng xuất */}
      <Text>                        Phiên Bản Ứng Dụng 2.6.0</Text>
    </DrawerContentScrollView>
  );
}
