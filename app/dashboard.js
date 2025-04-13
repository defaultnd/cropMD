import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Animated} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { REACT_AUTH_API_URL } from "@env";
import * as SecureStore from "expo-secure-store";


const HomeScreen = () => {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("EN");
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleLanguageMenu = () => {
    if (showLanguageMenu) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowLanguageMenu(false));
    } else {
      setShowLanguageMenu(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
  };

  const handleSelectPress = () => {
    setCurrentLanguage(selectedLang);
    toggleLanguageMenu();
  };

  const handleLogout = async () => {
    const response = await axios.post(`${REACT_AUTH_API_URL}logout`);
    if (response.status === 200) {
      await SecureStore.deleteItemAsync('user');
      await SecureStore.deleteItemAsync('token');      
      setShowLogoutModal(false);
      router.replace("/login");
    }

  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={toggleLanguageMenu}
        >
          <MaterialIcons name="g-translate" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>
            {currentLanguage === "EN"
              ? "Guard Your Crops,"
              : "Bantayan ang Iyong Pananim,"}
          </Text>
          <Text style={styles.headerTitle}>
            {currentLanguage === "EN"
              ? "Grow with Confidence!"
              : " Lumago nang May Kumpiyansa!"}
          </Text>
        </View>

        <View style={styles.header}>
          <View style={styles.content}>
            {/* Corn Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({ pathname: "/camera", params: { crop: "Corn" } })
              }
            >
              <View style={styles.cardContent}>
                <Image
                  source={require("../assets/mais.jpg")}
                  style={styles.cardLogo}
                />
                <View style={styles.cardRight}>
                  <Text style={styles.cardTitle}>
                    {currentLanguage === "EN" ? "Corn" : "Mais"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {currentLanguage === "EN"
                      ? "Capture image of a leaf to know more about your crop's condition"
                      : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Rice Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({ pathname: "/camera", params: { crop: "Rice" } })
              }
            >
              <View style={styles.cardContent}>
                <Image
                  source={require("../assets/palay.jpg")}
                  style={styles.cardLogo}
                />
                <View style={styles.cardRight}>
                  <Text style={styles.cardTitle}>
                    {currentLanguage === "EN" ? "Rice" : "Palay"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {currentLanguage === "EN"
                      ? "Capture image of a leaf to know more about your crop's condition"
                      : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Tomato Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({ pathname: "/camera", params: { crop: "Tomato" } })
              }
            >
              <View style={styles.cardContent}>
                <Image
                  source={require("../assets/kamatis.jpg")}
                  style={styles.cardLogo}
                />
                <View style={styles.cardRight}>
                  <Text style={styles.cardTitle}>
                    {currentLanguage === "EN" ? "Tomato" : "Kamatis"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {currentLanguage === "EN"
                      ? "Capture image of a leaf to know more about your crop's condition"
                      : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push("/history")}
          style={styles.navItem}
        >
          <Ionicons name="time" size={24} color="#808080" />
          <Text style={styles.navText}>
            {currentLanguage === "EN" ? "History" : "Kasaysayan"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/review")}
          style={styles.navItem}
        >
          <Ionicons name="star" size={24} color="#808080" />
          <Text style={styles.navText}>
            {currentLanguage === "EN" ? "Ratings" : "Rating"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/about")}
          style={styles.navItem}
        >
          <Ionicons name="information-circle" size={24} color="#808080" />
          <Text style={styles.navText}>
            {currentLanguage === "EN" ? "About" : "Tungkol"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={styles.navItem}
        >
          <Ionicons name="log-out" size={24} color="#808080" />
          <Text style={styles.navText}>
            {currentLanguage === "EN" ? "Logout" : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutContainer}>
            <Text style={styles.logoutTitle}>
              {currentLanguage === "EN"
                ? "Are you sure you want to logout?"
                : "Sigurado ka bang gusto mong mag-logout?"}
            </Text>
            <View style={styles.logoutButtonsContainer}>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: "#d4af37" }]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>
                  {currentLanguage === "EN" ? "Yes" : "Oo"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: "#ccc" }]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.logoutButtonText}>
                  {currentLanguage === "EN" ? "No" : "Hindi"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
       <Modal
        visible={showLanguageMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleLanguageMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleLanguageMenu}
        >
          <Animated.View 
            style={[
              styles.languageMenu,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.modalTitle}>Please select prefer language</Text>
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLang === "EN" && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect("EN")}
            >
              <View style={styles.languageOptionContent}>
                <Image 
                  source={require("../assets/us.jpg")} 
                  style={styles.flagIcon}
                />
                <Text style={styles.languageOptionText}>English(US)</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLang === "TL" && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect("TL")}
            >
              <View style={styles.languageOptionContent}>
                <Image 
                  source={require("../assets/ph.jpg")} 
                  style={styles.flagIcon}
                />
                <Text style={styles.languageOptionText}>Tagalog(PH)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.selectButton}
              onPress={handleSelectPress}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2A868",
    paddingTop: 45,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: "#ffffff",
    height: "200%",
    width: "100%",
    marginTop: "10%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  languageToggle: {
    position: "absolute",
    right: 25,
    paddingTop: "4%",
  },
  logo: {
    width: 50,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
    marginLeft: 25,
  },
  headerTitle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "800",
    textAlign: "left",
    marginLeft: 35,
    maxWidth: "90%",
    fontFamily: "OpenSans",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    alignItems: "center",
    marginTop: -10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    height: 120,
    width: "90%",
    borderRadius: 35,
    marginBottom: 15,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRight: {
    flex: 1,
    marginLeft: 15,
  },
  cardLogo: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderColor: "#86E2AE",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    fontFamily: "OpenSans",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowRadius: 1,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    fontFamily: "OpenSans",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageMenu: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    padding: 10,
    borderRadius: 10,
  },
  selectedLanguage: {
    backgroundColor: 'rgba(194, 168, 104, 0.1)',
  },
  languageOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flagIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  selectButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  selectButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoutContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutIcon: {
    marginBottom: 10,
  },
  logoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  logoutMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#d4af37',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  

});
