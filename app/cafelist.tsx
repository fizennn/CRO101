import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { TextInput, Button } from 'react-native-paper';

const CafeList = ({ navigation }) => {
  const [cafes, setCafes] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [newCafe, setNewCafe] = useState({
    ten: '',
    diKem: '',
    cachRang: '',
    danhGia: 0,
    soLuong: 0,
    moTa: '',
    gia: 0,
    anh: '',
    loai: 0,
  });

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await axios.get('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/getAllCafes');
      setCafes(response.data.data);
    } catch (error) {
      console.error('Error fetching cafes:', error);
    }
  };

  const handleAddCafe = async () => {
    try {
      const response = await axios.post('https://working-tabbie-fizennn-addbb4df.koyeb.app/api/addCafe', newCafe);
      if (response.data.data) {
        setAddModalVisible(false);
        fetchCafes();
      }
    } catch (error) {
      console.error('Error adding cafe:', error);
    }
  };

  const handleUpdateCafe = async () => {
    try {
      const response = await axios.put(
        `https://working-tabbie-fizennn-addbb4df.koyeb.app/api/updateCafe/${selectedCafe._id}`,
        selectedCafe
      );
      if (response.data.status === 200) {
        setEditModalVisible(false);
        fetchCafes();
      }
    } catch (error) {
      console.error('Error updating cafe:', error);
    }
  };

  const handleDeleteCafe = async (id) => {
    try {
      const response = await axios.delete(
        `https://working-tabbie-fizennn-addbb4df.koyeb.app/api/deleteCafe/${id}`
      );
      if (response.data.status === 200) {
        fetchCafes();
      }
    } catch (error) {
      console.error('Error deleting cafe:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedCafe(item);
        setEditModalVisible(true);
      }}
    >
      <Image source={{ uri: item.anh }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.ten}</Text>
        <Text style={styles.diKem}>{item.diKem}</Text>
        <Text style={styles.gia}>{item.gia} $</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            // navigation.getParent()?.setOptions({
            //   tabBarStyle: { display: 'block', backgroundColor: '#0C0F14', borderTopWidth: 0 },
            // });
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'HomeScreen' }],
            // });
            navigation.goBack();
          }}
        >
          <Image source={require('../assets/images/back.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>List Cafe      </Text>
        <Text></Text>
      </View>
      <Button mode="contained" onPress={() => setAddModalVisible(true)} style={styles.button}>
        Thêm Café
      </Button>

      <FlatList data={cafes} renderItem={renderItem} keyExtractor={(item) => item._id} />

      {/* Modal Thêm Café */}
      <Modal isVisible={isAddModalVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContent}
        >
          <ScrollView>
            <Text style={styles.modalHeader}>Thêm Café Mới</Text>
            <TextInput
              label="Tên"
              value={newCafe.ten}
              onChangeText={(text) => setNewCafe({ ...newCafe, ten: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Đi kèm"
              value={newCafe.diKem}
              onChangeText={(text) => setNewCafe({ ...newCafe, diKem: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Cách rang"
              value={newCafe.cachRang}
              onChangeText={(text) => setNewCafe({ ...newCafe, cachRang: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#ffffa', placeholder: '#ffff', primary: '#D17842' } }}
            />
            <TextInput
              label="Mô tả"
              value={newCafe.moTa}
              onChangeText={(text) => setNewCafe({ ...newCafe, moTa: text })}
              style={styles.modalInput}
              multiline
              numberOfLines={3}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Giá"
              value={newCafe.gia.toString()}
              onChangeText={(text) => setNewCafe({ ...newCafe, gia: parseInt(text) || 0 })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Ảnh (URL)"
              value={newCafe.anh}
              onChangeText={(text) => setNewCafe({ ...newCafe, anh: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Loại"
              value={newCafe.loai.toString()}
              onChangeText={(text) => setNewCafe({ ...newCafe, loai: parseInt(text) || 0 })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <View style={styles.modalButtonContainer}>
              <Button mode="contained" onPress={handleAddCafe} style={styles.modalButton}>
                Thêm
              </Button>
              <Button mode="outlined" onPress={() => setAddModalVisible(false)} style={styles.modalButtonCancel}>
                Hủy
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal Chỉnh Sửa Café */}
      <Modal isVisible={isEditModalVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContent}
        >
          <ScrollView>
            <Text style={styles.modalHeader}>Chỉnh Sửa Café</Text>
            <TextInput
              label="Tên"
              value={selectedCafe?.ten}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, ten: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Đi kèm"
              value={selectedCafe?.diKem}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, diKem: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Cách rang"
              value={selectedCafe?.cachRang}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, cachRang: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Mô tả"
              value={selectedCafe?.moTa}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, moTa: text })}
              style={styles.modalInput}
              multiline
              numberOfLines={3}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Giá"
              value={selectedCafe?.gia.toString()}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, gia: parseInt(text) || 0 })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Ảnh (URL)"
              value={selectedCafe?.anh}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, anh: text })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <TextInput
              label="Loại"
              value={selectedCafe?.loai.toString()}
              onChangeText={(text) => setSelectedCafe({ ...selectedCafe, loai: parseInt(text) || 0 })}
              style={styles.modalInput}
              theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#D17842' } }}
            />
            <View style={styles.modalButtonContainer}>
              <Button mode="contained" onPress={handleUpdateCafe} style={styles.modalButton}>
                Cập nhật
              </Button>
              <Button mode="outlined" onPress={() => setEditModalVisible(false)} style={styles.modalButtonCancel}>
                Hủy
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0C0F14',
  },
  itemContainer: {
    marginTop: 12,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#262B33',
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diKem: {
    fontSize: 14,
    color: '#ffff',
  },
  gia: {
    fontSize: 14,
    color: '#ffff',
  },
  modalContent: {
    backgroundColor: '#262B33',
    padding: 22,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#ffff',
    marginBottom: 16,
    color: '#ffff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#D17842',
    borderRadius: 4,
  },
  modalButtonCancel: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#262B33',
    borderColor: '#D17842',
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#D17842',
    borderRadius: 4,
  },
  header: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CafeList;