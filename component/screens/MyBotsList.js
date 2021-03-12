import React, { useRef } from "react";
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
} from "react-native";
import Header from "../utils/Header";
import Images from "../images/index";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1;

const ImagesArr = [
  { title: "Confused", url: "https://i.postimg.cc/Wz2XWYxm/confused.jpg" },
  { title: "Great Job", url: "https://i.postimg.cc/WzXSQ6PB/greatjob.jpg" },
  { title: "Judging", url: "https://i.postimg.cc/FsHT0qyN/judging.jpg" },
  { title: "Sad", url: "https://i.postimg.cc/bJf6bwTB/sad.jpg" },
  { title: "Superwoman", url: "https://i.postimg.cc/85dZbgXP/superwoman.jpg" },
  { title: "Yes", url: "https://i.postimg.cc/7PVBGDTK/yes.jpg" },
  { title: "Congrats", url: "https://i.postimg.cc/XJ30dDRK/congrats.jpg" },
  { title: "Lets go", url: "https://i.postimg.cc/6p2wXZVZ/letsgo.jpg" },
  {
    title: "Overwhelmed",
    url: "https://i.postimg.cc/9fyh4jnF/overwhelmed.jpg",
  },
  { title: "Thinking", url: "https://i.postimg.cc/Cx30LKJQ/thinking.jpg" },
];
console.log(ImagesArr);

const MyBotsList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Animated.FlatList
        data={ImagesArr}
        keyExtraction={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
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
              <Text style={{ marginTop: 20, fontSize: 40 }}>{item.title}</Text>
              <Text style={{ marginTop: 20, fontSize: 20 }}>
                Step Range: Less than 500
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MyBotsList;
