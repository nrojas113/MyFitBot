import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        MyFitBot
        <MaterialCommunityIcons name="robot" size={26} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#694fad",
  },
  text: {
    fontFamily: "EuphemiaUCAS",
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
});

export default Header;
