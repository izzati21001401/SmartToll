import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Image, StyleSheet } from "react-native";

export default function SplashScreenComponent() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simulate a loading process
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/smarttoll-logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
  },
});