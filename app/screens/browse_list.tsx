import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { get_all_gatherings } from "../services/db";
import { getLocation } from "../services/location";
import { getDistanceFromLatLonInKm } from "../utilities/distance_calculator";
import create_distance_sorter from "../utilities/create_distance_sorter";

export default class TrickspotList extends Component {
  state = {
    gatherings: [],
    gpsLocation: {
      latitude: 0,
      longitude: 0
    }
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

    getLocation().then(location => {
      this.setState({ gpsLocation: location.coords });
    });
  }

  renderGathering = ({ item: g }) => {
    const distance: number = getDistanceFromLatLonInKm(
      this.state.gpsLocation.latitude,
      this.state.gpsLocation.longitude,
      g.selectedLocation.lat,
      g.selectedLocation.lng
    );

    const distance_text: string =
      distance > 100 ? "> 100 km" : distance.toPrecision(2) + " km";

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderWidth: 1,
          margin: 3,
          borderRadius: 5,
          padding: 5
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{g.title}</Text>
        <Text>{g.description}</Text>
        <Text>Distance: {distance_text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const by_distance = create_distance_sorter(this.state.gpsLocation);

    return (
      <FlatList
        data={this.state.gatherings.sort(by_distance)}
        renderItem={this.renderGathering}
        keyExtractor={g => g.id}
        />
    );
  }
}
