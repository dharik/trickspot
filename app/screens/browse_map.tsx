import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from "react-native";
import React from "react";
import { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { get_all_gatherings } from "../services/db";
import { getLocation } from "../services/location";
import { getDistanceFromLatLonInKm } from "../utilities/distance_calculator";

export default class TrickspotMap extends Component {
  static navigationOptions = {
    title: "All spots and gatherings",
    header: null
  };

  state = {
    gatherings: [],
    gpsLocation: {
      latitude: 0,
      longitude: 0
    },
    waitingOnLocation: true,
    waitingOnGatheringsList: true,
    somethingWentWrong: false
  };

  componentDidMount() {
    get_all_gatherings()
      .then(r => {
        this.setState({
          gatherings: r,
          waitingOnGatheringsList: false
        });
      })
      .catch(e => {
        console.error(e, "failed to get gatherings");
      });

    getLocation().then(location => {
      this.setState({ gpsLocation: location.coords, waitingOnLocation: false });
    });
  }

  render() {
    if (
      this.state.waitingOnLocation ||
      this.state.waitingOnGatheringsList ||
      this.state.somethingWentWrong
    ) {
      return this.renderLoading();
    }

    return (
      <React.Fragment>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.gpsLocation.latitude || 37.78825,
            longitude: this.state.gpsLocation.longitude || -122.4324,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
        >
          {this.state.gatherings.map(g => (
            <Marker
              coordinate={{
                latitude: g.selectedLocation.lat,
                longitude: g.selectedLocation.lng
              }}
              title={g.title}
              description={getDistanceFromLatLonInKm(
                this.state.gpsLocation.latitude,
                this.state.gpsLocation.longitude,
                g.selectedLocation.lat,
                g.selectedLocation.lng
              ).toString()}
              key={g.id}
            >
              <Callout
                onPress={() =>
                  this.props.navigation.navigate("view_spot", { spot: g })
                }
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>{g.title}</Text>
                  <Text>{frequency_to_string(g.frequency)}</Text>
                  <Text
                    lineBreakMode="clip"
                    ellipsizeMode="tail"
                    style={{ maxWidth: 200 }}
                    numberOfLines={3}
                  >
                    {g.description}
                  </Text>
                  <Button title="Tap for more details" />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{ textAlign: "center" }}>Back</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={30} />
        {this.state.waitingOnLocation && <Text>Getting your location...</Text>}
        {this.state.waitingOnGatheringsList && (
          <Text>Loading tricking spots and gatherings</Text>
        )}
        {this.state.somethingWentWrong && (
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
  map: {
    ...StyleSheet.absoluteFillObject
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    zIndex: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    opacity: 0.9
  }
});

const frequency_to_string = f => {
  switch (f) {
    case "weekly":
      return "Weekly Gatherings";

    case "once":
      return "One time";

    case "default":
      return "";
  }
};
