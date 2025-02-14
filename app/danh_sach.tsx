import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


function danh_sach({ navigation }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://67ada3543f5a4e1477de671c.mockapi.io/nguoiDung');
            setData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
        setLoading(false);
    }, []);

    useFocusEffect(
      useCallback(() => {
          getUsers();
      }, [])
    );

    const deleUser = (id) => {
            Alert.alert(
                'Xác nhận xóa',
                'Bạn có chắc chắn muốn xóa người này?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Có',
                        onPress: async () => {
                            try {
                                await axios.delete(`https://67ada3543f5a4e1477de671c.mockapi.io/nguoiDung/${id}`);
                                getUsers(); 
                            } catch (error) {
                                console.error('Lỗi khi xóa:', error);
                            }
                        },
                    },
                ]
            );
        };

  return (
    <View style={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Details', { item })}
        >
          <Text style={styles.title}>{item.id + ". "}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.editIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { item })}>
              <Image style={styles.image1} source={require('../assets/images/icons8-edit-50.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleUser(item.id)} >
              <Image style={styles.image2} source={require('../assets/images/icons8-delete-50.png')} />
            </TouchableOpacity>
          </View>
          
        </TouchableOpacity>
      )}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  )}
</View>


  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
      padding: 10,
      backgroundColor: '#FFFFF',
    },
    itemContainer: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      padding: 15,
      alignItems: 'center',
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 10,
      width: '100%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      textAlign: 'center',
      color: '#333',
    },
    editIcon: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      padding: 5,
      flex: 8,
    },
    image1: {
      width: 25,
      height: 25,
    },
    image2: {
      marginLeft:7,
      width: 30,
      height: 30,
    },
});

export default danh_sach