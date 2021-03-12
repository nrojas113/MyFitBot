import React, { useState, useEffect, Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Images from "../images/index";

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
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
  let botType =
    steps > 10000
      ? "yes"
      : steps > 5000
      ? "greatjob"
      : steps > 2000
      ? "confused"
      : steps > 1000
      ? "sad"
      : steps > 500
      ? "judging"
      : "confused";

  const mood = Images[botType];

  return (
    <View style={styles.container}>
      <ImageLoader style={styles.image} source={mood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: "transparent",
    borderRadius: 16,
  },
});

export default Bot;
