import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // Import the router object

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("User token removed");
      router.replace("/login"); // Use router.replace to navigate to the Login screen
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
