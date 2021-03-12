import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Graphs = (props) => {
  const { data } = props;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    // color: 'black'
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const xlabels = data && data.map((data) => data.dateTime);
  const pastStepsData = data && data.map((data) => Number(data.value));

  const pastSteps = {
    labels: xlabels,
    datasets: [
      {
        data: pastStepsData,
      },
    ],
  };

  const monthData =
    data && data.filter((data) => data.dateTime.includes("2021-03"));

  console.log("data", monthData);

  const fakeData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View>
      {data && (
        <BarChart
          data={fakeData}
          width={Dimensions.get("window").width}
          height={500}
          yAxisLabel="Step Count"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

export default Graphs;
