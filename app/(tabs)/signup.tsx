import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { USER_EMAIL, USER_PASSWORD } = Constants.expoConfig?.extra || {};

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setModalVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Simulate saving user data
    await AsyncStorage.setItem("userEmail", email);

    // Auto-close notification after 2 seconds and redirect
    setTimeout(() => {
      setModalVisible(false);
      router.replace("/login");
    }, 2000);
  };
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#888"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

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

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.forgotPassword}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Signup Success Notification Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.overlay}>
        <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
        <Ionicons name="alert-circle-outline" size={20} color="green" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Signup Successful!</Text>
              <Text style={styles.subtitle}>
                You will be redirected to the login page.
              </Text>
            </View>
            </Animated.View>
        </View>
      </Modal>
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
  forgotPassword: {
    alignSelf: "center",
    fontSize: 14,
    color: "#1E1E1E",
    textDecorationLine: "underline",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    width: 345,
    elevation: 5,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  subtitle: {
    fontSize: 14,
    color: "#1E1E1E",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
});
