import { weatherAPIKey } from "../../secrets";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  Touchable,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import WeatherForecast from "./WeatherForecast";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TodayWeather = () => {
  const [weather, setWeather] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTodayWeather = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=40.719074&lon=-74.050552&exclude=minutely,hourly&units=imperial&appid=${weatherAPIKey}`
        );
        setWeather(data);
      } catch (error) {
        console.log("Error fetching weather", error);
      }
    };

    fetchTodayWeather();
  }, []);

  return (
    <View>
      {weather.current ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  <WeatherForecast weatherData={weather} />
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <MaterialCommunityIcons name="close" size={26} />
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`,
                }}
                style={styles.icon}
              ></Image>
              <Text style={styles.text}>
                {Math.ceil(weather.current.temp)} F{" "}
                <Text style={styles.feelsLike}>
                  (Feels Like {Math.ceil(weather.current.feels_like)} F){" "}
                </Text>
              </Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <Text>No Weather Info</Text>
      )}
    </View>
  );
};
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "whitesmoke",
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 5,
    //   height: 0,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // borderRadius: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width,
    height: height * 0.78,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 3,
    marginRight: width * 0.7,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TodayWeather;
