import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from '../../components/ListItem';

import results from '../../../results';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  useEffect(() => {
    if (searchText === '') {
      setList(results);
    } else {
      setList(
        results.filter(
          (item) =>
            item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...results];

    newList.sort((a, b) => (a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0));

    setList(newList);
  };

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
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#CFB43C"
          />
        </TouchableOpacity>
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
    marginTop: 20,
    marginRight: 30,
  },
  list: {
    flex: 1,
    color: "red",
  },
});

export default App;