import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { db } from "@/firebase"; // Ensure you have Firebase configured
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const Homepage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [latestToll, setLatestToll] = useState({
    tollLocation: "Loading...",
    direction: "Loading...",
    tollFee: "Loading...",
  });
  const [loading, setLoading] = useState(true);
  const [licensePlate, setLicensePlate] = useState("");

  useEffect(() => {
    const fetchUserLicensePlate = async () => {
      if (!user) {
        console.log("User not authenticated, skipping license plate fetch.");
        return;
      }

      try {
        console.log("Fetching license plate for user:", user.uid);

        // Fetch user document using UID as the document ID
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          console.log("Fetched license plate:", userData.licensePlate);
          setLicensePlate(userData.licensePlate);
        } else {
          console.log("No user document found for UID:", user.uid);
        }
      } catch (error) {
        console.error("Error fetching license plate:", error);
      }
    };

    fetchUserLicensePlate();
  }, [user]);

  // Fetch latest toll record **only after the license plate is available**
  useEffect(() => {
    if (!licensePlate) return;

    const fetchLatestToll = async () => {
      try {
        console.log("Fetching latest toll record for plate:", licensePlate);
        const tollRef = collection(db, "tollRecords");
        const tollQuery = query(
          tollRef,
          where("numberPlate", "==", licensePlate),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(tollQuery);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          console.log("Latest toll record found:", doc);
          setLatestToll({
            tollLocation: doc.tollLocation || "Unknown",
            direction: doc.direction || "Unknown",
            tollFee: `RM${doc.tollFee?.toFixed(2) || "0.00"}`,
          });
        } else {
          console.log("No toll records found for this license plate.");
          setLatestToll({
            tollLocation: "No Records",
            direction: "No Records",
            tollFee: "RM0.00",
          });
        }
      } catch (error) {
        console.error("Error fetching latest toll data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestToll();
  }, [licensePlate]); // Run only after license plate is available

  const markers = [
    { id: 1, latitude: 3.139, longitude: 101.6869, title: "Kuala Lumpur" },
    { id: 2, latitude: 2.7456, longitude: 101.7072, title: "Putrajaya" },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        {/* E-Wallet Balance */}
        <View style={styles.walletContainer}>
          <View style={styles.walletRow}>
            <Ionicons name="wallet-outline" size={18} />
            <Text style={styles.walletLabel}>e-Wallet Balance</Text>
          </View>
          <Text style={styles.walletAmount}>RM25.80</Text>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => router.push("/reload")}
          >
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.reloadText}> RELOAD </Text>
          </TouchableOpacity>
        </View>

        {/* Toll Info */}
        <View style={styles.tollContainer}>
          <View style={styles.tollRow}>
            <Text style={styles.tollLabel}>Location</Text>
            <Text style={styles.tollLabel}>Direction</Text>
          </View>
          <View style={styles.tollRow}>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <Text style={styles.tollValue}>
                  {latestToll.tollLocation
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </Text>
                <Text style={styles.tollValue}>{latestToll.direction}</Text>
              </>
            )}
          </View>
          <Text style={styles.tollLabel}>Toll Fee</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.tollValue}>{latestToll.tollFee}</Text>
          )}
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            loadingEnabled={true}
            style={styles.map}
            initialRegion={{
              latitude: 3.139,
              longitude: 101.6869,
              latitudeDelta: 1.5,
              longitudeDelta: 1.5,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            rotateEnabled={false}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
              />
            ))}
          </MapView>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default Homepage;

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingTop: 50,
    paddingBottom: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 24,
    textAlign: "left",
  },
  walletContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 16,
    ...shadowStyle,
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  walletLabel: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  walletAmount: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 8,
  },
  reloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D7CC9",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "flex-start",
    ...shadowStyle,
  },
  reloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tollContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
    ...shadowStyle,
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  tollLabel: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  tollValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  mapContainer: {
    margin: 24,
    borderRadius: 10,
    overflow: "hidden",
    ...shadowStyle,
  },
  map: {
    height: 300,
    width: "100%",
  },
});
