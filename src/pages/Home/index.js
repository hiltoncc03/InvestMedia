import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home({route}) {
  const USER_ID = route.params.USER_ID;
  console.log("ROUTES 2 " + USER_ID);//PASSANDO USER_ID DE "Login.js" PARA "Routes.js" E PARA "Index.js" (HOME)
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Pagina inicial</Text>
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