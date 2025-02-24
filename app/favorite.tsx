import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';

const favorite = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(() => {
    fetchFavorites();
    
  });

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'flex', backgroundColor: '#0C0F14', borderTopWidth: 0 },
    });
  }, []);

  
  

  const fetchFavorites = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username) {
        const response = await fetch(`https://working-tabbie-fizennn-addbb4df.koyeb.app/api/favorites/get/${username}`);
        const data = await response.json();

        if (data.status === 200) {
          setFavorites(data.data);
          fetchProducts(data.data);
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu yêu thích:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (favorites) => {
    try {
      const productDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const response = await fetch(`https://working-tabbie-fizennn-addbb4df.koyeb.app/api/getCafeById/${favorite.ProductId}`);
          const data = await response.json();
          return data.data;
        })
      );
      setProducts(productDetails);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styleDetail.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style="light" />
      <TouchableOpacity style={styleDetail.heartButton} onPress={() => fetchFavorites()}>
        <Image source={require('../assets/images/fav.png')} />
      </TouchableOpacity>
      <View style={styleDetail.header}>
        <Image source={{ uri: item.anh }} style={styleDetail.image} />
        <View style={{ width: '100%', height: '37%', position: 'absolute', bottom: 0 }}>
          <BlurView
            style={{
              flex: 1,
              borderTopEndRadius: 25,
              borderTopLeftRadius: 25,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
            }}
            tint="dark"
            intensity={80}
          >
            <View style={styleDetail.titleContainer}>
              <Text style={styleDetail.title}>{item.ten}</Text>
              <Text style={styleDetail.subtitle}>{item.diKem}</Text>
            </View>
            <View style={styleDetail.ratingContainer}>
              <Image source={require('../assets/images/star.png')} />
              <Text style={styleDetail.rating}>{item.danhGia}</Text>
              <Text style={styleDetail.reviews}>({item.soLuong})</Text>
            </View>
            <View style={styleDetail.tagsContainer}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={[styleDetail.tag, { marginRight: 30 }]}>
                  <View
                    style={{
                      width: 35,
                      height: 30,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={require('../assets/images/beansicon.png')} />
                  </View>
                  <Text style={styleDetail.tagText}>Bean</Text>
                </View>
                <View style={styleDetail.tag}>
                  <View
                    style={{
                      width: 35,
                      height: 30,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={require('../assets/images/location.png')} />
                  </View>
                  <Text style={styleDetail.tagText}>Africa</Text>
                </View>
              </View>
              <View style={[styleDetail.tag, { width: '100%' }]}>
                <Text style={styleDetail.tagText}>{item.cachRang}</Text>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={styleDetail.descriptionTitle}>Description</Text>
        <Text style={styleDetail.descriptionText}>{item.moTa}</Text>
      </View>
    </View>
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style="light" />
      <View style={styles.header}>
        <Image source={require('../assets/images/nav.png')} />
        <Text style={styles.title}>Favorite</Text>
        <Image source={require('../assets/images/user.png')} />
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 16,
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
});

const styleDetail = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    backgroundColor: '#262B33',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 16,
    zIndex: 10,
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  header: {
    width: '100%',
    height: 450,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
    marginLeft: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#AEAEAE',
    marginTop: 4,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 7,
    flexDirection: 'row',

    height: 60,
    marginLeft: 18,
    alignItems: 'flex-end',
    marginTop: 8,
  },
  rating: {
    fontSize: 18,
    color: 'white',
  },
  reviews: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  tagsContainer: {
    marginRight: 16,
    position: 'absolute',
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 22,
  },
  tag: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141921',
    borderRadius: 16,
    marginBottom: 8,
  },
  tagText: {
    textAlign: 'center',
    width: 150,
    color: '#AEAEAE',
    fontSize: 14,
  },
  descriptionTitle: {

    fontSize: 18,
    color: 'white',
    marginTop: 15,
    marginBottom: 8,
  },
  descriptionText: {
    height: 90,
    fontSize: 14,
    color: 'gray',
  },
  
});

export default favorite;