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
    marginTop: 60,
  },
  text: {
    color: "black",
    fontSize: 40,
    textAlign: "center",
  },
});

export default TodayDate;
