"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const screenWidth = Dimensions.get("window").width;

type TollData = {
  date: string;
  amount: number;
};

// Random toll gate names
const tollGates = [
  "Gateway Plaza",
  "East End Toll",
  "River Pass",
  "Metro Bridge",
  "Sunrise Entry",
];

// Function to generate random dataset for the past `days` days
const generateRandomData = (days: number): TollData[] => {
  const data: TollData[] = [];
  const currentDate = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
      amount: Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 100), // 20% chance of being 0
    });
  }

  return data.reverse(); // Ensure chronological order
};

// Generate full dataset for the past 12 months (365 days)
const past12MonthsData = generateRandomData(365);

// Timeframe options (days)
const timeframes = {
  "12 Months": 365,
  "3 Months": 90,
  "30 Days": 30,
  "7 Days": 7,
  "24 Hours": 1,
};

// Function to filter and aggregate data based on the selected timeframe
const aggregateData = (
  data: TollData[],
  timeframe: keyof typeof timeframes
) => {
  let aggregatedData: TollData[] = [];
  const daysInFrame = timeframes[timeframe];

  if (timeframe === "12 Months") {
    // Aggregate monthly sums and format x-axis labels as full month names
    for (let i = 0; i < daysInFrame; i += 30) {
      const monthData = data.slice(i, i + 30);
      const monthName = new Date(data[i].date).toLocaleString("default", {
        month: "long",
      });

      aggregatedData.push({
        date: monthName, // Show full month name
        amount: monthData.reduce((sum, entry) => sum + entry.amount, 0),
      });
    }
  } else if (timeframe === "3 Months") {
    // Aggregate weekly sums, ensuring each month is shown only once
    let lastMonth = "";
    for (let i = 0; i < daysInFrame; i += 7) {
      const weekData = data.slice(i, i + 7);
      const weekMonth = new Date(data[i].date).toLocaleString("default", {
        month: "long",
      });

      // Show month name only once in sequence
      const label =
        lastMonth === weekMonth
          ? `Week ${Math.ceil((i + 1) / 7)}`
          : `Week ${Math.ceil((i + 1) / 7)} - ${weekMonth}`;
      lastMonth = weekMonth;

      aggregatedData.push({
        date: label,
        amount: weekData.reduce((sum, entry) => sum + entry.amount, 0),
      });
    }
  } else if (timeframe === "30 Days") {
    // Aggregate weekly sums, ensuring each month is shown only once
    let lastMonth = "";
    for (let i = 0; i < daysInFrame; i += 7) {
      const weekData = data.slice(i, i + 7);
      const weekMonth = new Date(data[i].date).toLocaleString("default", {
        month: "long",
      });

      // Show month name only once in sequence
      const label =
        lastMonth === weekMonth
          ? `Week ${Math.ceil((i + 1) / 7)}`
          : `Week ${Math.ceil((i + 1) / 7)} - ${weekMonth}`;
      lastMonth = weekMonth;

      aggregatedData.push({
        date: label,
        amount: weekData.reduce((sum, entry) => sum + entry.amount, 0),
      });
    }
  } else if (timeframe === "7 Days") {
    // Keep daily data, format dates diagonally
    aggregatedData = data.slice(-daysInFrame).map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-GB"), // Format as DD/MM/YYYY
      amount: item.amount,
    }));
  } else if (timeframe === "24 Hours") {
    // Generate hourly data
    aggregatedData = Array.from({ length: 24 }, (_, i) => ({
      date: `${i}:00`,
      amount: Math.floor(Math.random() * 10),
    }));
  }

  return aggregatedData;
};

export default function StatsPage() {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<keyof typeof timeframes>("12 Months");

  const filteredData = aggregateData(past12MonthsData, selectedTimeframe);

  // Extract labels and values for the chart
  const labels = filteredData.map((item) => item.date);
  const dataPoints = filteredData.map((item) => item.amount);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Expense Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expenses this month</Text>
            <Text style={styles.cardValue}>RM 110.20</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Expenses: 2025</Text>
            <Text style={styles.cardValue}>RM 1598.28</Text>
          </View>
        </View>

        {/* Spending Report */}
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>Spending Report</Text>

          {/* Timeframe Selection Buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonRow}>
              {(Object.keys(timeframes) as (keyof typeof timeframes)[]).map(
                (timeframe) => (
                  <TouchableOpacity
                    key={timeframe}
                    style={[
                      styles.button,
                      selectedTimeframe === timeframe && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedTimeframe(timeframe)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        selectedTimeframe === timeframe &&
                          styles.selectedButtonText,
                      ]}
                    >
                      {timeframe}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>

          {/* Line Chart */}
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: dataPoints }],
            }}
            withDots={false}
            // withHorizontalLines={false}
            withVerticalLines={false}
            width={screenWidth * 0.8}
            height={400}
            yAxisLabel="RM "
            fromZero
            yAxisInterval={1}
            withShadow={false}
            segments={5}
            verticalLabelRotation={-45}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 81, 255, 0.9)`,
              labelColor: (opacity = 1) => `rgba(60, 60, 59, ${opacity})`,

              propsForLabels: {
                textAnchor: "end",
              },
              propsForBackgroundLines: {
                stroke: "#E0E0E0",
                strokeWidth: 1,
                strokeDasharray: "0",
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

// Styles
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
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
    ...shadowStyle,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "left",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D7CC9",
  },
  reportContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "flex-start",
    ...shadowStyle,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C3B",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 5,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 0,
    backgroundColor: "#E0E0E0",
  },
  selectedButton: {
    backgroundColor: "#3D7CC9",
  },
  buttonText: {
    fontSize: 14,
    color: "#3C3C3B",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: screenWidth * 0.9,
    marginTop: -20,
  },
  rotatedLabel: {
    fontSize: 12,
    transform: [{ rotate: "-45deg" }], // Rotate text to 45 degrees
    textAlign: "center",
    color: "#3C3C3B",
  },
});
