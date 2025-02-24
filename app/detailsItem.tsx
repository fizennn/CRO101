import React ,{ useEffect, useState } from 'react' ;
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ToastAndroid  } from 'react-native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const addToCart = async (idProduct, username, size, count) => {
  try {
    const response = await axios.post('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/cart/add', {
      idProduct,
      username,
      size,
      count,
    });

    if (response.status === 200 || response.status === 201) {
      ToastAndroid.show('Sản phẩm đã được thêm vào giỏ hàng!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    ToastAndroid.show('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!', ToastAndroid.SHORT);
  }
};


const removeFavorite = async (userId, productId) => {
  try {
    const response = await axios.delete('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/favorites/remove', {
      data: { UserId: userId, ProductId: productId },
    });

    ToastAndroid.show('Đã xóa khỏi yêu thích !', ToastAndroid.SHORT);
    console.log(response.data.messenger);
    
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error.response?.data?.messenger || error.message);
    throw error;
  }
};




const addToFavorites = async (userId, productId) => {
  try {
    const response = await axios.post('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/favorites/add', {
      UserId: userId,
      ProductId: productId,
    });

    if (response.data.messenger === "Thêm thành công!") {
      console.log("Sản phẩm đã được thêm vào danh sách yêu thích!");
      ToastAndroid.show('Đã thêm vào yêu thích !', ToastAndroid.SHORT);
    } else {
      console.log(response.data.messenger);
    }
  } catch (error) {
    console.log(error.status);
    if (error.status == '400'){
      removeFavorite(userId,productId)
    }
  }
};



const DetailsItem = ( {route, navigation} ) => {

  


    const [selectedSize, setSelectedSize] = useState('S');
    const { item } = route.params;
    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
    },[])
    

    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        console.log('Token from AsyncStorage:', value);
        const username  = value;
        const idItem = item._id;
        console.log('username: ' + username + '  idItem: ' + idItem);
        addToFavorites(username, idItem);
      } catch (error) {
        console.error('Failed to retrieve data', error);
      }
    };
    

  
    return (
      <ScrollView style={styleDetail.container}>
        <StatusBar translucent={true} backgroundColor="transparent" style='light'/>
        {/* Back button */}
        <TouchableOpacity style={styleDetail.backButton} onPress={()=>{
          navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'block', backgroundColor: '#0C0F14', borderTopWidth: 0  }
          });
          navigation.getParent().reset({
            index: 0,
            routes: [{ name: 'TrangChuLayout' }],
          });
          }}>
          <Image
            source={require('../assets/images/back.png')}
          />
          
        </TouchableOpacity>
  
   
        <TouchableOpacity style={styleDetail.heartButton} onPress={()=>{
          getData('username')
          }}>
          <Image
            source={require('../assets/images/fav.png')} 
          />
        </TouchableOpacity>
  
     
        <View 
          style={styleDetail.header}>
          <Image
            source={{uri: item.anh}} // Replace with the actual image URL
            style={styleDetail.image}
          />
  
          <View style={{
            width: '100%',
            height: '35%',
            position: 'absolute',
            bottom: 0,
       
          }}>
            <BlurView
              style={{ flex: 1,borderTopEndRadius: 25,borderTopLeftRadius: 25 ,// Bo góc
                overflow: 'hidden',display: 'flex',flexDirection:'row'}}
              tint="dark"
              intensity={80}
              //Them thuoc tinh bo goc
  
            >
              
            <View style={{}}>
              <View style={styleDetail.titleContainer}>
                <Text style={styleDetail.title}>{item.ten}</Text>
                <Text style={styleDetail.subtitle}>{item.diKem}</Text>
              </View>
  
              {/* Rating Section */}
              <View style={styleDetail.ratingContainer}>
                <Image
                  source={require('../assets/images/star.png')} // Replace with the actual star image URL
                />
                <Text style={styleDetail.rating}>{item.danhGia}</Text>
                <Text style={styleDetail.reviews}> ({item.soLuong})</Text>
              </View>
            </View>
            
            
            {/* Tags Section */}
            <View style={styleDetail.tagsContainer}>
              <View style={{display:'flex',flexDirection:'row'}}>
                <View style={[styleDetail.tag,{marginRight:30}]}>
                  <View style={{width:35,height:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Image
                    source={require('../assets/images/beansicon.png')}
                  />
                  </View>
                  
                  <Text style={styleDetail.tagText}>Bean</Text>
                  </View>
                <View style={styleDetail.tag}>
                <View style={{width:35,height:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Image
                    source={require('../assets/images/location.png')}// Replace with the actual coffee image URL
                  />
                  </View>
                  <Text style={styleDetail.tagText}>Africa</Text>
                  </View>
              </View>
              
            <View style={[styleDetail.tag,{width:'100%'}]}><Text style={[styleDetail.tagText]}>{item.cachRang}</Text></View>
            </View>
  
            </BlurView>
          </View>
        </View>
  
      
        
  
  
        <View style={{marginHorizontal:16}}>
  
       
        {/* Description Section */}
        <Text style={styleDetail.descriptionTitle}>Description</Text>
        <Text style={styleDetail.descriptionText}>
          {item.moTa}
        </Text>
  
        {/* Size Selection */}
        <Text style={styleDetail.sizeTitle}>Size</Text>
        <View style={styleDetail.sizeContainer}>
          {['S', 'M', 'L'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styleDetail.sizeButton,
                selectedSize === size && styleDetail.selectedSizeButton
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={
                  selectedSize === size
                    ? styleDetail.selectedSizeText
                    : styleDetail.sizeText
                }
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Price and Add to Cart Button */}
        <View style={styleDetail.footerContainer}>
          <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:12,color:'#AEAEAE'}}>Price</Text>
          <Text style={styleDetail.price}><Text style={{color:'#D17842'}}>$ </Text>{item.gia}</Text>
          </View>
          
          <TouchableOpacity style={styleDetail.addToCartButton} onPress={async ()=>{
            const value = await AsyncStorage.getItem('username');
            addToCart(item._id,value,selectedSize,1)
          }}>
            <Text style={styleDetail.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    );
  };
  
  const styleDetail = StyleSheet.create({
    container: {
      width:'100%',
      backgroundColor: '#0C0F14',
    },
    backButton: {
      position: 'absolute',
      top: 55,
      left: 16,
      zIndex: 10,
    },
    backButtonText: {
      fontSize: 24,
      color: 'white',
    },
    heartButton: {
      position: 'absolute',
      top: 55,
      right: 16,
      zIndex: 10,
    },
    heartButtonText: {
      fontSize: 24,
      color: 'white',
    },
    header:{
      width: '100%',
      height: '150%',
    },
    image: {
      width: '100%',
      height: '100%',
  
  
    },
    titleContainer: {
      marginTop: 16,
      alignItems: 'flex-start',
      marginLeft: 18
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
      height:60,
      marginLeft: 18,
      flexDirection: 'row',
      justifyContent: 'flex-start',
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
      marginRight:16,
      position: 'absolute',
      right: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 22,
    },
    tag: {
      height:60,
      width: 60,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#141921',
  
      borderRadius: 16,
      marginBottom: 8,
    },
    tagText: {
      textAlign:'center',
      width:150,
      color: '#AEAEAE',
      fontSize: 14,
    },
    descriptionTitle: {
      fontSize: 18,
      color: 'white',
      marginTop: 16,
      marginBottom: 8,
    },
    descriptionText: {
      height: 90,
      fontSize: 14,
      color: 'gray',
    },
    sizeTitle: {
      fontSize: 18,
      color: 'white',
      marginTop: 16,
      marginBottom: 8,
    },
    sizeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    sizeButton: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:"30%",
      backgroundColor: '#141921',
      borderWidth: 0,
      borderColor: 'gray',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    selectedSizeButton: {
      backgroundColor: '#141921',
      borderWidth: 1 ,
      borderColor:'#D17842',
  
    },
    sizeText: {
      color: '#AEAEAE',
      fontSize: 14,
    },
    selectedSizeText: {
      color: '#AEAEAE',
      fontSize: 14,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      paddingVertical: 16,
    },
    price: {
      fontSize: 24,
      color: 'white',
    },
    addToCartButton: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:240,
      height:60,
      backgroundColor: '#f59042',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 20,
    },
    addToCartText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default DetailsItem