import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfilePage = () => {
    const [pressedButton, setPressedButton] = useState(null);
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
            {/* Profile Info */}
            <View style={styles.profileContainer}>
            <Ionicons name="person-circle-outline" size={100} color="#555" />
            <View style={styles.profileNameContainer}>
                <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                <Text style={styles.profileName}>Sarah Blossom</Text>
            </View>
            <Text style={styles.profileID}>ID: 90001223</Text>
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
            <TouchableOpacity style={styles.option} onPress={() => router.push("/login")}>
                <Ionicons name="log-out-outline" size={20} color="black" />
                <Text style={styles.optionText}>Log Out</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>

        {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
            <TouchableOpacity onPress={() => router.push("/homepage")}>
            <Ionicons name="grid-outline" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name="pulse-outline" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.payButton} onPress={() => console.log("Pay button pressed")}>
            <Ionicons name="scan" size={32} color="#1C5B99" />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3D7CC9",
        paddingTop: 0, 
        paddingBottom: 60, 
        marginTop: 24,
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
        zIndex: 10, 
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
        paddingTop: 75, // Ensure content starts below the header
        paddingBottom: 24,
        paddingHorizontal: 14,
    },
    profileContainer: {
        alignItems: "center",
        padding: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#ccc",
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
    payButton: {
    position: "absolute",
    bottom: 25, // Adjust position over navbar
    backgroundColor: "#fff", // Blue color for button
    borderRadius: 36,
    borderColor: "#1C5B99",
    padding: 12,
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
    });

    export default ProfilePage;
