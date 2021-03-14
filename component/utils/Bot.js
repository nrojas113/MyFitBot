import React, { useState, useEffect, Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  Text,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { firebase } from "../../firebase/config";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1;

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

const Bot = ({ steps }) => {
  const [loading, setLoading] = useState(true);
  const [bot, setBot] = useState({});
  const [nextGoal, setNextGoal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ref = firebase.firestore().collection("Bots");

  useEffect(() => {
    const fetchMyBot = async () => {
      const snapshot = await ref.get();
      let bots = [];
      snapshot.forEach((doc) => {
        bots.push(doc.data());
      });
      const sortedBots = bots.sort((a, b) => b.stepRange - a.stepRange);
      const targetBot = sortedBots.reduce((a, b) => {
        let aDiff = Math.abs(a.stepRange - steps);
        let bDiff = Math.abs(b.stepRange - steps);
        if (aDiff === bDiff) {
          return a > b ? a : b;
        } else {
          return bDiff < aDiff ? b : a;
        }
      });

      let targetIdx = sortedBots.indexOf(targetBot);
      setBot(targetBot);
      setNextGoal(sortedBots[targetIdx - 1].stepRange);
      if (loading) {
        setLoading(false);
      }
    };
    fetchMyBot();
  }, []);

  return (
    <View style={styles.container}>
      {bot && (
        <View>
          <Pressable onPress={() => setModalVisible(true)}>
            <ImageLoader style={styles.image} source={{ uri: bot.imageURL }} />
          </Pressable>
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
                <Text style={styles.modalText}>{bot.comments}</Text>
                <Text style={styles.goalText}>Your Next Step Goal is... </Text>
                <Text style={styles.goalCount}>{nextGoal}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <MaterialCommunityIcons name="close" size={26} />
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height: imageH,
    borderRadius: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 22,
    marginBottom: 55,
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.265,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "mistyrose",
  },
  textStyle: {
    color: "black",
    fontSize: 20,
  },
  modalText: {
    fontSize: 18,
    fontFamily: "EuphemiaUCAS-Italic",
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
  },
  goalText: {
    fontFamily: "EuphemiaUCAS",
    fontSize: 15,
    marginTop: 5,
  },
  goalCount: {
    fontSize: 30,
    marginTop: 15,
  },
});

export default Bot;
