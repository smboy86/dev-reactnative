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
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';

const App = () => {
  useEffect(() => {
    console.log('test useEffect ');
    this.checkPermission();
    this.messageListener();
  }, []);

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  };

  messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>파이어베이스 프로젝트 셋팅! 222</Text>
        {firebase.admob.nativeModuleExists && <Text>admob()</Text>}
        {firebase.analytics.nativeModuleExists && <Text>analytics()</Text>}
        {firebase.auth.nativeModuleExists && <Text>auth()</Text>}
        {firebase.config.nativeModuleExists && <Text>config()</Text>}
        {firebase.crashlytics.nativeModuleExists && <Text>crashlytics()</Text>}
        {firebase.database.nativeModuleExists && <Text>database()</Text>}
        {firebase.firestore.nativeModuleExists && <Text>firestore()</Text>}
        {firebase.functions.nativeModuleExists && <Text>functions()</Text>}
        {firebase.iid.nativeModuleExists && <Text>iid()</Text>}
        {firebase.links.nativeModuleExists && <Text>links()</Text>}
        {firebase.messaging.nativeModuleExists && <Text>messaging()</Text>}
        {firebase.notifications.nativeModuleExists && (
          <Text>notifications()</Text>
        )}
        {firebase.perf.nativeModuleExists && <Text>perf()</Text>}
        {firebase.storage.nativeModuleExists && <Text>storage()</Text>}
      </View>
    </>
  );
};

export default App;
