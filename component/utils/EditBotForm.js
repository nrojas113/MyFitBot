import React, { Component } from "react";
import firebase from "firebase";
import { Text, View, Button, TextInput } from "react-native";
export default class EditBotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "",
      stepRange: 0,
      comments: "",
    };
    this.submitChange = this.submitChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      mood: this.props.bot.mood,
      stepRange: this.props.bot.stepRange,
      comments: this.props.bot.comments,
    });
  }
  submitChange() {}
  render() {
    return (
      <View>
        <Text>Mood: </Text>
        <TextInput onChangeText={(mood) => this.setState(mood)} />
        <Text>Step Achieved: </Text>
        <TextInput onChangeText={(stepRange) => this.setState(stepRange)} />
        <Text>Comments: </Text>
        <TextInput onChangeText={(comments) => this.setState(comments)} />
        <Button title="update" onPress={() => this.submitChange} />
      </View>
    );
  }
}
