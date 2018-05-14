import React from "react";
import { ScrollView, View, Text, TextInput, Switch, Button } from "react-native";

export default class AddDetails extends React.Component {
  static navigationOptions = {
    title: "Details",
    header: null
  };


  render() {
    return (
      <ScrollView>
        <Text>More details</Text>
        <TextInput placeholder="Title of this spot" />
        <TextInput placeholder="URL" />
        <TextInput
          multiline={true}
          placeholder={description_placeholder}
          numberOfLines={8}
        />

        <Text>About the location</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch value={true} />
          <Text>Spring floors</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch value={true} />
          <Text>Grass</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch value={true} />
          <Text>Has crashpads</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch value={true} />
          <Text>Free (no fees to enter)</Text>
        </View>

        <Button title="Submit" />
      </ScrollView>
    );
  }
}

const description_placeholder = `Be specific about when to meet, what to look for, what to bring, etc. Add information about how to contact you -- for example a phone number of instagram handle`;
