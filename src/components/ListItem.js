import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ data, loggedUser }) => {
  const navigation = useNavigation()
  console.log("listItem")
  console.log(loggedUser)
  //console.log('checkpoint')
  console.log(data)
  return (
    <TouchableOpacity style={styles.item} onPress={() =>{
        navigation.navigate('Profile2', {showProfileID : data.USER_ID, loggedUser: loggedUser});
      }}>
      <View style = {styles.container}>
        <Image source={{ uri: data.fotoPerfil }} style={styles.itemPhoto} />
        <View style={styles.itemInfo}>
        <Text style={styles.itemP1}>{data.userName}</Text>
        <Text style={styles.itemP2}>{data.nome}</Text>
        </View>
      </View>
    </TouchableOpacity>
    
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    backgroundColor: 'fff',
    justifyContent: 'center',
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  itemInfo: {
    marginLeft: 8,
    backgroundColor: 'fff',
    padding: 5,
    textAlignVertical: 'center'
  },
  itemP1: {
    fontSize: 18,
    color: '#0C0C4B',
    marginBottom: 0,
    marginTop: 6
  },
  itemP2: {
    fontSize: 14,
    color: "#848484",

  },
});

export default ListItem;