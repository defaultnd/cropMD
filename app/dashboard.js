import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("EN");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={() => setShowLanguageModal(true)}
        >
          <MaterialIcons name="g-translate" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>
            {language === "EN"
              ? "Guard Your Crops,"
              : "Bantayan ang Iyong Pananim,"}
          </Text>
          <Text style={styles.headerTitle}>
            {language === "EN"
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
                    {language === "EN" ? "Corn" : "Mais"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {language === "EN"
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
                    {language === "EN" ? "Rice" : "Palay"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {language === "EN"
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
                    {language === "EN" ? "Tomato" : "Kamatis"}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {language === "EN"
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
            {language === "EN" ? "History" : "Kasaysayan"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/review")}
          style={styles.navItem}
        >
          <Ionicons name="star" size={24} color="#808080" />
          <Text style={styles.navText}>
            {language === "EN" ? "Ratings" : "Rating"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/about")}
          style={styles.navItem}
        >
          <Ionicons name="information-circle" size={24} color="#808080" />
          <Text style={styles.navText}>
            {language === "EN" ? "About" : "Tungkol"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={styles.navItem}
        >
          <Ionicons name="log-out" size={24} color="#808080" />
          <Text style={styles.navText}>
            {language === "EN" ? "Logout" : "Logout"}
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {language === "EN"
                ? "Are you sure you want to logout?"
                : "Sigurado ka bang gusto mong mag-logout?"}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#d4af37" }]}
                onPress={() => {
                  setShowLogoutModal(false);
                  router.replace("/login");
                }}
              >
                <Text style={styles.modalButtonText}>
                  {language === "EN" ? "Yes" : "Oo"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonText}>
                  {language === "EN" ? "No" : "Hindi"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showLanguageModal}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { padding: 30 }]}>
            <Text style={styles.modalTitle}>
              Please select your preferred language
            </Text>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => {
                setLanguage("EN");
                setShowLanguageModal(false);
              }}
            >
              <Image
                source={require("../assets/us.jpg")}
                style={styles.flagIcon}
              />
              <Text style={styles.languageText}>English (US)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => {
                setLanguage("TL");
                setShowLanguageModal(false);
              }}
            >
              <Image
                source={require("../assets/ph.jpg")}
                style={styles.flagIcon}
              />
              <Text style={styles.languageText}>Tagalog (PH)</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
  },
  flagIcon: {
    width: 40,
    height: 30,
    marginRight: 15,
    resizeMode: "cover",
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
