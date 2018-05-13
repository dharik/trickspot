import { View, StyleSheet } from "react-native";
import React from "react";
import { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { get_all_gatherings } from "../services/db";

export default class TrickspotMap extends Component {
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
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={({ coordinate, position }) => {
          console.log("selected", coordinate);
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78,
            longitude: -122.43
          }}
          title="tedt"
          description="description"
          draggable={true}
        />

        {this.state.gatherings.map(g => (
          <Marker
            coordinate={{
              latitude: g.selectedLocation.lat,
              longitude: g.selectedLocation.lng
            }}
            title={g.title}
            description={g.description}
            key={g.uid}
          />
        ))}
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
