import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, StyleSheet } from 'react-native';
import Home from './pages/Home';
import New from './pages/New';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ButtonNew from './components/ButtonNew';

import { Entypo, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarInactiveBackgroundColor: "#CFB43C",
            tabBarActiveBackgroundColor: "#B9A239",
            tabBarActiveTintColor: '#E1E2E1',
            tabBarInactiveTintColor: '#E1E2E1',
          })}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Pesquisar"
                component={Search}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Feather name="search" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Notificações"
                component={Notification}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Entypo name="notification" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />

        </Tab.Navigator>
    )
}