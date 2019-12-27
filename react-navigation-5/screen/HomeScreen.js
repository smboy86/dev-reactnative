import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>HomeScreen3333</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Detail")}
    />
  </View>
);
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
