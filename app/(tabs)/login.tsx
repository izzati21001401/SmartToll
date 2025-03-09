import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

const { USER_EMAIL, USER_PASSWORD } = Constants.expoConfig?.extra || {};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!USER_EMAIL || !USER_PASSWORD) {
      Alert.alert("Error", "Login system not configured properly.");
      return;
    }

    if (email === USER_EMAIL && password === USER_PASSWORD) {
      await AsyncStorage.setItem("userToken", "dummyToken");
      router.replace("/");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#4788C7"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Image */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/smarttoll-logo.png")}
              style={styles.logo}
            />
          </View>

          {/* White Container Card */}
          <View style={styles.cardContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Login Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.primaryButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/signup")}
            >
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 40,
  },
  logoContainer: {
    width: 320,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 320,
    height: 320,
    resizeMode: "contain",
  },
  cardContainer: {
    width: 345,
    minHeight: "auto",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#1E1E1E",
    marginBottom: 0,
  },
  input: {
    alignSelf: "stretch",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    fontSize: 16,
    color: "#1E1E1E",
  },
  primaryButton: {
    alignSelf: "stretch",
    padding: 12,
    backgroundColor: "#4788C7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignSelf: "stretch",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4788C7",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#4788C7",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "center",
    fontSize: 14,
    color: "#1E1E1E",
    textDecorationLine: "underline",
  },
});
