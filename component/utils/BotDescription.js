import React, { Component, useState } from "react";
import { View, Text, Dimensions, Button } from "react-native";
import EditBotForm from "../utils/EditBotForm";

const BotDescription = (props) => {
  const { bot, imageW } = props;
  const { width } = Dimensions.get("screen");
  const [editStatus, setEditStatue] = useState(false);

  return (
    <View
      style={{
        width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginTop: 20,
          fontSize: 40,
          fontFamily: "EuphemiaUCAS",
        }}
      >
        {bot.mood}
      </Text>
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          fontFamily: "EuphemiaUCAS",
          textDecorationLine: "underline",
        }}
      >
        Steps Achieved: {bot.stepRange}
      </Text>
      <Text
        style={{
          marginTop: 20,
          fontSize: 22,
          width: imageW,
          textAlign: "center",
          fontFamily: "EuphemiaUCAS-Italic",
        }}
      >
        "{bot.comments}"
      </Text>
      <Button title="Edit" onPress={() => setEditStatue((prev) => !prev)} />
      {editStatus ? <EditBotForm bot={bot} /> : <Text></Text>}
    </View>
  );
};

export default BotDescription;
