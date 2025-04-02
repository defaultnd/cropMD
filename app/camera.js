import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [facing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', photo.uri);
        setPhotoUri(photo.uri);
      } catch (error) {
        console.error('Failed to capture photo:', error);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      }
    }
  }

  async function savePhotoToGallery(uri) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant permission to save photos to your gallery.');
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Photo Saved', 'The photo has been saved to your gallery.');
    } catch (error) {
      console.error('Failed to save photo:', error);
      Alert.alert('Error', 'Failed to save photo to gallery. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        // Photo preview screen
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => savePhotoToGallery(photoUri)}>
              <Text style={styles.buttonText}>Save Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setPhotoUri(null)}>
              <Text style={styles.buttonText}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Camera view
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#ff4757',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  previewImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
