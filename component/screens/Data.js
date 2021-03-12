import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../utils/Header";
import accessToken from "../../secrets";
import axios from "axios";
import Graphs from "../utils/Graphs";

const Data = () => {
  const [allSteps, setAllSteps] = useState(null);
  useEffect(() => {
    async function fetchTodaySteps() {
      try {
        const { data } = await axios.get(
          "https://api.fitbit.com/1/user/-/activities/tracker/steps/date/today/1y.json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAllSteps(data["activities-tracker-steps"]);
      } catch (error) {
        console.log("Error loading data", error);
      }
    }
    fetchTodaySteps();
  }, []);

  return (
    <SafeAreaView>
      <Header />
      <Text>Chart Area</Text>
      {allSteps && <Graphs data={allSteps} />}
    </SafeAreaView>
  );
};

export default Data;
