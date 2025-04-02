import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = () => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Password reset instructions have been sent to your email');
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </Animated.View>

      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Reset Password</Text>
          <Text style={styles.subtitleText}>Enter your email to receive reset instructions</Text>
        </View>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#FF3B30" />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        ) : null}

        {successMessage ? (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.successMessage}>{successMessage}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#808080" style={styles.icon} />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleResetPassword}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Send Reset Instructions</Text>
        </TouchableOpacity>

        <View style={styles.backToLoginContainer}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backToLoginButton}
          >
            <Ionicons name="arrow-back" size={20} color="#C2A868" />
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    opacity: 1,
    textAlign: 'center',
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorMessage: {
    color: '#FF3B30',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5FFE5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  successMessage: {
    color: '#34C759',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#FFF",

  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#C2A868",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backToLoginText: {
    color: '#C2A868',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default ForgotPassword;
