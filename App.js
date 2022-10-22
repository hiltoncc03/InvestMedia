import React, { Profiler } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Login from './src/pages/login';
import Splash from './src/pages/splash';
import Register from './src/pages/register'
import Post from "./src/pages/post";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: "#CFB43C",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#CFB43C",
          },
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TabBar" component={Routes} />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerShown: true,
            statusBarColor: "#CFB43C",
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
      {/*<Routes/>*/}
    </NavigationContainer>
  );
}
export function tabBar() {
  return (    
    <NavigationContainer>
    <Routes
    />
    </NavigationContainer>
  );
}