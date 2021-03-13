import React, { Component } from "react";
import firebase from "firebase";
import {
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
export default class EditBotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepRange: "",
      comments: "",
    };
    this.submitChange = this.submitChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      stepRange: this.props.bot.stepRange,
      comments: this.props.bot.comments,
    });
  }
  async submitChange() {
    console.log("submit change triggered!!");
    try {
      console.log("ID", this.props.bot.id);
      const ref = firebase
        .firestore()
        .collection("Bots")
        .doc(this.props.bot.id);
      await ref.set({
        stepRange: Number(this.state.stepRange),
        comments: this.state.comments,
        imageURL: this.props.bot.imageURL,
        mood: this.props.bot.mood,
      });
      this.setState({
        stepRange: "",
        comments: "",
      });
    } catch (error) {
      console.log("Error updating bot", error);
    }
  }
  render() {
    console.log("BOT INFO", this.props.bot);
    console.log(this.state);
    return (
      <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={styles.keyboard}
      >
        <View style={styles.container}>
          <View>
            <Text>Step Achieved: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => this.setState({ stepRange: input })}
            />
          </View>
          <View>
            <Text>Comments: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => this.setState({ comments: input })}
            />
          </View>
        </View>
        <Button title="update" onPress={() => this.submitChange()} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
    height: 25,
    width: 120,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
});
