import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const DATA = [
  {
    name: 'Đặc Vụ 1',
    email: 'dacvu1@gmail.com',
    position: 'Hà Nội',
    photo: 'https://valorantvietnam.net/wp-content/uploads/2022/10/1-2.jpg',
  },
  {
    name: 'Đặc Vụ 2',
    email: 'dacvu2@gmail.com',
    position: 'Hải Phòng',
    photo: 'https://valorantvietnam.net/wp-content/uploads/2022/10/14-1.jpg',
  },
  {
    name: 'Đặc Vụ 3',
    email: 'dacvu3@gmail.com',
    position: 'Phú Thọ',
    photo: 'https://valorantvietnam.net/wp-content/uploads/2022/10/15.jpg',
  },
  
];

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

const ContactItem = ({ contact }: { contact: ContactType }) => {
  console.log("Image URL:", contact.photo); // Kiểm tra URL ảnh có đúng không

  return (
    <View style={styles.listItem}>
      <Image
        source={{ uri: contact.photo}}
        style={styles.avatar}
        resizeMode={"cover"}
      />
      <View style={styles.bodyItem}>
        <Text style={styles.nameText}>{contact.name}</Text>
        <Text>{contact.position}</Text>
      </View>
      <TouchableOpacity style={styles.btnCall}>
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const bt1 = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ContactItem contact={item} />}
        keyExtractor={(item) => item.email}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,

    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 10,
  },
  bodyItem: {
    marginLeft: 16,
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  btnCall: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 10,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default bt1;
