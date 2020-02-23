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
  View,
  Text,
  StatusBar,
  Alert,
  TouchableHighlight,
} from 'react-native';

class App extends React.Component {
  onTouch = () => {
    Alert.alert('하이', '앱 로드 완료');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight onPress={this.onTouch}>
              <Text>인앱결제 시도</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
