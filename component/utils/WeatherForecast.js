import { weatherAPIKey } from "../../secrets";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  FlatList,
} from "react-native";
import moment from "moment";

const WeatherForecast = (props) => {
  const { weatherData } = props;
  const { daily } = weatherData;

  // console.log(daily);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>7 Day Forecast</Text>
      <FlatList
        data={daily}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={(data) => {
          const today = new Date();
          let day = new Date(today);
          day.setDate(day.getDate() + data.index);
          day = moment(day).format("dddd");
          return (
            <View style={styles.flatlistItem}>
              {<Text style={styles.text}>{day}</Text>}
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${data.item.weather[0].icon}.png`,
                }}
                style={styles.icon}
              ></Image>
              <Text style={styles.text}>
                {Math.ceil(data.item.temp.min)}/{Math.ceil(data.item.temp.max)}{" "}
                F
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    fontFamily: "EuphemiaUCAS",
    fontSize: 30,
    textAlign: "center",
    color: "dimgrey",
    marginBottom: 20,
    fontWeight: "bold",
  },
  flatlistItem: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "aliceblue",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  icon: {
    width: 45,
    height: 45,
    paddingTop: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "EuphemiaUCAS",
    color: "dimgrey",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WeatherForecast;
