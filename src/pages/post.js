import React, { FC, ReactElement, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
//import Parse from "parse/react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import axios from "axios";

export default function Post({ route }) {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo[0]
  console.log(userInfo);
  const [userName, setUsername] = useState("");
  const [userBio, setUserBio] = useState("");

  return (
    <View style={styles.screenView}>
      <Image style={styles.fotoPost} source={{uri: userInfo.fotoPerfil}}></Image>
      {console.log(userName)}
      <TextInput
        style={styles.inputBio}
        value={userBio}
        placeholder={"Nos conte sobre você: "}
        maxLength={100}
        multiline
        numberOfLines={4}
        selectionColor="#CFB43C"
        onChangeText={(text) => setUserBio(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          
        }}
      >
        <Text style={{ color: "white", alignSelf: "center", padding: 7 }}>
          Confirmar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fotoPost: {
    borderRadius: 999,
    height: 30,
    width: 30,
    alignSelf: "center",
    marginTop: "4%",
  },
  inputUser: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 10,
  },
  inputBio: {
    height: 90,
    width: 350,
    marginBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    padding: 10,
  },
  screenView: {
    flex: 1,
    alignContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row'
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#CFB43C",
    height: 37,
    width: 115,
    marginTop: 30,
  },
});
