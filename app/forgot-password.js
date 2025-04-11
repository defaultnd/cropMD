import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendCode = () => {
    setErrorMessage('');
    setSuccessMessage('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Mock: check if email exists (in real case, query your backend)
    // if (email !== 'user@gmail.com') {
    //   setErrorMessage('No account associated with this email');
    //   return;
    // }

    setIsCodeSent(true);
    setSuccessMessage('Verification code has been sent to your email');
  };

  const handleVerifyCode = () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!code) {
      setErrorMessage('Please enter the verification code');
      return;
    }

    // Optional: mock correct code check
    if (code !== '123456') {
      setErrorMessage('The code you entered is incorrect');
      return;
    }

    setSuccessMessage('Code verified successfully');
    router.push('/reset-password');
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {!isCodeSent ? (
              <>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Enter your email to receive a verification code
                </Text>

                {errorMessage ? (
                  <View style={styles.alertContainer}>
                    <Ionicons name="alert-circle" size={20} color="#fff" />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}
                {successMessage ? (
                  <View style={[styles.alertContainer, styles.successContainer]}>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.successText}>{successMessage}</Text>
                  </View>
                ) : null}

                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Enter Code</Text>
                <Text style={styles.subtitle}>Check your email for the code</Text>

                {errorMessage ? (
                  <View style={styles.alertContainer}>
                    <Ionicons name="alert-circle" size={20} color="#fff" />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}
                {successMessage ? (
                  <View style={[styles.alertContainer, styles.successContainer]}>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.successText}>{successMessage}</Text>
                  </View>
                ) : null}

                <TextInput
                  style={styles.input}
                  placeholder="Enter Code"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={code}
                  onChangeText={setCode}
                />

                <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                  <Text style={styles.buttonText}>Verify Code</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backText}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 150
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  formSection: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#c4a23f',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  backText: {
    color: '#b88a00',
    fontSize: 14
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successContainer: {
    backgroundColor: '#4CAF50',
  },
  errorText: {
    color: '#fff',
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  successText: {
    color: '#fff',
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  }
});

export default ForgotPassword;
