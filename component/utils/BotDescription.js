import React, { Component, useState } from "react";
import { View, Text, Dimensions, Button } from "react-native";
import EditBotForm from "../utils/EditBotForm";

const BotDescription = (props) => {
  const { item, imageW } = props;
  const { width } = Dimensions.get("screen");
  const [editStatus, setEditStatue] = useState(false);

  console.log("ITEM", item);
  return (
    <View
      style={{
        width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginTop: 20, fontSize: 40 }}>{item.title}</Text>
      <Text style={{ marginTop: 20, fontSize: 20 }}>
        Step Range: Less than 500
      </Text>
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          width: imageW,
        }}
      >
        Comments: hmmmm I thought I could do better than that.
      </Text>
      <Button title="Edit" onPress={() => setEditStatue((prev) => !prev)} />
      {editStatus ? <Text>Can edit now!</Text> : <Text></Text>}
    </View>
  );
};

export default BotDescription;
