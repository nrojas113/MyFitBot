import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Steps = (props) => {
  const { steps } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.steps}>
        {steps}
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          steps
          <MaterialCommunityIcons name="shoe-print" size={20} />
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
  },
  steps: {
    fontFamily: "EuphemiaUCAS",
    color: "#ff006e",
    fontSize: 90,
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
