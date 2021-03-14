import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  Animated,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../utils/Header";
import BotDescription from "../utils/BotDescription";
import { firebase } from "../../firebase/config";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1;

const MyBotsList = () => {
  const [loading, setLoading] = useState(true);
  const [bots, setBots] = useState([]);
  const ref = firebase.firestore().collection("Bots");

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const botsList = [];
      querySnapshot.forEach((doc) => {
        const { mood, imageURL, stepRange, comments } = doc.data();
        botsList.push({
          id: doc.id,
          mood,
          imageURL,
          stepRange,
          comments,
        });
      });
      botsList.sort((a, b) => a.stepRange - b.stepRange);

      setBots(botsList);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <Header />
      {bots.length !== 0 && (
        <Animated.FlatList
          data={bots}
          keyExtraction={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          renderItem={(bot) => {
            return (
              <View style={styles.container}>
                <Image
                  source={{ uri: bot.item.imageURL }}
                  style={styles.image}
                />
                <BotDescription bot={bot.item} imageW={imageW} key={bot.id} />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  image: {
    width,
    height: height * 0.4,
    resizeMode: "cover",
    borderRadius: 16,
  },
  // image: {
  //   // width: imageW * 0.8,
  //   // height: imageH * 0.8,
  //   width: imageW,
  //   height: imageH,
  //   resizeMode: "cover",
  //   borderRadius: 16,
  // },
});
export default MyBotsList;
