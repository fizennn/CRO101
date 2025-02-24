import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsItem from './detailsItem';
import SettingsScreen from './setting';
import ProfileScreen from './profile';
import CafeList from './cafelist';

const Stack = createStackNavigator();

const home = ({ navigation }) => {
  const Category = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [caffeeList, setCaffeeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Hàm gọi API để lấy dữ liệu
  const fetchCafeData = async () => {
    try {
      const response = await fetch('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/getAllCafes');
      const data = await response.json();
      setCaffeeList(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setLoading(false);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchCafeData();
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'flex', backgroundColor: '#0C0F14', borderTopWidth: 0 }})
  }, []);

  const toggleTabBar = () => {
    if (isTabBarVisible == false) navigation.goBack();
    setIsTabBarVisible(!isTabBarVisible);
    navigation.getParent().setOptions({
      tabBarStyle: isTabBarVisible
        ? { display: 'none', backgroundColor: '#0C0F14', borderTopWidth: 0 }
        : { display: 'flex', backgroundColor: '#0C0F14', borderTopWidth: 0 },
    });
  };

  const back = () => {
    console.log('back ' + isTabBarVisible);
    if (isTabBarVisible == false) toggleTabBar();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', back);

  // Hàm render mỗi item trong FlatList
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        toggleTabBar();
        navigation.navigate('DetailsItem',{ item });
      }}
    >
      <View style={{ borderRadius: 12, overflow: 'hidden' }}>
        <Image source={{ uri: item.anh }} style={styles.productImage} />
        <BlurView
          intensity={120}
          tint="dark"
          style={{
            borderBottomLeftRadius: 20,
            overflow: 'hidden',
            width: 50,
            height: 25,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/star.png')} style={{ width: 10, height: 10 }} />
            <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>  {item.danhGia}</Text>
          </View>
        </BlurView>
      </View>
      <Text style={styles.productName}>{item.ten}</Text>
      <Text style={styles.productDescription}>{item.diKem}</Text>
      <View style={styles.productFooter}>
        <Text>
          <Text style={{ color: '#D17842' }}>$ </Text>
          <Text style={styles.productPrice}>{item.gia}</Text>
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Image source={require('../assets/images/add.png')} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Hiển thị loading indicator nếu đang tải dữ liệu
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D17842" />
      </View>
    );
  }

  // Lọc danh sách cafe dựa trên category được chọn
  const filteredCafeList = selectedCategory === 'All' 
    ? caffeeList 
    : caffeeList.filter(item => item.ten === selectedCategory);

  // Hàm render mỗi item trong danh sách category
  const renderCategoryItem = (category) => (
    <TouchableOpacity 
      key={category} 
      style={[
        styles.categoryItem, 
        selectedCategory === category && styles.selectedCategoryItem
      ]} 
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryText, 
        selectedCategory === category && styles.selectedCategoryText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  // Lọc danh sách cafe theo danh mục đã chọn
  const filteredCafes = selectedCategory === 'All'
    ? caffeeList
    : caffeeList.filter((item) => item.loai === selectedCategory);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style="light" />
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>{
            toggleTabBar();
            navigation.navigate('SettingsScreen')
          }}><Image source={require('../assets/images/nav.png')} /></TouchableOpacity>
          <Image source={require('../assets/images/user.png')} />
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: 30, fontWeight: 'bold', marginTop: 10, marginBottom: 20 }]}>
            Find the best {'\n'}coffee for you
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/images/search.png')} />
          <TextInput style={styles.searchInput} placeholder="Find Your Coffee..." placeholderTextColor="#666" />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.categoriesContainer,{marginBottom:-20}]}>
  {Category.map((category, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.categoryItem,
        selectedCategory === category && { display: 'flex', flexDirection: 'column' }
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category && { color: '#D17842', fontWeight: 'bold' },
      ]}>
        {category}
      </Text>
      {selectedCategory === category && (
        <Text style={{ fontSize: 40, textAlign: 'center', marginTop: -35 ,color: '#D17842'}}>.</Text>
      )}
    </TouchableOpacity>
  ))}
</ScrollView>

        {/* Coffee List */}
        <Text style={[styles.title, { marginTop: 20 }]}>Coffee</Text>
        <FlatList
          data={filteredCafeList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderProductItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />

        <Text style={[styles.title,{marginTop:0}]}>Coffee beans</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.productList,{marginBottom:50}]}>
          <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
            <View style={{borderRadius:12,overflow: 'hidden',}}>
              <Image
                source={{uri: 'https://s3-alpha-sig.figma.com/img/0ed4/77b7/0d5052984d7848c0feaaf073901abb7d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K~m8i~CiPpb9vILExLfu74xTGwoO8hO4TLLYNFCCcBrcHiipUfuCtP~Cx8zYnQLuaNMTReWkJCJK-X1OSjgkWBMUzh7nGVCDcrClwlvz9dcnVGOGicZCb6bPdKL29l448G51DaVS5fO6MtEgAh1s4GDPHmF34Gb4NuENxBeha4~YRIQuCvYaLOqPSxJjHAIvNIYrdnrGOFFAxH1xApFCwdK6eWWBkGcOHCb-diKMM2ec1JfDpKsavEJh6N20W4inZGhTDPupsYQy-8cYAYSIb1rRYfRRIHPOfWB6ELGo7PxT59PnY7vPfwk6TF3ITHyQBSspaKhOV6niQKGWgkFxWg__'}}
                style={styles.productImage}
              />
            </View>
            <Text style={styles.productName}>Robusta Beans</Text>
            <Text style={styles.productDescription}>Medium Roasted</Text>
            <View style={styles.productFooter}>
              <Text>
              <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Image source={require('../assets/images/add.png')}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
            <View style={{borderRadius:12,overflow: 'hidden',}}>
              <Image
                source={{uri: 'https://s3-alpha-sig.figma.com/img/0ed4/77b7/0d5052984d7848c0feaaf073901abb7d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K~m8i~CiPpb9vILExLfu74xTGwoO8hO4TLLYNFCCcBrcHiipUfuCtP~Cx8zYnQLuaNMTReWkJCJK-X1OSjgkWBMUzh7nGVCDcrClwlvz9dcnVGOGicZCb6bPdKL29l448G51DaVS5fO6MtEgAh1s4GDPHmF34Gb4NuENxBeha4~YRIQuCvYaLOqPSxJjHAIvNIYrdnrGOFFAxH1xApFCwdK6eWWBkGcOHCb-diKMM2ec1JfDpKsavEJh6N20W4inZGhTDPupsYQy-8cYAYSIb1rRYfRRIHPOfWB6ELGo7PxT59PnY7vPfwk6TF3ITHyQBSspaKhOV6niQKGWgkFxWg__'}}
                style={styles.productImage}
              />
            </View>
            <Text style={styles.productName}>Arabica Beans</Text>
            <Text style={styles.productDescription}>Medium Roasted</Text>
            <View style={styles.productFooter}>
              <Text>
              <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Image source={require('../assets/images/add.png')}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
            <View style={{borderRadius:12,overflow: 'hidden',}}>
              <Image
                source={{uri: 'https://s3-alpha-sig.figma.com/img/0ed4/77b7/0d5052984d7848c0feaaf073901abb7d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K~m8i~CiPpb9vILExLfu74xTGwoO8hO4TLLYNFCCcBrcHiipUfuCtP~Cx8zYnQLuaNMTReWkJCJK-X1OSjgkWBMUzh7nGVCDcrClwlvz9dcnVGOGicZCb6bPdKL29l448G51DaVS5fO6MtEgAh1s4GDPHmF34Gb4NuENxBeha4~YRIQuCvYaLOqPSxJjHAIvNIYrdnrGOFFAxH1xApFCwdK6eWWBkGcOHCb-diKMM2ec1JfDpKsavEJh6N20W4inZGhTDPupsYQy-8cYAYSIb1rRYfRRIHPOfWB6ELGo7PxT59PnY7vPfwk6TF3ITHyQBSspaKhOV6niQKGWgkFxWg__'}}
                style={styles.productImage}
              />
            </View>
            <Text style={styles.productName}>Robusta Beans</Text>
            <Text style={styles.productDescription}>Medium Roasted</Text>
            <View style={styles.productFooter}>
              <Text>
              <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Image source={require('../assets/images/add.png')}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    flex: 1,
  },
  searchContainer: {
    marginTop: 0,
    backgroundColor: '#1E222A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 10,
    flex: 1,
    color: '#52555A',
    height: 45,
  },
  categoriesContainer: {
    marginTop: 5,
  },
  categoryItem: {
    marginRight: 20,
    paddingVertical: 0,
  },
  categoryText: {
    color: '#52555A',
    fontSize: 16,
  },
  productList: {
    marginTop: 5,
    paddingBottom: 10,
  },
  productCard: {
    width: 149,
    backgroundColor: '#1E222A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    marginRight: 16,
  },
  productImage: {
    width: 126,
    height: 126,
    borderRadius: 12,
  },
  productName: {
    fontSize: 13,
    color: '#fff',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 9,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  productPrice: {
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 29,
    width: 29,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0F14',
  },
});

export default function LayoutHome() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeScreen" component={home} />
      <Stack.Screen name="DetailsItem" component={DetailsItem} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CafeList" component={CafeList}/>
    </Stack.Navigator>
  );
}