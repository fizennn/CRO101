import React, { useEffect, useState } from 'react'
import { Alert, TextInput, View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';

function chinh_sua({ route, navigation }) {
    const { item } = route.params;
    const [name, setName] = useState(item.name);
    const [img, setImg] = useState(item.avatar);

    const editUser = () => {

        axios.put(`https://67ada3543f5a4e1477de671c.mockapi.io/nguoiDung/${item.id}`, {
            name: name,
            avatar: img
        })
        .then(response => {
            navigation.goBack();
        })
        .catch(error => {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể cập nhật dữ liệu.');
        });

    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Đường dẫn ảnh</Text>
            <TextInput
                style={styles.input}
                value={img}
                onChangeText={setImg}
            />
            <Button title="Lưu" onPress={editUser} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default chinh_sua