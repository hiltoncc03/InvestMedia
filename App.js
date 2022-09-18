import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Login from './src/pages/login';
import Splash from './src/pages/splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()


export default function App() {
  return (    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabBar" component={Routes} />
      </Stack.Navigator>
    {/*<Routes/>*/}
    </NavigationContainer>
    
  );
}
// Criar sistema de verificação de login
export function tabBar() {
  return (    
    <NavigationContainer>
    <Routes
    />
    </NavigationContainer>
  );
}