/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import HomeScreen from './screen/HomeScreen';

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        counter: state.counter + 1,
      };
      break;
    case 'DECREASE':
      return {
        counter: state.counter - 1,
      };
      break;

    default:
      return state;
      break;
  }
  return state;
};

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}

export default App;
