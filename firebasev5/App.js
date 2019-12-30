/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import firebase from 'react-native-firebase';

const App: () => React$Node = () => {
  useEffect(() => {
    // const { user } = await firebase.auth().signInAnonymously();
    console.warn('User -> ', user.toJSON());
  }, []);

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>하이 파이어베이스!</Text>
        <Text style={styles.modulesHeader}>
          The following Firebase modules are pre-installed:
        </Text>
        {firebase.admob.nativeModuleExists && (
          <Text style={styles.module}>admob()</Text>
        )}
        {firebase.analytics.nativeModuleExists && (
          <Text style={styles.module}>analytics()</Text>
        )}
        {firebase.auth.nativeModuleExists && (
          <Text style={styles.module}>auth()</Text>
        )}
        {firebase.config.nativeModuleExists && (
          <Text style={styles.module}>config()</Text>
        )}
        {firebase.crashlytics.nativeModuleExists && (
          <Text style={styles.module}>crashlytics()</Text>
        )}
        {firebase.database.nativeModuleExists && (
          <Text style={styles.module}>database()</Text>
        )}
        {firebase.firestore.nativeModuleExists && (
          <Text style={styles.module}>firestore()</Text>
        )}
        {firebase.functions.nativeModuleExists && (
          <Text style={styles.module}>functions()</Text>
        )}
        {firebase.iid.nativeModuleExists && (
          <Text style={styles.module}>iid()</Text>
        )}
        {firebase.links.nativeModuleExists && (
          <Text style={styles.module}>links()</Text>
        )}
        {firebase.messaging.nativeModuleExists && (
          <Text style={styles.module}>messaging()</Text>
        )}
        {firebase.notifications.nativeModuleExists && (
          <Text style={styles.module}>notifications()</Text>
        )}
        {firebase.perf.nativeModuleExists && (
          <Text style={styles.module}>perf()</Text>
        )}
        {firebase.storage.nativeModuleExists && (
          <Text style={styles.module}>storage()</Text>
        )}
      </View>
    </>
  );
};

export default App;
