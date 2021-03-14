import React, { Component } from "react";
import firebase from "firebase";
import { Text, View, TextInput, StyleSheet, Platform } from "react-native";
import { Input, Button } from "react-native-elements";

export default class EditBotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepRange: 0,
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
    try {
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
        stepRange: 0,
        comments: "",
      });
    } catch (error) {
      console.log("Error updating bot", error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Input
          label="Steps Achieved"
          value={this.state.stepRange.toString()}
          keyboardType="numeric"
          onChangeText={(input) => this.setState({ stepRange: input })}
        />
        <Input
          style={{ height: 140 }}
          label="Motivational Phrase"
          value={this.state.comments}
          multiline={true}
          numberOfLines={2}
          onChangeText={(input) => this.setState({ comments: input })}
        />
        <Button
          title="update"
          type="outline"
          raised
          onPress={() => this.submitChange()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    alignItems: "flex-start",
  },
});
