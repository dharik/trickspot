import React from "react";
import { ScrollView, Text, Button, View, Linking } from "react-native";
import MapView from "react-native-maps";

export default class ViewTrickSpot extends React.Component {
  safeOpenUrl(url: string) {
    Linking.canOpenURL(url).then(() => Linking.openURL(url));
  }

  render() {
    const spot = this.props.navigation.getParam("spot");
    let {
      title,
      description,
      frequency,
      created,
      hasCrashPads,
      isFree,
      isGrass,
      isSpringFloor,
      selectedLocation,
      url,
      weekly_days
    } = spot;

    const today = Date.now();
    const time_delta_created = today - created;
    const created_within_30_days = time_delta_created < 1000 * 3600 * 24 * 30;
    const url_is_valid = url.length > 0 && url.includes(':') && url.includes('.');

    return (
      <ScrollView>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>

        <Text>{description}</Text>

        {frequency === "weekly" && <Text>{weekly_days.join(", ")}</Text>}

        {created_within_30_days && (
          <Text>Added to Trickspot in the last 30 days</Text>
        )}

        {url_is_valid && <Button title="Open website" onPress={() => this.safeOpenUrl(url)} />}

        <View style={{ flexDirection: "row" }}>
          {hasCrashPads && label("Crashpads")}
          {isFree && label("Free")}
          {isGrass && label("Grass")}
          {isSpringFloor && label("Springboard")}
        </View>
        
        <MapView
          style={{ height: 200 }}
          region={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          liteMode={true}
          onPress={() => this.safeOpenUrl(`geo:${selectedLocation.lat, selectedLocation.lng}`)}
        />
      </ScrollView>
    );
  }
}

function label(text: string) {
  return (
    <Text
      style={{
        backgroundColor: "#00FF00",
        borderRadius: 10,
        padding: 5,
        margin: 5
      }}
    >
      {text}
    </Text>
  );
}
