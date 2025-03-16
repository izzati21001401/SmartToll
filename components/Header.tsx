import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "@/firebase";
import { signOut, User } from "firebase/auth";

const notifications = [
  {
    id: "1",
    header: "Payment Successful",
    description: "Your toll payment of $5.00 has been processed successfully.",
  },
  {
    id: "2",
    header: "Low Balance Alert",
    description: "Your SmartToll balance is below $10. Please recharge soon.",
  },
  {
    id: "3",
    header: "New Toll Update",
    description: "A new toll plaza has been added on your frequent route.",
  },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image
          source={require("@/assets/images/smarttoll-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
        <Ionicons
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setDropdownVisible(!dropdownVisible);
          setShowNotifications(false);
        }}
      >
        <Ionicons name="person-circle-outline" size={35} color="#555" />
      </TouchableOpacity>

      {dropdownVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            {!showNotifications ? (
              <>
                {user && (
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>
                      {user.displayName || "User"}
                    </Text>
                    <Text style={styles.profileEmail}>{user.email}</Text>
                  </View>
                )}
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => setShowNotifications(true)}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#000"
                  />
                  <Text style={styles.dropdownText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={20} color="#000" />
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.notificationList}>
                <FlatList
                  data={notifications}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        styles.notificationItem,
                        index === notifications.length - 1 && {
                          borderBottomWidth: 0,
                        }, // Removes last border
                      ]}
                      onPress={() => setSelectedNotification(item.description)}
                    >
                      <Text style={styles.notificationHeader}>
                        {item.header}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </Pressable>
      )}

      <Modal visible={!!selectedNotification} animationType="fade" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedNotification(null)}
        >
          <View style={styles.notificationModal}>
            <Text style={styles.notificationText}>{selectedNotification}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchIcon: {
    marginLeft: 5,
  },
  dropdown: {
    position: "absolute",
    top: 68,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    minWidth: 220,
  },
  profileInfo: {
    padding: 10,
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  dropdownText: {
    marginLeft: 12,
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notificationModal: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    width: "85%",
  },
  notificationText: {
    fontSize: 18,
    textAlign: "center",
  },
  notificationList: {
    backgroundColor: "#fff",

    paddingVertical: 0,
  },
  notificationItem: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  notificationHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Header;
