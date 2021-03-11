// React Native Counter Example using Hooks!

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "./Header";
import TodayDate from "./TodayDate";
import Bot from "./Bot";
import Steps from "./Steps";
import axios from "axios";
import accessToken from "../secrets";

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

  console.log(todaySteps);

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

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default Main;
