import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Steps = (props) => {
  const { steps } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.steps}>{steps}</Text>
      {/* <Text style={styles.text}>Steps</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
  },
  steps: {
    fontFamily: "EuphemiaUCAS",
    color: "#ff006e",
    fontSize: 70,
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#f4978e",
    textShadowOffset: {
      width: 5,
      height: 5,
    },
    textShadowRadius: 5,
  },
  text: {
    color: "#ff006e",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Steps;
