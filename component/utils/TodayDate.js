import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TodayWeather from "./TodayWeather";

const TodayDate = ({ today }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(today).format("LL")}</Text>
      <TodayWeather />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
    marginRight: 8,
    marginLeft: 8,
  },
  text: {
    marginTop: 10,
    fontFamily: "EuphemiaUCAS",
    color: "dimgrey",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TodayDate;
