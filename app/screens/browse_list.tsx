import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet
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
    },
    waiting_on_gatherings_list: true,
    waiting_on_location: true,
    something_went_wrong: false
  };

  componentDidMount() {
    get_all_gatherings()
      .then(r => {
        this.setState({
          gatherings: r,
          waiting_on_gatherings_list: false
        });
      })
      .catch(e => {
        this.setState({ something_went_wrong: true });
        console.error(e, "failed to get gatherings");
      });

    getLocation()
      .then(location => {
        this.setState({
          gpsLocation: location.coords,
          waiting_on_location: false
        });
      })
      .catch(e => {
        this.setState({ something_went_wrong: true });
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
        onPress={() => this.props.navigation.navigate("view_spot", { spot: g })}
      >
        <Text style={{ fontWeight: "bold" }}>{g.title}</Text>
        <Text>{g.description}</Text>
        <Text>Distance: {distance_text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (
      this.state.something_went_wrong ||
      this.state.waiting_on_gatherings_list ||
      this.state.waiting_on_location
    ) {
      return this.renderLoading();
    }

    const by_distance = create_distance_sorter(this.state.gpsLocation);

    return (
      <FlatList
        data={this.state.gatherings.sort(by_distance)}
        renderItem={this.renderGathering}
        keyExtractor={g => g.id}
      />
    );
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={30} />
        {this.state.waiting_on_location && (
          <Text>Getting your location...</Text>
        )}
        {this.state.waiting_on_gatherings_list && (
          <Text>Loading tricking spots and gatherings</Text>
        )}
        {this.state.something_went_wrong && (
          <Text>
            Something went wrong either getting your location or loading
            gatherings
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
