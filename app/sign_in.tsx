import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Hàm đăng nhập
  const handleSignIn = () => {
    let hasError = false;

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

    if (hasError) {
      return;
    }

    // Giả sử sau khi đăng nhập thành công
    Alert.alert('Success', 'Logged in successfully!');
    // Chuyển đến màn hình chính
    navigation.navigate('TabLayout'); // Thay 'HomeScreen' bằng tên màn hình chính của bạn
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style="light-content" />
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.welcome}>Welcome to Lungo</Text>
      <Text style={styles.title}>Login To Continue</Text>

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

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Google Sign In Button */}
      <TouchableOpacity style={styles.buttonGoogle} onPress={handleSignIn}>
        <Image source={require('../assets/images/google.png')} style={{ marginLeft: 25, marginRight: 90 }} />
        <Text style={[styles.buttonText, { color: '#121212' }]}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Register and Reset Links */}
      <View style={[styles.signupContainer, { marginTop: 50 }]}>
        <Text style={styles.text}>Don’t have an account? Click</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink} onPress={() => navigation.navigate('RegisterScreen')}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.signupContainer]}>
        <Text style={styles.text}>Forget Password? Click</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Reset</Text>
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
  buttonGoogle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    height: 57,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 30,
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

export default SignInScreen;
