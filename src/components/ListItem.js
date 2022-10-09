import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const ListItem = ({ data }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Image source={{ uri: data.fotoPerfil }} style={styles.itemPhoto} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemP1}>{data.nome}</Text>
        <Text style={styles.itemP2}>{data.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  itemInfo: {
    marginLeft: 20,
  },
  itemP1: {
    fontSize: 22,
    color: '#0C0C4B',
    marginBottom: 5
  },
  itemP2: {
    fontSize: 15,
    color: '#0C0C4B',
  },
});

export default ListItem;