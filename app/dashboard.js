import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("EN");

  // Toggle Language
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "EN" ? "TL" : "EN"));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
          {/* Language Toggle (Top Right) */}
          <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
            <MaterialIcons name="g-translate" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            {/* Logo */}
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            {/* Title (Below Logo) */}
            <Text style={styles.headerTitle}>
              {language === "EN"
                ? "Guard Your Crops,"
                : "Bantayan ang Iyong Pananim, "}
            </Text>
            <Text style={styles.headerTitle}>
              {language === "EN"
                ? "Grow with Confidence!"
                : " Lumago nang May Kumpiyansa!"}
            </Text>
          </View>

        {/* Content */}
        <View style={styles.header}>
        <View style={styles.content}>
          {/* Corn Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Corn" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/mais.jpg")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{language === "EN" ? "Corn" : "Mais"}</Text>
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
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Rice" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/palay.jpg")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{language === "EN" ? "Rice" : "Palay"}</Text>
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
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Tomato" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/kamatis.jpg")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{language === "EN" ? "Tomato" : "Kamatis"}</Text>
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/history")} style={styles.navItem}>
          <Ionicons name="time" size={24} color="#808080" />
          <Text style={styles.navText}>{language === "EN" ? "History" : "Kasaysayan"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/review")} style={styles.navItem}>
          <Ionicons name="star" size={24} color="#808080" />
          <Text style={styles.navText}>{language === "EN" ? "Ratings" : "Rating"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/about")} style={styles.navItem}>
          <Ionicons name="information-circle" size={24} color="#808080" />
          <Text style={styles.navText}>{language === "EN" ? "About" : "Tungkol"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")} style={styles.navItem}>
          <Ionicons name="log-out" size={24} color="#808080" />
          <Text style={styles.navText}>{language === "EN" ? "Logout" : "Logout"}</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    backgroundColor: "#ffffff",
    height: '200%',
    width: '100%',
    marginTop: '10%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  languageToggle: {
    position: "absolute",
    right: 25,
    paddingTop: '4%',
  },
  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
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
    maxWidth: "90%", // Prevents overflow
    fontFamily: "OpenSans",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingBottom: 80,
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
});
