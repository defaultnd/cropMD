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
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { use } from 'react';
import axios from 'axios';
import { REACT_AUTH_API_URL } from '@env';

const ResetPassword = () => {
  const router = useRouter();
  const { email } = useGlobalSearchParams();
  const [new_password, setNewPassword] = useState('');
  const [reset_code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!new_password || !confirmPassword) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    if (new_password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    console.log('Resetting password for email:', email, 'with new password:', new_password);
    try{
      const response = await axios.post(`${REACT_AUTH_API_URL}reset-password`, { email, reset_code, new_password }, { headers: { 'Content-Type': 'application/json' } });
      console.log('Response:', response.data);
      if (response.status === 200) {
        setSuccessMessage('Your password has been reset successfully');
        router.push('/login');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrorMessage(error.response.data.error || 'An error occurred. Please try again later.');
      }
    }
  };

  const handleVerifyCode = async () => {
      setErrorMessage('');
      setSuccessMessage('');
      
      if (!reset_code) {
        setErrorMessage('Please enter the verification code');
        return;
      }
  
      try {
        const response = await axios.post(`${REACT_AUTH_API_URL}reset-password`, { email, reset_code, new_password }, { headers: { 'Content-Type': 'application/json' } });
        console.log('Response:', response.data);
        if (response.status === 200) {
          setIsCodeSent(true);
        }
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          setErrorMessage(error.response.data.error || 'An error occurred. Please try again later.');
        } else {
          setErrorMessage('Network error. Please check your connection and try again.');
      }
      }
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
          
          {!isCodeSent ? (
              <View style={styles.formSection}>
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
                  style={styles.inputCode}
                  placeholder="Enter Code"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={reset_code}
                  onChangeText={setCode}
                />

                <TouchableOpacity style={styles.buttonCode} onPress={handleVerifyCode}>
                  <Text style={styles.buttonText}>Verify Code</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formSection}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Enter your new password</Text>

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

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput 
                    placeholder="New Password" 
                    style={styles.input} 
                    secureTextEntry={!showNewPassword}
                    value={new_password}
                    onChangeText={setNewPassword}
                  />
                  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons 
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#888" 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput 
                    placeholder="Confirm Password" 
                    style={styles.input} 
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#888" 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.backText}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
          )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  inputIcon: {
    marginRight: 10
  },
  eyeIcon: {
    marginLeft: 10
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000'
  },
  inputCode: {
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
  buttonCode: {
    backgroundColor: '#c4a23f',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
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

export default ResetPassword;
