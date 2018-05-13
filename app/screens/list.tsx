import React from "react";
import { Component } from "react";
import { View, Text } from "react-native";
import { get_all_gatherings } from "../services/db";
import { requestLocationPermission, getLocation } from "../services/location";

export default class TrickspotList extends Component {
  state = {
    gatherings: []
  };

  componentDidMount() {
    get_all_gatherings()
      .then(r => {
        this.setState({
          gatherings: r
        });
      })
      .catch(e => {
        console.error(e, "failed to get gatherings");
      });

      getLocation();
  }

  render() {
    return (
      <View>
        {this.state.gatherings.map(g => (
          <Text key={g.id}>
            {g.title}
            {g.description}
          </Text>
        ))}
      </View>
    );
  }
}
