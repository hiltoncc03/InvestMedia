import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home({route}) {
  const loggedUser = route.params.loggedUser;
    return (
    <View style={styles.container}>
      <Text style={styles.text}> ID {loggedUser}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ff0000',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});