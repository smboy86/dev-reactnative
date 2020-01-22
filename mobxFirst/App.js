/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Provider} from 'mobx-react';
import RootStore from './src/store/RootStore';
import Home from './src/screen/HomeScreen';

const App: () => React$Node = () => {
  return (
    <Provider {...RootStore}>
      <StatusBar barStyle="dark-content" />
      <Home />
    </Provider>
  );
};

export default App;
