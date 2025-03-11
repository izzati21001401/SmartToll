import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

const ReloadOnline = () => {
    const router = useRouter(); // Correct way to use the router
    const [selectedPayment, setSelectedPayment] = useState("bank");
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const bankOptions = [
        { id: 'cimb', name: 'CIMB Clicks', image: require("@/assets/images/cimb.png") },
        { id: 'maybank', name: 'Maybank2U', image: require("@/assets/images/maybank.png") },
        { id: 'klarna', name: 'Bank Islam', image: require("@/assets/images/bankIslam.png") },
        { id: 'us-bank', name: 'Paypal', icon: 'logo-paypal' },
      ];

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
      <ScrollView style={styles.contentContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer} >
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#B0B0B0" />
        </View>

        {/* Payment Selection */}
        <View style={styles.paymentContainer}>
        <TouchableOpacity style={[styles.paymentOption, selectedPayment === 'credit' && styles.selectedOption]} 
            onPress={() => {setSelectedPayment('credit'); router.push("/reload-card");}}>
            <Ionicons name="card" size={20} color={selectedPayment === 'credit' ? '#007AFF' : 'black'} />
            <Text style={[styles.paymentText, selectedPayment === 'credit' && styles.selectedText]}>Credit/Debit Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.paymentOption, selectedPayment === 'bank' && styles.selectedOption]} 
            onPress={() => setSelectedPayment('bank')} >
            <Ionicons name="business" size={20} color={selectedPayment === 'bank' ? '#007AFF' : 'black'} />
            <Text style={[styles.paymentText, selectedPayment === 'bank' && styles.selectedText]}>Online Banking</Text>
          </TouchableOpacity>
        </View>

        {/* Bank Options */}
        {selectedPayment === "bank" && (
          <View style={styles.section}>
            {bankOptions.map((bank) => (
              <TouchableOpacity
                key={bank.id}
                style={[styles.option, selectedBank === bank.id && styles.selectedBankOption]}
                onPress={() => setSelectedBank(bank.id)}
              >
                <Ionicons
                  name={selectedBank === bank.id ? "radio-button-on" : "radio-button-off"}
                  size={20}
                  color={selectedBank === bank.id ? "#7D3C98" : "gray"}
                />
                <Ionicons name={"business"} size={20} color="black" style={{ marginLeft: 8 }} />
                <Text style={styles.optionText}>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
              <TouchableOpacity onPress={() => router.push("/profile")}>
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
        paddingTop: 80, 
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
    },
    section: {
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
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
    selectedBankOption: {
        borderColor: '#7D3C98', 
        backgroundColor: '#F3E5F5',
      },
      activeCard: {
        borderBottomWidth: 3,
        borderBottomColor: '#3b79b5',
      },
      cardText: {
        fontSize: 14,
        fontWeight: '600',
      },
      cardNumberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      },
      cardRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
      },
      cardLogo: {
        width: 90,
        height: 10,
        marginLeft: 10,
        alignItems: "center",
      },
      cvcLogo: {
        width: 40,
        height: 20,
        marginLeft: 10,
      },
      doneButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 25,
      },
      doneButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
      },
      navIcon: {
        color: '#fff',
      },
      activeNavIcon: {
        color: '#ffcc00',
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
      contentContainer: { 
        padding: 24,
      },
      inputContainer: { 
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "column",
        alignItems: "flex-start",
      },
      inputContainerHalf: {
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginRight: 4,
        flex: 1,
    },
      label: { 
        fontSize: 16,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 4, 
      },
      input: { 
        width: "100%",
        padding: 4,
        fontSize: 16,
      },
      paymentContainer: { 
        flexDirection: 'row',  
        marginVertical: 25,  
        alignItems: 'center',  
      },
      paymentOption: { 
        flex: 1, 
        padding: 10, 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderColor: 'grey',
        borderWidth: 1,
      },
      selectedOption: { 
        backgroundColor: '#D6E4FF', 
        borderColor: '#007AFF' 
      },
      paymentText: { 
        fontSize: 14, 
        color: 'black' 
      },
      selectedText: { 
        color: '#007AFF', 
        fontWeight: 'bold' 
      },
      row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
      },
      halfWidth: { 
        flex: 0.48 
      },
    });

    export default ReloadOnline;
