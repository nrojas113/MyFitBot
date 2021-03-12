import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Images from "../images/index";

const Bot = ({ steps }) => {
  console.log("stept", steps);
  let botType =
    steps > 10000
      ? "yes"
      : steps > 5000
      ? "greatjob"
      : steps > 2000
      ? "confused"
      : steps > 1000
      ? "sad"
      : steps > 500
      ? "judging"
      : "confused";

  console.log("botyType", botType);
  const mood = Images[botType];

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={mood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Bot;
