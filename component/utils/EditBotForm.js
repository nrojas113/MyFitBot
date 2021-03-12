import React, { Component } from "react";
import firebase from "firebase";
export default class EditBotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "",
      stepRange: "",
      comments: "",
    };
    this.submitChange = this.submitChange.bind(this);
  }
  submitChange() {}
  render() {
    return (
      <View>
        <TextInput onChangeText={(mood) => this.setState(mood)} />
        <TextInput onChangeText={(stepRange) => this.setState(stepRange)} />
        <TextInput onChangeText={(comments) => this.setState(comments)} />
        <Button title="update" onPress={() => this.submitChange} />
      </View>
    );
  }
}
