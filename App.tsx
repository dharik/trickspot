/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from "react";
import { Component } from "react";

import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import MainStack from "./app/navigators/main";
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MainStack />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
