import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');

  // Hàm đăng ký
  const handleRegister = () => {
    let hasError = false;

    // Kiểm tra các trường nhập liệu
    if (name.trim() === '') {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (retypePassword.trim() === '') {
      setRetypePasswordError('Re-type Password is required');
      hasError = true;
    } else if (retypePassword !== password) {
      setRetypePasswordError('Passwords do not match');
      hasError = true;
    } else {
      setRetypePasswordError('');
    }

    if (hasError) {
      return;
    }

    // Giả sử sau khi đăng ký thành công
    Alert.alert('Success', 'Registered successfully!');
    
    // Sau khi đăng ký, chuyển đến màn hình đăng nhập
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <StatusBar translucent={true} backgroundColor="transparent" style='light'/>

      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.welcome}>Welcome to Lungo</Text>
      <Text style={styles.title}>Create an Account</Text>

      {/* Name Input */}
      <TextInput
        style={[styles.input, nameError ? styles.errorBorder : null]}
        placeholder="Name"
        placeholderTextColor="#828282"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError(''); // Xóa lỗi khi người dùng nhập
        }}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      {/* Email Input */}
      <TextInput
        style={[styles.input, emailError ? styles.errorBorder : null]}
        placeholder="Email Address"
        placeholderTextColor="#828282"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(''); // Xóa lỗi khi người dùng nhập
        }}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password Input */}
      <View style={[styles.inputContainer, passwordError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#828282"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(''); // Xóa lỗi khi người dùng nhập
          }}
          secureTextEntry
        />
        <Image source={require('../assets/images/eye.png')} />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Re-type Password Input */}
      <View style={[styles.inputContainer, retypePasswordError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re-type Password"
          placeholderTextColor="#828282"
          value={retypePassword}
          onChangeText={(text) => {
            setRetypePassword(text);
            setRetypePasswordError(''); // Xóa lỗi khi người dùng nhập
          }}
          secureTextEntry
        />
        <Image source={require('../assets/images/eye.png')} />
      </View>
      {retypePasswordError ? <Text style={styles.errorText}>{retypePasswordError}</Text> : null}

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={[styles.signupContainer, { marginTop: 5 }]}>
        <Text style={styles.text}>You have an account? Click</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignInScreen')}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0C0F14',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 24,
    color: '#828282',
  },
  welcome: {
    fontFamily: 'Poppins',
    fontSize: 24,
    marginBottom: 24,
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#828282',
    marginBottom: 8,
    backgroundColor: '#0C0F14',
    color: '#828282',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#0C0F14',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#828282',
  },
  button: {
    marginTop: 30,
    width: '100%',
    height: 57,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#828282',
  },
  signupLink: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#D17842',
    marginLeft: 4,
  },
  logo: {
    marginTop: 25,
    width: 142,
    height: 142,
    marginBottom: 20,
  },
  errorText: {
    width: '100%',
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  errorBorder: {
    borderColor: 'red',
  },
});

export default RegisterScreen;
