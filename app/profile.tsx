import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ToastAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          const response = await fetch(`https://working-tabbie-fizennn-addbb4df.koyeb.app/api/auth/${storedUsername}`);
          const data = await response.json();
          setName(data.name || "");
          setUsername(data.username || "");
          setImg(data.avatar ||"");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const response = await fetch("https://working-tabbie-fizennn-addbb4df.koyeb.app/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, password }),
      });
      const data = await response.json();
      if (response.ok) {
        ToastAndroid.show('Đã cập nhật hồ sơ !', ToastAndroid.SHORT);
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'block', backgroundColor: '#0C0F14', borderTopWidth: 0  }
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
      } else {
        Alert.alert("Error", data.msg || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Setting</Text>
        <Text>            </Text>
      </View>

      <Image style={styles.img} source={{uri: img}} />

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} value={username} editable={false} placeholder="Username" placeholderTextColor="#aaa" />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-type password"
          placeholderTextColor="#aaa"
          secureTextEntry={!confirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    color: "white",
  },
  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#d87d4a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  img:{
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 10,
  }
});

export default ProfileScreen;
