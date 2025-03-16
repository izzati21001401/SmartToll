import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BottomNav = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => router.push("/homepage")}>
        <Ionicons name="grid-outline" size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/transactionHistory")}>
        <Ionicons name="pulse-outline" size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/stats")}>
        <Ionicons name="bar-chart-outline" size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Ionicons name="person-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1C5B99",
    paddingVertical: 15,
    borderRadius: 15,
  },
});

export default BottomNav;
