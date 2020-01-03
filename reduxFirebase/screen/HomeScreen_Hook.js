import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => dispatch({ type: 'INCREASE' })}>
        <Text>[ 증가 ]</Text>
      </TouchableOpacity>
      <Text>{counter}</Text>
      <TouchableOpacity onPress={() => dispatch({ type: 'DECREASE' })}>
        <Text>[ 감소 ] </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
