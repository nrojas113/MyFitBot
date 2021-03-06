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
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../utils/Header";
import BotDescription from "../utils/BotDescription";
import { firebase } from "../../firebase/config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1;

const BotListLanding = (props) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "EuphemiaUCAS",
          marginTop: 40,
          textAlign: "center",
          fontSize: 40,
        }}
      >
        MyBots
      </Text>
      <Text
        style={{
          fontFamily: "EuphemiaUCAS",
          marginLeft: 20,
          marginRight: 20,
          marginTop: 30,
          fontSize: 20,
          textAlign: "center",
          lineHeight: 30,
          width: width * 0.9,
        }}
      >
        Welcome to MyBots! Here, you can see all the bots currently available to
        you. You can customize each bots with your own step goal (step achieved)
        and change the motivational phrase to match what phrase will best
        motivate you!
      </Text>
      <Text
        style={{
          fontFamily: "EuphemiaUCAS",
          marginTop: 30,
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        ~Currently you have{" "}
        <Text style={{ color: "red" }}>{props.bots.length}</Text> bot types~
      </Text>
      <Text
        style={{
          fontFamily: "EuphemiaUCAS",
          marginTop: 40,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Swipe Left <MaterialCommunityIcons name="arrow-right" size={26} />
      </Text>
    </View>
  );
};

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
          ListHeaderComponent={() => <BotListLanding bots={bots} />}
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
    height: height * 0.47,
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
