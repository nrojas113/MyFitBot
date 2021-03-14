import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../utils/Header";
import { accessToken } from "../../secrets";
import axios from "axios";
import Graphs from "../utils/Graphs";

const Data = () => {
  const [allSteps, setAllSteps] = useState(null);
  const [activities, setActivities] = useState(null);
  useEffect(() => {
    async function fetchPastSteps() {
      try {
        const { data } = await axios.get(
          "https://api.fitbit.com/1/user/-/activities/tracker/steps/date/today/1m.json",
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
    async function fetchActivities() {
      try {
        const { data } = await axios.get(
          "https://api.fitbit.com/1/user/-/activities/frequent.json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setActivities(data);
      } catch (error) {
        console.log("Error loading data", error);
      }
    }
    fetchPastSteps();
    fetchActivities();
  }, []);

  return (
    <SafeAreaView>
      <Header />
      {allSteps && activities ? (
        <Graphs allSteps={allSteps} activities={activities} />
      ) : (
        <Text>Data not retrieved yet</Text>
      )}
    </SafeAreaView>
  );
};

export default Data;

{
  /* <SafeAreaView>
<Header />
{allSteps && activities ? (
  <Graphs allSteps={allSteps} activities={activities} />
) : (
  <Text>Data not retrieved yet</Text>
)}
</SafeAreaView> */
}
