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
  const [userBio, setUserBio] = useState("");

  return (
    <View style={styles.screenViewAll}>
      <View style={styles.screenView}>
        <Image style={styles.fotoPost} source={{ uri: userInfo.fotoPerfil }}></Image>
        <TextInput
          style={styles.input}
          value={userBio}
          label= "Compartilhe algo com seus seguidores: "
          maxLength={300}
          multiline
          numberOfLines={4}
          selectionColor="#CFB43C"
          textBreakStrategy= 'highQuality'
          onChangeText={(text) => setUserBio(text)}
        />
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
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: 'center'
  },
  input: {
    height: 200,
    width: 370,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    borderRadius: 10
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
    flexDirection: 'row',
    backgroundColor: "blue"
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
