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
  const baseUrl =  'https://investmedia-server.glitch.me/searchUser';
  const [list, setList] = useState(baseUrl);
  axios.get(`${baseUrl}/${searchText}`).then(function(response){
    console.log('Success: ', response.data);    
    useEffect(() => {
      if (searchText === '') {
        setList(response.data);
      } else {
        setList(
          response.filter(item => {
            item.data.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          })
          );
        }
      }, [searchText]);
        
      }).catch(function(error){
        console.log('Error: ', response.data)
      });
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise uma pessoa"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
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
    marginTop: 25,
    borderRadius: 30,
    fontSize: 19,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000000',
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