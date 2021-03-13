import { weatherAPIKey } from "../../secrets";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, Platform } from "react-native";

const TodayWeather = () => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const fetchTodayWeather = async () => {
      try {
        const { data } = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=New%20Jersey&units=imperial&appid=${weatherAPIKey}`
        );
        // console.log(weatherAPIKey);
        console.log("weather info", data);
        setWeather(data);
      } catch (error) {
        console.log("Error fetching weather", error);
      }
    };

    fetchTodayWeather();
  }, []);

  return (
    <View>
      {weather.main ? (
        <View style={styles.container}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
            }}
            style={styles.icon}
          ></Image>
          <Text style={styles.text}>
            {Math.ceil(weather.main.temp)} F{" "}
            <Text style={styles.feelsLike}>
              (Feels Like {Math.ceil(weather.main.feels_like)} F){" "}
            </Text>
          </Text>

          {/* <Text style={{ fontSize: 15 }}>{weather.name}</Text> */}
        </View>
      ) : (
        <Text>No Weather Info</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // marginTop: 10,
    // marginRight: 8,
    // marginLeft: 8,
  },
  icon: {
    width: 45,
    height: 45,
    paddingTop: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "EuphemiaUCAS",
    color: "dimgrey",
    fontWeight: "bold",
    textAlign: "center",
  },
  feelsLike: {
    fontSize: 12,
  },
});

export default TodayWeather;
