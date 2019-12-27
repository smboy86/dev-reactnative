import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>DetailScreen</Text>
    <Button title="Go to Home" onPress={() => navigation.push("Home")} />
  </View>
);
export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
