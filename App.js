import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const express = require('express');
const server = express();
const dummyData = require('./src/data/dummyData.json');

server.get('/api', (req,res) => {
    return res.json({dummyData})
});

server.listen(3000, () => {
    console.log('Servidor está funcionando...')
});

const Stack = createNativeStackNavigator ()

export default function App() {
  return (
    <NavigationContainer>
      <Routes/>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}