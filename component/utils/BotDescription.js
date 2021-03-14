import React, { Component, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import EditBotForm from "../utils/EditBotForm";
import { Button } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");

const BotDescription = (props) => {
  const { bot, imageW } = props;
  const [editStatus, setEditStatue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.moodText}>{bot.mood}</Text>
      <Text style={styles.stepsText}>Steps Achieved: {bot.stepRange}</Text>
      <Text style={styles.commentsText}>"{bot.comments}"</Text>
      <Button
        title="Edit"
        type="outline"
        raised
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <EditBotForm bot={bot} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialCommunityIcons name="close" size={26} />
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* {editStatus ? <EditBotForm bot={bot} /> : <Text></Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  moodText: {
    marginTop: 10,
    fontSize: 40,
    fontFamily: "EuphemiaUCAS",
  },
  stepsText: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: "EuphemiaUCAS",
  },
  commentsText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 17,
    textAlign: "center",
    fontFamily: "EuphemiaUCAS-Italic",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 130,
    // marginBottom: 55,
  },
  modalView: {
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.6,
    // margin: 20,
    backgroundColor: "seashell",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 3,
    marginRight: width * 0.6,
    elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  buttonClose: {
    backgroundColor: "mistyrose",
  },
  // textStyle: {
  //   color: "black",
  //   fontSize: 20,
  // },
  // modalText: {
  //   fontSize: 18,
  //   fontFamily: "EuphemiaUCAS-Italic",
  //   marginBottom: 5,
  //   textAlign: "left",
  //   fontWeight: "bold",
  // },
});
export default BotDescription;
