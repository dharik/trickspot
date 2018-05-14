import React from "react";
import { View, Text } from "react-native";

export default class AddWhen extends React.Component {
  static navigationOptions = {
    title: 'Dates and Times',
    header: null
  }
  
  render() {
    return (
      <View>
        <Text>Times and Dates</Text>
      </View>
    );
  }
}
