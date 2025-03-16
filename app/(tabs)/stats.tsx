import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import { Card } from "react-native-paper";

const SpendingReport = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Report</Text>
      <Card style={styles.card}>
        <Text style={styles.expensesText}>Expenses this month: RMB2.70</Text>
        <Text style={styles.totalExpensesText}>
          Total Expenses: 2025 RMBII0.20
        </Text>
        <View style={styles.chartContainer}>
          <LineChart
            style={{ height: 200 }}
            data={data}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
        </View>
        <View style={styles.timeFilters}>
          <Text style={styles.timeFilterText}>12 Months</Text>
          <Text style={styles.timeFilterText}>3 Months</Text>
          <Text style={styles.timeFilterText}>30 Days</Text>
          <Text style={styles.timeFilterText}>7 Days</Text>
          <Text style={styles.timeFilterText}>24 Hours</Text>
        </View>
        <View style={styles.monthsContainer}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, index) => (
            <Text key={index} style={styles.monthText}>
              {month}
            </Text>
          ))}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
  },
  expensesText: {
    fontSize: 18,
    marginBottom: 8,
  },
  totalExpensesText: {
    fontSize: 16,
    marginBottom: 16,
    color: "gray",
  },
  chartContainer: {
    height: 200,
    marginBottom: 16,
  },
  timeFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeFilterText: {
    fontSize: 14,
    color: "blue",
  },
  monthsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: {
    fontSize: 12,
    color: "gray",
  },
});

export default SpendingReport;
