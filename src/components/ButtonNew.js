import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {Entypo} from '@expo/vector-icons';

export default function ButtonNew({ focused, size, color }) {
  return (
    <View style={[styles.container, { backgroundColor: focused ? '#E1E2E1' :  '#CFB43C'}]}>
      <Entypo name="plus" size={size} color={color}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
  });