import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const Reload = () => {
  const [selectedTab, setSelectedTab] = useState("credit");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const bankOptions = [
    {
      id: "cimb",
      name: "CIMB Clicks",
      image: require("@/assets/images/cimb.png"),
    },
    {
      id: "maybank",
      name: "Maybank2U",
      image: require("@/assets/images/maybank.png"),
    },
    {
      id: "klarna",
      name: "Bank Islam",
      image: require("@/assets/images/bankIslam.png"),
    },
    {
      id: "paypal",
      name: "Paypal",
      image: require("@/assets/images/paypal.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#B0B0B0"
          />
        </View>

        {/* Payment Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "credit" && styles.activeTab]}
            onPress={() => setSelectedTab("credit")}
          >
            <Ionicons
              name="card"
              size={20}
              color={selectedTab === "credit" ? "#007AFF" : "black"}
            />
            <Text
              style={[
                styles.tabText,
                selectedTab === "credit" && styles.activeTabText,
              ]}
            >
              Credit/Debit Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "bank" && styles.activeTab]}
            onPress={() => setSelectedTab("bank")}
          >
            <Ionicons
              name="business"
              size={20}
              color={selectedTab === "bank" ? "#007AFF" : "black"}
            />
            <Text
              style={[
                styles.tabText,
                selectedTab === "bank" && styles.activeTabText,
              ]}
            >
              Online Banking
            </Text>
          </TouchableOpacity>
        </View>

        {/* Credit Card Form */}
        {selectedTab === "credit" && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Number</Text>
              <View style={styles.cardRow}>
                <TextInput
                  style={styles.input}
                  placeholder="1234 1234 1234 1234"
                  placeholderTextColor="#B0B0B0"
                />
                <Image
                  source={require("@/assets/images/credit.png")}
                  style={styles.cardLogo}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainerHalf}>
                <Text style={styles.label}>Expiration</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#B0B0B0"
                />
              </View>
              <View style={styles.inputContainerHalf}>
                <Text style={styles.label}>CVC</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CVC"
                  placeholderTextColor="#B0B0B0"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Hong Kong SAR China"
                placeholderTextColor="#B0B0B0"
              />
            </View>
          </>
        )}

        {/* Online Banking Form */}
        {selectedTab === "bank" && (
          <View style={styles.bankOptionsContainer}>
            {bankOptions.map((bank) => (
              <TouchableOpacity
                key={bank.id}
                style={[
                  styles.option,
                  selectedBank === bank.id && styles.selectedBankOption,
                ]}
                onPress={() => setSelectedBank(bank.id)}
              >
                <Ionicons
                  name={
                    selectedBank === bank.id
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  color={selectedBank === bank.id ? "#7D3C98" : "gray"}
                />
                <Image
                  source={bank.image}
                  style={styles.bankLogo}
                  resizeMode="contain"
                />
                <Text style={styles.bankText}>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingTop: 80,
  },
  contentContainer: {
    paddingHorizontal: "5%",
    paddingBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F8F8F8",
    width: "100%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#D6E4FF",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLogo: {
    width: 50,
    height: 20,
    marginLeft: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  inputContainerHalf: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    flex: 1,
  },
  bankOptionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F8F8F8",
  },
  selectedBankOption: {
    backgroundColor: "#D6E4FF",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  bankLogo: {
    width: 50,
    height: 25,
    marginLeft: 12,
  },
  bankText: {
    fontSize: 16,
    marginLeft: 12,
  },
  doneButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
  },
  doneButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Reload;
