import React from 'react';
import { ScrollView, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return <ScrollView>
      <Button title="Map" onPress={() => this.props.navigation.navigate('browse_map')}/>
      <Button title="List" onPress={() => this.props.navigation.navigate('browse_list')} />
      <Button title="Add spot" onPress={() => this.props.navigation.navigate('add')}/>
      <Button title="About TrickSpot"  onPress={() => this.props.navigation.navigate('about')}/>
    </ScrollView>
  }
}