import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/login");
      } else {
        router.replace("/homepage");
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );

  return null; // This prevents flickering
}