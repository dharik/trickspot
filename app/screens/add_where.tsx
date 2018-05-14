import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export default class AddWhere extends React.Component {
  static navigationOptions = {
    title: 'Where?'
  }
  
  render() {
    return (
      <View>
        <Text>Search box here</Text>
        <Text>Map will go here</Text>
      </View>
    );
  }
}
