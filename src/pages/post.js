import React, { FC, ReactElement, useState } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
//import Parse from "parse/react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import axios from "axios";
import { TextInput } from 'react-native-paper';

export default function Post({ route }) {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo[0]
  console.log(userInfo);
  const [text, setText] = useState("");

  return (
    <View style={styles.screenViewAll}>
      <View style={styles.screenView}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.fotoPost} source={{ uri: userInfo.fotoPerfil }}></Image>
          <TextInput
            mode= "outlined"
            style={styles.input}
            value={text}
            placeholder="Compartilhe algo com seus seguidores: "
            maxLength={300}
            multiline
            numberOfLines={4}
            selectionColor="#CFB43C"
            textBreakStrategy='highQuality'
            onChangeText={(text) => setText(text)}
          />
        </View>
        <Text style={styles.textLenght}>{text.length}/{300}</Text>
      </View>
      <View style={styles.screenView2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {

          }}
        >
          <Text style={{ color: "white", alignSelf: "center", padding: 7 }}>
            Publicar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fotoPost: {
    borderRadius: 999,
    height: 40,
    width: 40,
    marginRight: 10,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  textLenght: {
    alignSelf: 'flex-end',
    color: '#CFB43C'
},
  input: {
    height: 200,
    textAlignVertical: 'top',
    width: 370,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    borderRadius: 1000
  },
  screenViewAll: {
    flex: 1,
    padding: 10,
    alignContent: "flex-start",
    alignSelf: "center",
  },
  screenView: {
    padding: 10,
    alignContent: "flex-start",
    alignSelf: "center",
    //backgroundColor: "blue"
  },
  screenView2: {
    marginTop: 100,
    padding: 10,
    alignContent: "flex-start",
    alignSelf: "center",
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#CFB43C",
    height: 37,
    width: 115,
  },
});
