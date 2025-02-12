import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const bt3 = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/images/phoco.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.buttonIcon}>←</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageOverlay}>
            <TouchableOpacity style={styles.heartButton}>
              <Text style={styles.heartIcon}>♥</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>PHỐ CỔ HỘI AN</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.rating}>5.0</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.location}>Quảng Nam</Text>
        </View>

        <Text style={styles.description}>
          Hội An là một thành phố trực thuộc tỉnh Quảng Nam, Việt Nam. 
          Phố cổ Hội An từng là một thương cảng quốc tế sầm uất, giao thương 
          di sản kiến trúc hàng trăm năm tuổi, được UNESCO công nhận là di sản 
          văn hóa thế giới và nằm trong danh sách các địa điểm du lịch thuộc 
          tỉnh Quảng Nam, Việt Nam. Phố cổ Hội An từng...
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$100</Text>
            <Text style={styles.perDay}>/ngày</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Đặt ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: width,
    height: height * 0.5,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 16,
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    color: 'white',
    fontSize: 24,
  },
  heartButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    color: 'red',
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  location: {
    color: '#4A90E2',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 24,
  },
  footer: {
    backgroundColor: '#0000FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  perDay: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#FFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    marginLeft:10
    
  },
  bookButtonText: {
    color: '0000FF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default bt3;