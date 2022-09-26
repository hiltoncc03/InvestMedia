import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';

const Search = () => {
  const [filterdData, setfilterdData] = useState ([]);
  const [masterData, setmasterData] = useState ([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {

    }
  }, [])

  const fetchPosts = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilterdData(responseJson);
      setmasterData(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }
}

const searchFilter = (text) => {
  if(text){
    const newData = masterData.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setfilterdData(newData);
    setsearch(text);
  }else {
    setfilterdData(masterData);
    setsearch(text);
  }
}

export default function SearchScreen() {
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Search here"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filterdData}
          keyExtactor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  )
}

const ItemView = ({item}) => {
  return(
    <Text style={styles.itemStyle}>
      {item.id}{'. '}{item.title.toUpperCase()}
    </Text>
  )
}

const ItemSeparatorView = () => {
  return(
    <View
      style={{height:0.5, width:'100%', backgroundColor:'#c8c8c8'}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 15
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white'
  },
});


