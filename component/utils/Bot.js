import React, { useState, useEffect, Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
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
  const ref = firebase.firestore().collection("Bots");

  useEffect(() => {
    const fetchMyBot = async () => {
      const snapshot = await ref.get();
      let bots = [];
      snapshot.forEach((doc) => {
        bots.push(doc.data());
      });
      const filterBots = bots
        .filter((bot) => bot.stepRange < steps)
        .sort((a, b) => b.stepRange - a.stepRange);
      setBot(filterBots[0]);
      if (loading) {
        setLoading(false);
      }
    };
    fetchMyBot();
  }, []);

  return (
    <View style={styles.container}>
      {bot.mood && (
        <View>
          <ImageLoader style={styles.image} source={{ uri: bot.imageURL }} />
          <Text style={styles.text}>{bot.comments}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: imageW,
    height: imageH,
    borderRadius: 30,
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    fontFamily: "EuphemiaUCAS-Italic",
    textAlign: "center",
    // color: "#ff006e",
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Bot;
