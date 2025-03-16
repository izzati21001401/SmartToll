import { useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

interface Transaction {
  id: string;
  gate: string;
  amount: number;
  date: Date;
}

const generateDummyData = (count: number): Transaction[] => {
  const tollGates = [
    "Gopeng-Ipoh",
    "Taiping-Kajang",
    "Bangi-Sepang",
    "Klang-Seremban",
    "Petaling-Kajang",
  ];
  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (i % 7));
    transactions.push({
      id: `#${Math.floor(Math.random() * 10000000)}`,
      gate: tollGates[i % tollGates.length],
      amount: parseFloat((-1 * (Math.random() * 20 + 5)).toFixed(2)),
      date,
    });
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default function HistoryPage() {
  const [transactions] = useState<Transaction[]>(generateDummyData(60));
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(
    transactions.slice(0, 20)
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const loadMoreTransactions = useCallback(() => {
    if (visibleTransactions.length < transactions.length) {
      setVisibleTransactions((prev) => [
        ...prev,
        ...transactions.slice(prev.length, prev.length + 20),
      ]);
    }
  }, [transactions, visibleTransactions]);

  const groupedTransactions: Record<
    string,
    { transactions: Transaction[]; total: number }
  > = {};
  visibleTransactions.forEach((txn) => {
    const dateStr = format(txn.date, "dd MMM yyyy");
    if (!groupedTransactions[dateStr]) {
      groupedTransactions[dateStr] = { transactions: [], total: 0 };
    }
    groupedTransactions[dateStr].transactions.push(txn);
    groupedTransactions[dateStr].total += txn.amount;
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
                Total: {groupedTransactions[date].total.toFixed(2)}
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
                <Text style={styles.gateText}>{txn.gate}</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.amountText}>{txn.amount.toFixed(2)}</Text>
                  <MaterialIcons name="chevron-right" size={18} color="black" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <BottomNav />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transaction Details</Text>
            {selectedTransaction && (
              <>
                <Text>ID: {selectedTransaction.id}</Text>
                <Text>Gate: {selectedTransaction.gate}</Text>
                <Text>Amount: {selectedTransaction.amount.toFixed(2)}</Text>
                <Text>
                  Date: {format(selectedTransaction.date, "dd MMM yyyy HH:mm")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D7CC9",
    paddingVertical: 70,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 4,
    marginTop: 10,
    paddingHorizontal: 16,
    color: "white",
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
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
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
    justifyContent: "space-between",
    paddingTop: 16,
  },
  gateText: {
    fontSize: 14,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 14,
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
