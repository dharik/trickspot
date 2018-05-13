import React from "react";
import { ScrollView, Text, Button } from "react-native";

export default class ViewTrickSpot extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text>Hi</Text>
        <Text>{this.props.navigation.getParam("spot").title}</Text>
      </ScrollView>
    );
  }
}
