import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function New() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Pagina novo post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});