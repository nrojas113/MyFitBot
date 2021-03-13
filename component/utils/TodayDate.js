import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

const TodayDate = ({ today }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(today).format("LL")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    fontFamily: "Futura",
    color: "dimgrey",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TodayDate;
