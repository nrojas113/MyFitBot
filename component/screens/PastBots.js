import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import Header from "../utils/Header";
import { accessToken } from "../../secrets";
import axios from "axios";
import { firebase } from "../../firebase/config";

const PastBots = () => {
  const [allSteps, setAllSteps] = useState(null);
  const [bots, setBots] = useState([]);
  const ref = firebase.firestore().collection("Bots");

  useEffect(() => {
    let mounted = true;
    async function fetchPastSteps() {
      console.log("fitbit useffect being called");
      try {
        const { data } = await axios.get(
          "https://api.fitbit.com/1/user/-/activities/tracker/steps/date/today/1m.json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const allSteps = data["activities-tracker-steps"];
        allSteps.reverse();

        if (mounted) {
          setAllSteps(allSteps);
        }
      } catch (error) {
        console.log("Error loading data", error);
      }
    }
    async function fetchMyBot() {
      console.log("firebase useffect being called");
      try {
        const snapshot = await ref.get();
        let botsArr = [];
        snapshot.forEach((doc) => {
          botsArr.push(doc.data());
        });
        if (mounted) {
          setBots(botsArr);
        }
      } catch (error) {
        console.log("Error loading firebase/bots data", error);
      }
    }
    fetchMyBot();
    fetchPastSteps();

    return () => (mounted = false);
  }, []);

  return (
    <SafeAreaView>
      <Header />
      <Text style={styles.title}>My Achievements (last 30 days)</Text>
      {bots.length !== 0 && allSteps ? (
        <FlatList
          data={allSteps}
          keyExtractor={(_, idx) => idx.toString()}
          pagingEnabled
          extraData={{ bots }}
          renderItem={(dailyStep) => {
            const targetBot = bots.reduce((a, b) => {
              let aDiff = Math.abs(a.stepRange - dailyStep.item.value);
              let bDiff = Math.abs(b.stepRange - dailyStep.item.value);
              if (aDiff === bDiff) {
                return a > b ? a : b;
              } else {
                return bDiff < aDiff ? b : a;
              }
            });
            return (
              <View>
                {dailyStep && (
                  <View style={styles.container}>
                    <Image
                      source={{ uri: targetBot.imageURL }}
                      style={styles.image}
                    />
                    <View>
                      <Text style={styles.date}>
                        Date: {dailyStep.item.dateTime}
                      </Text>
                      <Text style={styles.text}>
                        Total Steps: {dailyStep.item.value}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
      ) : (
        <Text>Data not retrieved yet</Text>
      )}
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontFamily: "EuphemiaUCAS",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  date: {
    fontFamily: "EuphemiaUCAS",
    fontSize: 18,
    padding: 5,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "EuphemiaUCAS",
    fontSize: 18,
    padding: 5,
  },
});

export default PastBots;
