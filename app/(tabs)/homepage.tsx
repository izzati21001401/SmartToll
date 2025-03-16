import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const Homepage = () => {
  const markers = [
    { id: 1, latitude: 3.139, longitude: 101.6869, title: "Kuala Lumpur" },
    { id: 2, latitude: 2.7456, longitude: 101.7072, title: "Putrajaya" },
  ];
  return (
    <View style={styles.container}>
      <Header />

      {/* Scrollable Content */}
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
            <Text style={styles.tollLabel}>Entry Point</Text>
            <Text style={styles.tollLabel}>Nearest Exit Point</Text>
          </View>
          <View style={styles.tollRow}>
            <Text style={styles.tollValue}>Taiping</Text>
            <Text style={styles.tollValue}>Kajang</Text>
          </View>
          <Text style={styles.tollLabel}>Estimated Toll Fee</Text>
          <Text style={styles.tollValue}>RM19.25</Text>
        </View>

        {/* Map Section */}
        {/* <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 3.139,
              longitude: 101.6869,
              latitudeDelta: 1.5,
              longitudeDelta: 1.5,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            rotateEnabled={false} // Prevent rotation
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
        </View> */}
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
    paddingTop: 60,
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
    ...shadowStyle, // Added shadow
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
    ...shadowStyle, // Added shadow
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
    ...shadowStyle, // Added shadow
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tollLabel: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  tollValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
  },
  mapContainer: {
    margin: 24,
    borderRadius: 10,
    overflow: "hidden",
    ...shadowStyle, // Added shadow
  },
  map: {
    height: 300,
    width: "100%",
  },
});
