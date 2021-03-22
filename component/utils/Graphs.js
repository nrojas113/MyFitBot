import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const Graphs = (props) => {
  const { allSteps, activities } = props;

  //Line Charts Data Setup
  const dates = allSteps && allSteps.map((data) => data.dateTime.slice(6));
  const xlabels = dates.filter(
    (date) =>
      date.includes("01") ||
      date.includes("05") ||
      date.includes("10") ||
      date.includes("20") ||
      date.includes("25") ||
      date.includes("30")
  );
  const pastStepsData = allSteps && allSteps.map((data) => Number(data.value));

  const pastSteps = {
    labels: xlabels,
    datasets: [
      {
        data: pastStepsData,
      },
    ],
  };

  //Pie Chart data setup
  const pieData = [
    {
      name: activities[0].name,
      duration: activities[0].duration,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: activities[1].name,
      duration: activities[1].duration,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: activities[2].name,
      duration: activities[2].duration,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: activities[3].name,
      duration: activities[3].duration,
      color: "purple",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: activities[4].name,
      duration: activities[4].duration,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: activities[5].name,
      duration: activities[5].duration,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(100,50,240, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      {allSteps && activities ? (
        <View>
          <Text style={styles.text}>My Activities Stats</Text>
          <PieChart
            data={pieData}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").width * 0.45}
            chartConfig={chartConfig}
            accessor="duration"
            backgroundColor="transparent"
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.text}>My Steps Stats (Last 30 days)</Text>
          <LineChart
            data={pastSteps}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").width * 0.6}
            chartConfig={chartConfig}
            verticalLabelRotation={20}
          />
        </View>
      ) : (
        <Text>No Data Yest</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "EuphemiaUCAS",
  },
});

export default Graphs;
