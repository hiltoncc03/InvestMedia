import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, StyleSheet } from 'react-native';
import Home from './pages/Home';
import New from './pages/New';
import Ativos from './pages/StockAssets';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ButtonNew from './components/ButtonNew';

import { Entypo, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes({navigation, route}){
    const USER_ID = route.params.USER_ID;
    console.log("ROUTES" + USER_ID);
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarInactiveBackgroundColor: "#CFB43C",
            tabBarActiveBackgroundColor: "#B9A239",
            tabBarActiveTintColor: '#E1E2E1',
            tabBarInactiveTintColor: '#E1E2E1',
            headerStyle: {
                backgroundColor: '#CFB43C'
            },
            headerTitle: "InvestMedia",
            headerTitleStyle:{
                fontWeight: "bold",
                fontSize: 22,
                color: '#fff'
            }
          })}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                initialParams={{USER_ID: USER_ID}}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarShowLabel: false
                }}
            />

            <Tab.Screen
                name="Pesquisar"
                component={Search}
                initialParams={{USER_ID: USER_ID}}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Feather name="search" size={size} color={color} />
                    ),
                    tabBarShowLabel: false
                }}
            />

            <Tab.Screen
                name="Ativos"
                component={Ativos}
                initialParams={{USER_ID: USER_ID}}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Entypo name="notification" size={size} color={color} />
                    ),
                    tabBarShowLabel: false
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                initialParams={{USER_ID: USER_ID}}
                options={{
                    tabBarIcon:({size,color}) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                    tabBarShowLabel: false
                }}
            />

        </Tab.Navigator>
    )
}