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
} from "react-native";
import Header from "../utils/Header";
import Images from "../images/index";
import BotDescription from "../utils/BotDescription";
import { firebase } from "../../firebase/config";

// const BotsRef = firebase.firestore().collection("Bots").doc("");

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1;

const ImagesArr = [
  { title: "Confused", url: "https://i.postimg.cc/Wz2XWYxm/confused.jpg" },
  { title: "Great Job", url: "https://i.postimg.cc/WzXSQ6PB/greatjob.jpg" },
  { title: "Judging", url: "https://i.postimg.cc/FsHT0qyN/judging.jpg" },
  { title: "Sad", url: "https://i.postimg.cc/bJf6bwTB/sad.jpg" },
  { title: "Superwoman", url: "https://i.postimg.cc/85dZbgXP/superwoman.jpg" },
  { title: "Joy", url: "https://i.postimg.cc/7PVBGDTK/yes.jpg" },
  { title: "Congrats", url: "https://i.postimg.cc/XJ30dDRK/congrats.jpg" },
  { title: "Lets go", url: "https://i.postimg.cc/6p2wXZVZ/letsgo.jpg" },
  {
    title: "Overwhelmed",
    url: "https://i.postimg.cc/9fyh4jnF/overwhelmed.jpg",
  },
  { title: "Thinking", url: "https://i.postimg.cc/Cx30LKJQ/thinking.jpg" },
];
// console.log(ImagesArr);

const MyBotsList = () => {
  const [loading, setLoading] = useState(true);
  const [bots, setBots] = useState([]);
  const ref = firebase.firestore().collection("Bots");
  // console.log("REF", ref);

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

      setBots(botsList);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  console.log(bots);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Animated.FlatList
        data={ImagesArr}
        keyExtraction={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item, idx }) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                backgroundColor: "rgba(255,255,255,0.8",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.2,
                shadowRadius: 20,
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
              <BotDescription item={item} imageW={imageW} key={idx} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MyBotsList;
