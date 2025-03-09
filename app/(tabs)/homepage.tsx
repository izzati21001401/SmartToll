import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Homepage = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/smarttoll-logo.png")} style={styles.logo} />
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} placeholder="Search..." />
          <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={35} color="#555" />
        </TouchableOpacity>
      </View>

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
          <TouchableOpacity style={styles.reloadButton}>
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
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="grid-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pulse-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bar-chart-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingTop: 60, // Prevent content from going under the header
    paddingBottom: 60, // Prevent content from going under bottom navigation
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 10, // Ensures it's always on top
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 24, // Ensure content starts below the header
    paddingBottom: 24, // Ensure content does not overlap bottom navigation
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
  },
  walletRow: {
    flexDirection: "row",
    alignItems: 'center',
    //justifyContent: 'space-evenly',
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
  },
  tollSection: {
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
    alignContent: 'center',
    marginVertical: 8,
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tollColumn: {
    flex: 1,
    alignItems: "center",
  },  
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
    borderColor: "#fff",
  },
});
