import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [selectedReviewForActions, setSelectedReviewForActions] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const storedReviews = await AsyncStorage.getItem('reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const saveReviews = async (newReviews) => {
    try {
      await AsyncStorage.setItem('reviews', JSON.stringify(newReviews));
    } catch (error) {
      console.error('Failed to save reviews:', error);
    }
  };

  const handleStarPress = (star) => {
    setRating(star);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (rating > 0) {
      const newReview = {
        id: Date.now().toString(),
        rating,
        feedback,
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      saveReviews(updatedReviews);

      setModalVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setRating(0);
    setFeedback('');
    Keyboard.dismiss();
  };

  const handleDeleteReview = (id) => {
    setReviewToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete);
    setReviews(updatedReviews);
    saveReviews(updatedReviews);
    setDeleteModalVisible(false);
    setReviewToDelete(null);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setRating(review.rating);
    setFeedback(review.feedback);
    setEditModalVisible(true);
  };

  const handleUpdateReview = () => {
    if (selectedReview) {
      const updatedReviews = reviews.map((review) =>
        review.id === selectedReview.id
          ? { ...review, rating, feedback }
          : review
      );
      setReviews(updatedReviews);
      saveReviews(updatedReviews);
      setSelectedReview(null);
      setRating(0);
      setFeedback('');
      setEditModalVisible(false);
      Keyboard.dismiss();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleReviewActions = (review) => {
    setSelectedReviewForActions(review);
    setActionsModalVisible(true);
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        {/* Star Rating */}
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={20}
              color={i < item.rating ? '#FFD700' : '#CCC'}
            />
          ))}
        </View>

        {/* Three Dots Menu */}
        <TouchableOpacity
          onPress={() => handleReviewActions(item)}
          style={styles.actionsButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Feedback Text */}
      <Text style={styles.reviewText}>
        {item.feedback || 'No comment provided.'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Feedback Card */}
        <View style={styles.card}>
          <Image source={require('../assets/logo1.png')} style={[styles.icon, { width: 70, height: 54,  alignSelf: 'center', marginBottom: 10 }]} />
          <Text style={styles.title}>How's your experience?</Text>
          <Text style={styles.subtitle}>Your feedback helps us improve our service</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => handleStarPress(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={45}
                  color={star <= rating ? '#FFD700' : '#CCC'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>
            {rating === 0 ? 'Tap a star to rate' :
             rating === 1 ? 'Poor' :
             rating === 2 ? 'Fair' :
             rating === 3 ? 'Good' :
             rating === 4 ? 'Very Good' : 'Excellent'}
          </Text>
          <Text style={styles.feedbackLabel}>Share your thoughts (optional):</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Tell us what you think..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
            onPress={selectedReview ? handleUpdateReview : handleSubmit}
            disabled={rating === 0}
          >
            <Text style={styles.submitText}>
              {selectedReview ? 'Update Review' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Header */}
        <View style={styles.reviewsHeader}>
          <Text style={styles.reviewsTitle}>Community Reviews</Text>
          <Text style={styles.reviewsSubtitle}>See what others are saying</Text>
        </View>

        {/* List of Reviews */}
        <View style={styles.reviewsContainer}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            contentContainerStyle={styles.reviewList}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyReviews}>
                <Ionicons name="chatbubble-outline" size={50} color="#CCC" />
                <Text style={styles.emptyReviewsText}>No reviews yet</Text>
                <Text style={styles.emptyReviewsSubtext}>Be the first to share your thoughts!</Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>Thank You!</Text>
            <Text style={styles.modalText}>Your feedback helps us serve you better.</Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="trash-bin" size={60} color="#FF4444" />
            </View>
            <Text style={styles.modalTitle}>Delete Review</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this review? This action cannot be undone.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Review Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="create" size={60} color="#C2A868" />
            </View>
            <Text style={styles.modalTitle}>Edit Review</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => handleStarPress(star)}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={45}
                    color={star <= rating ? '#FFD700' : '#CCC'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText}>
              {rating === 0 ? 'Tap a star to rate' :
               rating === 1 ? 'Poor' :
               rating === 2 ? 'Fair' :
               rating === 3 ? 'Good' :
               rating === 4 ? 'Very Good' : 'Excellent'}
            </Text>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Tell us what you think..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditModalVisible(false);
                  setSelectedReview(null);
                  setRating(0);
                  setFeedback('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.updateButton]}
                onPress={handleUpdateReview}
                disabled={rating === 0}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Review Actions Modal */}
      <Modal
        visible={actionsModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setActionsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setActionsModalVisible(false)}
        >
          <View style={styles.actionsModalContent}>
            <View style={styles.actionsHeader}>
              <Text style={styles.actionsTitle}>Review Actions</Text>
              <TouchableOpacity 
                onPress={() => setActionsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.actionsList}>
              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => {
                  setActionsModalVisible(false);
                  handleEditReview(selectedReviewForActions);
                }}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(194, 168, 104, 0.1)' }]}>
                  <Ionicons name="create" size={24} color="#C2A868" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Edit Review</Text>
                  <Text style={styles.actionSubtitle}>Modify your rating and feedback</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => {
                  setActionsModalVisible(false);
                  handleDeleteReview(selectedReviewForActions.id);
                }}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(255, 68, 68, 0.1)' }]}>
                  <Ionicons name="trash-bin" size={24} color="#FF4444" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={[styles.actionTitle, { color: '#FF4444' }]}>Delete Review</Text>
                  <Text style={styles.actionSubtitle}>Remove this review permanently</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#C2A868',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'OpenSans',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#F4F4F4',
    padding: 25,
    paddingBottom: 30,
    borderRadius: 20,
    width: '92%',
    alignSelf: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 2,
    position: 'relative',
    bottom: 15
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2E593F',
    fontFamily: 'OpenSans',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  ratingText: {
    fontSize: 18,
    color: '#2E593F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  feedbackLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'OpenSans',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#C2A868',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
    elevation: 0,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  reviewsContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  reviewList: {
    paddingBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 2,
    marginHorizontal: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'OpenSans',
  },
  reviewsHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E593F',
    fontFamily: 'OpenSans',
  },
  reviewsSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans',
  },
  emptyReviews: {
    alignItems: 'center',
    padding: 30,
  },
  emptyReviewsText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  emptyReviewsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    fontFamily: 'OpenSans',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 5,
  },
  modalIconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E593F',
    marginBottom: 10,
    fontFamily: 'OpenSans',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'OpenSans',
  },
  okButton: {
    backgroundColor: '#C2A868',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },
  okText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    marginTop: 0,
    zIndex: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalIconContainer: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E593F',
    marginBottom: 10,
    fontFamily: 'OpenSans',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'OpenSans',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
  },
  updateButton: {
    backgroundColor: '#C2A868',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  actionsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  actionsModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  actionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E593F',
    fontFamily: 'OpenSans',
  },
  closeButton: {
    padding: 5,
  },
  actionsList: {
    padding: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'OpenSans',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'OpenSans',
  },
  actionDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
});