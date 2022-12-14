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

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [canSearch, setCanSearch] = useState(true);
  const [delayTimeout, setDelayTimeout] = useState(() => { })
  const baseUrl = 'https://investmedia-server.glitch.me/searchUser';
  const [list, setList] = useState([]);

  useEffect(function () {
    if (canSearch) {
      setCanSearch(false)
      axios.get(`${baseUrl}/${searchText}`)
        .then((response) => {
          console.log('Success: ', response.data);
          setList(
            response.data
          );

        }).catch(function (error) {
          console.log('Error: ', error)
        })
    }
  }, [searchText, canSearch])

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

            setDelayTimeout(setTimeout(() => {
              setCanSearch(true);
            }, 250));
          }}
        />
      </View>

      <FlatList
        data={list}
        style={styles.list}
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style='light' />
    </SafeAreaView>
  );
};

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

export default App;