/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {Root, StyleProvider} from "native-base";
import { StyleSheet } from "react-native";
import AppNavigator from "./navigator";
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

export default class App extends Component {
  render() {
    return (
    <Root>
      <StyleProvider style={getTheme(platform)}>
        <AppNavigator />
      </StyleProvider>
    </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
