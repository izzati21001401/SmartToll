import { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  Image,
  TextStyle,
} from "react-native";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { auth, db } from "@/firebase"; // Ensure correct Firebase initialization
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

// Type definition for a Firestore transaction
interface Transaction {
  id: string;
  direction: string;
  imageURL: string;
  numberPlate: string;
  paymentStatus: string;
  timestamp: FirebaseFirestoreTypes.Timestamp;
  tollFee: number;
  tollLocation: string;
  vehicleClass: string;
}

// Function to transform Google Drive URLs into direct image URLs
const getDirectImageURL = (url: string): string => {
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

const formatTollLocation = (location: string): string => {
  return location.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userLicensePlate, setUserLicensePlate] = useState("");
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(
    []
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Fetch user's license plate
  useEffect(() => {
    const fetchUserLicensePlate = async () => {
      if (!auth.currentUser) return;

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const licensePlate = userSnap.data().licensePlate;
          setUserLicensePlate(licensePlate);
        }
      } catch (error) {
        console.error("Error fetching user license plate:", error);
      }
    };

    fetchUserLicensePlate();
  }, []);

  // Fetch transactions for the user's car
  useEffect(() => {
    if (!userLicensePlate) return; // Wait until we get the license plate

    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tollRecords"));

        const fetchedTransactions: Transaction[] = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Transaction, "id">),
          }))
          .filter((txn) => txn.numberPlate === userLicensePlate); // Filter transactions for this car

        fetchedTransactions.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );

        setTransactions(fetchedTransactions);
        setVisibleTransactions(fetchedTransactions.slice(0, 20));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userLicensePlate]); // Fetch transactions when the license plate is retrieved

  // Load more transactions when scrolling
  const loadMoreTransactions = useCallback(() => {
    if (visibleTransactions.length < transactions.length) {
      setVisibleTransactions((prev) => [
        ...prev,
        ...transactions.slice(prev.length, prev.length + 20),
      ]);
    }
  }, [transactions, visibleTransactions]);

  // Group transactions by date
  const groupedTransactions: Record<
    string,
    { transactions: Transaction[]; total: number }
  > = {};
  visibleTransactions.forEach((txn) => {
    const dateStr = format(txn.timestamp.toDate(), "dd MMM yyyy");
    if (!groupedTransactions[dateStr]) {
      groupedTransactions[dateStr] = { transactions: [], total: 0 };
    }
    groupedTransactions[dateStr].transactions.push(txn);
    groupedTransactions[dateStr].total += txn.tollFee;
  });

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={Object.keys(groupedTransactions)}
        keyExtractor={(date) => date}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={() => (
          <Text style={styles.pageTitle}>Transaction History</Text>
        )}
        renderItem={({ item: date }) => (
          <View style={styles.card}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.totalAmountText}>
                Total: RM {groupedTransactions[date].total.toFixed(2)}
              </Text>
            </View>
            {groupedTransactions[date].transactions.map((txn) => (
              <TouchableOpacity
                key={txn.id}
                style={styles.transactionItem}
                onPress={() => {
                  setSelectedTransaction(txn);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: getDirectImageURL(txn.imageURL) }}
                  style={styles.vehicleImage}
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.gateText}>
                    {formatTollLocation(txn.tollLocation)}
                  </Text>
                  <Text style={getStatusStyle(txn.paymentStatus)}>
                    {txn.paymentStatus}
                  </Text>
                  <Text style={styles.amountText}>
                    RM {txn.tollFee.toFixed(2)}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={18} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <BottomNav />

      {/* Modal for transaction details */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transaction Details</Text>
            {selectedTransaction && (
              <>
                <Image
                  source={{
                    uri: getDirectImageURL(selectedTransaction.imageURL),
                  }}
                  style={styles.modalImage}
                />
                <Text style={styles.infoText}>
                  Plate: {selectedTransaction.numberPlate}
                </Text>
                <Text style={styles.infoText}>
                  Direction: {selectedTransaction.direction}
                </Text>
                <Text style={styles.infoText}>
                  Location:{" "}
                  {formatTollLocation(selectedTransaction.tollLocation)}
                </Text>
                <Text style={styles.feeText}>
                  Fee: RM {selectedTransaction.tollFee.toFixed(2)}
                </Text>
                <Text style={styles.infoText}>
                  Date:{" "}
                  {format(
                    selectedTransaction.timestamp.toDate(),
                    "dd MMM yyyy HH:mm"
                  )}
                </Text>
                <Text style={styles.infoText}>
                  Vehicle Class: {selectedTransaction.vehicleClass}
                </Text>
                <Text style={getStatusStyle(selectedTransaction.paymentStatus)}>
                  {selectedTransaction.paymentStatus}
                </Text>
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Status text styling based on payment status
const getStatusStyle = (status: string): TextStyle => ({
  fontSize: 14,
  color: status === "Success" ? "green" : "red",
  fontWeight: status === "Success" ? "700" : "400",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingTop: 60,
    paddingBottom: 60,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 16,
  },
  card: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  gateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  vehicleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    objectFit: "cover",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  feeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});
