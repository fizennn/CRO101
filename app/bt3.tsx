import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, ScrollView, Platform, StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const bt3 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Đăng Nhập</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập mật khẩu"
              secureTextEntry={secureText}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    width: 350,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding:5,
    paddingHorizontal:10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default bt3;
