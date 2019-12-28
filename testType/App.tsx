/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

interface Props {}

const App = ({}: Props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>헬로우 썽민</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
