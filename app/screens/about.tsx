import React from "react";
import { View, Text, ScrollView } from "react-native";

export default () => (
  <ScrollView>
    <Text>About TrickSpot</Text>
    <Text style={{fontWeight: 'bold'}}>Why was this made?</Text>
    <Text>
      - The tricking community is small (but growing) and it's a challenge to find
      others who are in to it. Specifically:
    </Text>
    <Text>
      - The word "tricking" is doesn't yield relevant results in search engines.
    </Text>
    <Text>
      - Tricking is practiced in a variety of places -- gyms, local parks,
      beaches. We can't look for one specific type of place.
    </Text>
    <Text>
      - Facebook and meetup groups are difficult to search for by location.
    </Text>
    <Text style={{fontWeight: 'bold'}}>How can I get involved?</Text>
    <Text>
      With TrickSpot - </Text>
  </ScrollView>
);
