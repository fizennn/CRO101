import React ,{ useState } from 'react' ;
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, BackHandler  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { BlurView } from '@react-native-community/blur';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


const Drawer = createDrawerNavigator();

const caffeeList = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.2,
    rating: 4.5,
    image:
      'https://s3-alpha-sig.figma.com/img/d5b7/bcae/a9d15f45629762ae08c5fae9ca03d63b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BfbRc0Hed-dUUSU8BW39gcHe~RkTWcr5AFMHNtCNk7n5qtvZ15dWJXp-bBY7rlYC453RxfgHWGjjvKDW3pTZreVQY4bwMc-8ofVxRRQf0Mq0zNgGxKU5qmHiHIgbtYnae~L66Jw26oayWPgwokr0MGuLgzXHPqrYDKodK4WjdaRHSuTwGGazUme3pIXLMD50FOcjKwR7eLQRh6XJWRohPqZS0eTwsC~hhqSY9JBQP6w0zlbsfjMoyFDR6rz29T2RoxWRsKfOo-s1ldUv8MPbi2h86gEQsltVtcxlroQw8V7e~wKUsD4uq9qNHoc1VkYW75sTp~gFA32tqouy~4FtXw__',
  },
  {
    id: 2,
    name: 'Latte',
    description: 'With Creamy Milk',
    price: 4.5,
    rating: 4.7,
    image:
      'https://example.com/latte.jpg',
  },
];

const Home = ({navigation}) => {

  const Category = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];

  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const toggleTabBar = () => {
    console.log('toggle '+isTabBarVisible);
    if (isTabBarVisible==false) navigation.goBack();
    setIsTabBarVisible(!isTabBarVisible);
    navigation.getParent().setOptions({
      tabBarStyle: isTabBarVisible ? {display:'none',backgroundColor: '#0C0F14',borderTopWidth: 0} : {display:'flex',backgroundColor: '#0C0F14',borderTopWidth: 0},
    });
    
    
  };

  const back = () => {
    console.log('back '+isTabBarVisible);
    if (isTabBarVisible==false) toggleTabBar();
    return true;
  }

  BackHandler.addEventListener('hardwareBackPress', back);



  return (
    
    <ScrollView>
      <SafeAreaView style={styles.container}>

     

      <StatusBar translucent={true} backgroundColor="transparent" style='light'/>
   
      <View style={styles.header}>
        <Image source={require('../../assets/images/nav.png')}/>
        <Image source={require('../../assets/images/user.png')}/>

      </View>
      <View style={styles.header}>
        <Text style={[styles.title,{fontSize:30,fontWeight:'bold',marginTop:30,marginBottom:20}]}>Find the best {'\n'}coffee for you</Text>
        <TouchableOpacity>
          {/* <Image source={require('../assets/images/cafe1.png')} style={styles.avatar} /> */}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <Image source={require('../../assets/images/search.png')}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Find Your Coffee..."
          placeholderTextColor="#666"
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {Category.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      



        


      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
  
        <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/d5b7/bcae/a9d15f45629762ae08c5fae9ca03d63b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BfbRc0Hed-dUUSU8BW39gcHe~RkTWcr5AFMHNtCNk7n5qtvZ15dWJXp-bBY7rlYC453RxfgHWGjjvKDW3pTZreVQY4bwMc-8ofVxRRQf0Mq0zNgGxKU5qmHiHIgbtYnae~L66Jw26oayWPgwokr0MGuLgzXHPqrYDKodK4WjdaRHSuTwGGazUme3pIXLMD50FOcjKwR7eLQRh6XJWRohPqZS0eTwsC~hhqSY9JBQP6w0zlbsfjMoyFDR6rz29T2RoxWRsKfOo-s1ldUv8MPbi2h86gEQsltVtcxlroQw8V7e~wKUsD4uq9qNHoc1VkYW75sTp~gFA32tqouy~4FtXw__'}}
              style={styles.productImage}
            />
          <BlurView 
            intensity={120}
            tint="dark"
            style={{borderBottomLeftRadius:20,overflow: 'hidden',width: 50,height: 25,position: 'absolute',top: 0,right: 0,bottom: 0,justifyContent: 'center',alignItems: 'center',
            }}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/star.png')} style={{width:10,height:10}} />
                <Text style={{fontSize:10,color:'#fff',fontWeight:'bold'}} >  4.5</Text>
              </View>
            </BlurView>
          </View>
          <Text style={styles.productName}>Cappuccino</Text>
          <Text style={styles.productDescription}>With Steamed Milk</Text>
          <View style={styles.productFooter}>
            <Text>
            <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/38d1/813d/313b6940b6f0f0fe599f787b83cb6b42?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V3DBzRsN1S4W5Ax1vNIpni70hgJ9UO0joTLIfkhcauO5ExFFbJDkcK2tlFIvFCAhjFV2scsWHHwwPJlqAbq0iIC-Ev5fXSIWay~IeJb6dGxK4K-tUisEoxzP9ItpW3Af-rwm4JuNMZ-w6d3cfke61rvDF9hCSLIDbkDRO2jO6dDyHo4Alh5o9ISF~lIlDkSADeUyHiZNVumuM51F6eQxntcZxb9HkVqPbcJKpmVD2-I9iztTDyPl5HvAZgbHnyY0DAcyvFSDMf8bl10EDNadiBC0~2riGrRf47a84fuENAPwaXG00Mgut7nRFORLEly7NMJE02Mm9j8~gxpFkDJ27A__'}}
              style={styles.productImage}
            />
          <BlurView 
            intensity={120}
            tint="dark"
            style={{borderBottomLeftRadius:20,overflow: 'hidden',width: 50,height: 25,position: 'absolute',top: 0,right: 0,bottom: 0,justifyContent: 'center',alignItems: 'center',
            }}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/star.png')} style={{width:10,height:10}} />
                <Text style={{fontSize:10,color:'#fff',fontWeight:'bold'}} >  4.5</Text>
              </View>
            </BlurView>
          </View>
          <Text style={styles.productName}>Cappuccino</Text>
          <Text style={styles.productDescription}>With Foam</Text>
          <View style={styles.productFooter}>
            <Text>
            <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/d5b7/bcae/a9d15f45629762ae08c5fae9ca03d63b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BfbRc0Hed-dUUSU8BW39gcHe~RkTWcr5AFMHNtCNk7n5qtvZ15dWJXp-bBY7rlYC453RxfgHWGjjvKDW3pTZreVQY4bwMc-8ofVxRRQf0Mq0zNgGxKU5qmHiHIgbtYnae~L66Jw26oayWPgwokr0MGuLgzXHPqrYDKodK4WjdaRHSuTwGGazUme3pIXLMD50FOcjKwR7eLQRh6XJWRohPqZS0eTwsC~hhqSY9JBQP6w0zlbsfjMoyFDR6rz29T2RoxWRsKfOo-s1ldUv8MPbi2h86gEQsltVtcxlroQw8V7e~wKUsD4uq9qNHoc1VkYW75sTp~gFA32tqouy~4FtXw__'}}
              style={styles.productImage}
            />
          <BlurView 
            intensity={120}
            tint="dark"
            style={{borderBottomLeftRadius:20,overflow: 'hidden',width: 50,height: 25,position: 'absolute',top: 0,right: 0,bottom: 0,justifyContent: 'center',alignItems: 'center',
            }}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/star.png')} style={{width:10,height:10}} />
                <Text style={{fontSize:10,color:'#fff',fontWeight:'bold'}} >  4.5</Text>
              </View>
            </BlurView>
          </View>
          <Text style={styles.productName}>Cappuccino</Text>
          <Text style={styles.productDescription}>With Steamed Milk</Text>
          <View style={styles.productFooter}>
            <Text>
            <Text style={{color:'#D17842'}}>$ </Text><Text style={styles.productPrice}>4.20</Text>
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


        

        

      
        

        
      </ScrollView>


      <Text style={[styles.title,{marginTop:20}]}>Coffee beans</Text>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.productList,{marginBottom:50}]}>
     
      <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/0ed4/77b7/0d5052984d7848c0feaaf073901abb7d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m9CLyUkDGSXjvFw~faIcYkuIzgQVl-VgXbvgw8GX5UE~78j6QwTbD5AHpwlROo-HI1zZiTUBUbspI3XK2HO5adTbLz5YkPLpBuY9XC90jP6c6A4t0gglo7UASBQgjIcepFAC~JuCMsH1dv8flESQ6YaWrmwJcQn0hmZFtUFfFmf8Nv~6UJFxtJF4moLMbHA9aLKSO6JwIChEFnC59vyfyq86pqPy3iwEux6RMbfEaeUBl~kyJ6EnI9Rd3qAHCFD~pgkSDc50NIplmgouTAgsb4b3DWt0yFK6eftyrXcHOsZMi1z0NTzGu~RlDQh6~yl1gEiw6pWxVZz5KchddQnJLg__'}}
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
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>




        <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/c3a5/62a1/72cfe4fbd9f1a8a582f3c62ec55cde05?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RmuXLiFNhJ9cEihPDnzuUROeMrYUXIj81fxDIZXLCm~qiRLwptkQqKApveg1UlMuCmWU5lv8qHvyyES7udL53131R1hms~8CHZMPzLyhgS4IOWe8uStAfvw204paq~0THLlA21QwuRh5U3MFlUmSsW-aAMvzj6IW52djNvDBN~-R-Km~2wbarooiVqzHo1~AVAIoF~CmYmonwRXXXq8PQw6bxnr0hpCgFkkvqwtg-MuQATgfLAfS0CjtZNBdXavI53~mh5eBxO5ekAYLcZsQ-ES81AiQLTgKtOozlXk4obmAOMGmX57sGN2p0XArHmcJGhQUTkMJ~HEWXUGymPHWnQ__'}}
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
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>




        <TouchableOpacity style={styles.productCard} onPress={()=>{toggleTabBar(); navigation.navigate('Detail')}}>
          <View style={{borderRadius:12,overflow: 'hidden',}}>
            <Image
              source={{uri: 'https://s3-alpha-sig.figma.com/img/0ed4/77b7/0d5052984d7848c0feaaf073901abb7d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m9CLyUkDGSXjvFw~faIcYkuIzgQVl-VgXbvgw8GX5UE~78j6QwTbD5AHpwlROo-HI1zZiTUBUbspI3XK2HO5adTbLz5YkPLpBuY9XC90jP6c6A4t0gglo7UASBQgjIcepFAC~JuCMsH1dv8flESQ6YaWrmwJcQn0hmZFtUFfFmf8Nv~6UJFxtJF4moLMbHA9aLKSO6JwIChEFnC59vyfyq86pqPy3iwEux6RMbfEaeUBl~kyJ6EnI9Rd3qAHCFD~pgkSDc50NIplmgouTAgsb4b3DWt0yFK6eftyrXcHOsZMi1z0NTzGu~RlDQh6~yl1gEiw6pWxVZz5KchddQnJLg__'}}
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
              <Image source={require('../../assets/images/add.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>



        

      
        

        
      </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
  searchContainer: {
    marginTop: 20,
    backgroundColor: '#1E222A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    marginLeft:10,
    fontSize:10,
    flex: 1,
    color: '#52555A',
    height: 45,
  },
  categoriesContainer: {
    marginTop: 20,
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
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    marginRight:20,
    display: 'flex',
    width: 149,
    backgroundColor: '#1E222A',
    
    borderRadius: 12,
    padding:12,
    alignItems: 'flex-start',
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
    height:29,
    width:29,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    padding: 8,
  },
});


const Detail = () => {
  return (
    <View>
      <Text>Details</Text>
    </View>
  )
}


const DetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState('250gm');

  return (
    <ScrollView style={styleDetail.container}>
      {/* Back button */}
      <TouchableOpacity style={styleDetail.backButton}>
        <Image
          source={require('../../assets/images/back.png')} // Replace with the actual back button image URL
        />
        
      </TouchableOpacity>

      {/* Heart button */}
      <TouchableOpacity style={styleDetail.heartButton}>
        <Image
          source={require('../../assets/images/fav.png')} // Replace with the actual heart button image URL
        />
      </TouchableOpacity>

      {/* Image Section */}
      <View 
        style={styleDetail.header}>
        <Image
          source={require('../../assets/images/beans.png')} // Replace with the actual image URL
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
              <Text style={styleDetail.title}>Robusta Beans</Text>
              <Text style={styleDetail.subtitle}>From Africa</Text>
            </View>

            {/* Rating Section */}
            <View style={styleDetail.ratingContainer}>
              <Image
                source={require('../../assets/images/star.png')} // Replace with the actual star image URL
              />
              <Text style={styleDetail.rating}> 4.5</Text>
              <Text style={styleDetail.reviews}> (6,879)</Text>
            </View>
          </View>
          
          
          {/* Tags Section */}
          <View style={styleDetail.tagsContainer}>
            <View style={{display:'flex',flexDirection:'row'}}>
              <View style={[styleDetail.tag,{marginRight:30}]}>
                <View style={{width:35,height:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Image
                  source={require('../../assets/images/beansicon.png')}// Replace with the actual coffee image URL
                />
                </View>
                
                <Text style={styleDetail.tagText}>Bean</Text>
                </View>
              <View style={styleDetail.tag}>
              <View style={{width:35,height:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Image
                  source={require('../../assets/images/location.png')}// Replace with the actual coffee image URL
                />
                </View>
                <Text style={styleDetail.tagText}>Africa</Text>
                </View>
            </View>
            
          <View style={[styleDetail.tag,{width:'100%'}]}><Text style={[styleDetail.tagText]}>Medium Roasted</Text></View>
          </View>

          </BlurView>
        </View>
      </View>

    
      


      <View style={{marginHorizontal:16}}>

     
      {/* Description Section */}
      <Text style={styleDetail.descriptionTitle}>Description</Text>
      <Text style={styleDetail.descriptionText}>
        Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world’s coffee. These tasty beans originated many centuries ago in the highlands of Ethiopia, and may even be the first coffee beans ever consumed!
      </Text>

      {/* Size Selection */}
      <Text style={styleDetail.sizeTitle}>Size</Text>
      <View style={styleDetail.sizeContainer}>
        {['250gm', '500gm', '1000gm'].map((size) => (
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
        <Text style={styleDetail.price}><Text style={{color:'#D17842'}}>$ </Text>10.50</Text>
        </View>
        
        <TouchableOpacity style={styleDetail.addToCartButton}>
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
  selectedSizeButton: {
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


export default function HomeScreen(){
  return (
    <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            swipeEnabled: false, // Vô hiệu hóa cử chỉ vuốt
          drawerType: 'front', // Đảm bảo không làm ảnh hưởng UI
      }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Detail" component={DetailsScreen} />
      </Drawer.Navigator>
  );
}

