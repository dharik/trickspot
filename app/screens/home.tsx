import React from 'react';
import { ScrollView, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return <ScrollView>
      <Button title="Map of tricking spots and gatherings" onPress={() => this.props.navigation.navigate('browse_map')}/>
      <Button title="List of spots and gatherings" onPress={() => this.props.navigation.navigate('browse_list')} />
      <Button title="List of spots and gatherings" onPress={() => this.props.navigation.navigate('browse_list')} />
      <Button title="List of spots and gatherings" onPress={() => this.props.navigation.navigate('browse_list')} />

    </ScrollView>
  }
}