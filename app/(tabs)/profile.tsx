import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [licensePlate, setLicensePlate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicensePlate = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setLicensePlate(userSnap.data().licensePlate);
          }
        } catch (error) {
          console.error("Error fetching license plate:", error);
        }
      }
      setLoading(false);
    };

    fetchLicensePlate();
  }, [user]);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#555" />
          <View style={styles.profileNameContainer}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#0f0" />
            <Text style={styles.profileName}>
              {user?.displayName || "User"}
            </Text>
          </View>
          <Text style={styles.profileID}>ID: 90001223</Text>

          {/* License Plate Display */}
          {loading ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginTop: 5 }}
            />
          ) : (
            <Text style={styles.profilePlate}>
              Vehicle Registration Number: {licensePlate || "Not Available"}
            </Text>
          )}
        </View>

        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="card-outline" size={20} color="black" />
            <Text style={styles.optionText}>Bank Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="repeat-outline" size={20} color="black" />
            <Text style={styles.optionText}>Auto Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" size={20} color="black" />
            <Text style={styles.optionText}>Security Authentication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="checkmark-circle-outline" size={20} color="black" />
            <Text style={styles.optionText}>Account Verification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="call-outline" size={20} color="black" />
            <Text style={styles.optionText}>Change Mobile Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="key-outline" size={20} color="black" />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="link-outline" size={20} color="black" />
            <Text style={styles.optionText}>Linked Devices</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="list-outline" size={20} color="black" />
            <Text style={styles.optionText}>Transaction Limit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="car-outline" size={20} color="black" />
            <Text style={styles.optionText}>My Vehicles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="location-outline" size={20} color="black" />
            <Text style={styles.optionText}>Location Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={20} color="black" />
            <Text style={styles.optionText}>Notification Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="trash-outline" size={20} color="black" />
            <Text style={styles.optionText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/login")}
          >
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.optionText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingTop: 60,
    paddingBottom: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 14,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  profileNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  profileID: {
    color: "white",
    fontSize: 16,
  },
  profilePlate: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});

export default ProfilePage;
