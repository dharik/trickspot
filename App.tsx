/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from "react";
import { Component } from "react";

import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import TrickspotMap from "./app/screens/map";
import TrickspotList from "./app/screens/list";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TrickspotList />
        <View style={styles.notificiation}>
          <Text>Hi</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notificiation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 2,
    backgroundColor: 'black'
  }
});
