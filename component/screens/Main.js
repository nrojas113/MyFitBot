// React Native Counter Example using Hooks!

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { accessToken } from "../../secrets";
import Header from "../utils/Header";
import TodayDate from "../utils/TodayDate";
import Bot from "../utils/Bot";
import Steps from "../utils/Steps";
import axios from "axios";

const Main = (props) => {
  const [todaySteps, setTodaySteps] = useState(null);

  useEffect(() => {
    async function fetchTodaySteps() {
      try {
        const { data } = await axios.get(
          "https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTodaySteps(data["activities-steps"][0]);
      } catch (error) {
        console.log("Error loading data", error);
      }
    }
    fetchTodaySteps();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {todaySteps ? (
        <>
          <TodayDate today={todaySteps.dateTime} />
          <Steps steps={todaySteps.value} />
          <Bot steps={todaySteps.value} />
        </>
      ) : (
        <Text>No data yet</Text>
      )}
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("screen");

// React Native Styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 60,
  },
});

export default Main;
