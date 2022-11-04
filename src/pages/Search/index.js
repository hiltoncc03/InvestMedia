import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ListItem from '../../components/ListItem';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Profile'
const SearchStack = createNativeStackNavigator()

function Search({ route }) {
  const loggedUser = route.params.loggedUser
  { console.log("---------") }
  { console.log(loggedUser) }
  const [searchText, setSearchText] = useState('');
  // const [canSearch, setCanSearch] = useState(true);
  // const [delayTimeout, setDelayTimeout] = useState(() => { })
  const baseUrl = "https://invest-media.herokuapp.com/searchUser";
  const [list, setList] = useState([]);

  // useEffect(function () {
  //   if (canSearch) {
  //     setCanSearch(false)
  //     axios.get(`${baseUrl}/${searchText}`)
  //       .then((response) => {
  //         console.log('Success: ', response.data);
  //         setList(
  //           response.data
  //         );

  //       }).catch(function (error) {
  //         console.log('Error: ', error)
  //       })
  //   }
  // }, [searchText, canSearch])

  useEffect(function () {
    axios.get(`${baseUrl}/${searchText}`)
      .then((response) => {
        console.log('Success: ', response.data);
        setList(
          response.data
        );

      })
      .catch(function (error) {
        console.log('Error: ', error)
      })

  }, [searchText])

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          placeholderTextColor="#848484"
          value={searchText}
          onChangeText={(t) => {
            setSearchText(t);

            // setDelayTimeout(setTimeout(() => {
            //   setCanSearch(true);
            // }, 250));
          }}
        />
      </View>

      <FlatList
        data={list}
        style={styles.list}
        renderItem={({ item }) => <ListItem data={item} loggedUser={loggedUser} />}
        keyExtractor={(item) => item.USER_ID}
      />

      <StatusBar style='light' />
    </SafeAreaView>
  );
};

export default function App({ route }) {
  const loggedUser = route.params.loggedUser
  return (
    <NavigationContainer independent={true}>
      <SearchStack.Navigator screenOptions={{ headerShown: false, animationTypeForReplace: 'push' }} >
        <SearchStack.Screen name="Search" component={Search} initialParams={{loggedUser: loggedUser}} />
        <SearchStack.Screen name="Profile2" component={Profile} />
      </SearchStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E2E1',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F5F5',
    margin: 10,
    marginTop: 15,
    borderRadius: 10,
    fontSize: 19,
    color: '#000000',
    padding: 10,
  },
  searchArea: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginTop: 15,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
});
