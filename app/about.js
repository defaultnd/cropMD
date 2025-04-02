import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const AboutScreen = () => {
  const router = useRouter();

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/dashboard')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>CropMD</Text>
        <Text style={styles.paragraph}>
          Welcome to CropMD, the app designed to help you protect your crops and grow with confidence!
        </Text>
        <Text style={styles.paragraph}>
          With our easy-to-use interface, you can capture images of your crops to learn about common diseases and receive guidance on proper crop care.
        </Text>
        <Text style={styles.paragraph}>
          Our mission is to empower farmers with modern tools and reliable insights to ensure a bountiful harvest every season.
        </Text>
        <Text style={styles.paragraph}>
          For support, suggestions, or feedback, please reach out to our team. We are constantly working to improve your experience.
        </Text>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('mailto:CropMD@gmail.com')}
          >
            <Ionicons name="mail" size={24} color="#84AA80" />
            <Text style={styles.contactText}>CropMD@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('https://www.facebook.com/')}
          >
            <FontAwesome name="facebook" size={24} color="#84AA80" />
            <Text style={styles.contactText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('tel:+1234567890')}
          >
            <Ionicons name="call" size={24} color="#84AA80" />
            <Text style={styles.contactText}>+639123456789</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
 header: {
  backgroundColor: '#C2A868',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 50,
  paddingBottom: 10,
  paddingHorizontal: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
    flex: 1,
    marginRight: 30, // Ensures the title stays centered
    fontFamily: 'OpenSans',
    marginLeft: 15
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  contactSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#84AA80',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
    fontFamily: 'OpenSans'
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    fontFamily: 'OpenSans'
  },
});