import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LoadingScreen = () => {
  const router = useRouter();

  // Animated values for three dots
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDots();

    // Redirect to login after 5 seconds
    setTimeout(() => {
      router.replace('/login');
    }, 5000);
  }, []);

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      {/* Dark overlay for shadow effect */}
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Image source={require('../assets/logon.png')} style={styles.logo} />
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.dot, { opacity: dot1Anim }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Anim }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Anim }]} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with 50% opacity
  },
  content: {
    alignItems: 'center',
    position: 'absolute', // Ensures content is above overlay
  },
  logo: {
    width: 70,
    height: 80,
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default LoadingScreen;
