import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";

export default function RootLayout() {
  return (  
    <ImageBackground source={require('../assets/bg.jpg')} style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="about" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="review" />
        <Stack.Screen name="history" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="forgot-password" />
      </Stack>
    </ImageBackground>
  );
}
