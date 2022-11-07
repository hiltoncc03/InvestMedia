import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity, Text, Image, Linking} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import axios from 'axios';
import CheckBox from "expo-checkbox";


// FAZ O POST DAS INFORMAÇÕES CONFIGURADAS NA TELA DE REGISTRO
function postBioEUser(userName, userBio, USER_ID){
  if(userName[0]!='@'){
    userName= "@" + userName
  }
  console.log("USERNAME --->> " + userName)
  axios.post(`https://investmedia-server.glitch.me/bioEUser`, 
  {
    userName : userName,
    userBio: userBio,
    USER_ID: USER_ID
  }
  ).catch(error => {
    console.log(JSON.stringify(error.response))
  })
}

export default function Register({route}) {
    USER_ID = route.params.USER_ID
    console.log(USER_ID)
    const navigation = useNavigation();
    const [userName, setUsername] = useState("");
    const [userBio, setUserBio] = useState("");
    const [isSelected, setSelected] = useState(false);

    return (
      <View style={styles.screenView}>
        <Image
          style={{ height: 250, resizeMode: "contain", marginBottom: 50 }}
          source={require("../../assets/LoginImage.png")}
        />
        <TextInput
          placeholder={"Escolha seu Username:"}
          style={styles.inputUser}
          value={userName}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"none"}
          selectionColor="#CFB43C"
        />
        {console.log(userName)}
        <TextInput
          placeholder={"Nos conte sobre você: "}
          onChangeText={(text) => setUserBio(text)}
          style={styles.inputBio}
          mode="outlined"
          value={userBio}
          maxLength={300}
          multiline
          numberOfLines={4}
          selectionColor="#CFB43C"
          textBreakStrategy="highQuality"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginRight: 50,
            marginLeft: 50,
            marginTop: 50,
          }}
        >
          <CheckBox
            value={isSelected}
            onValueChange={setSelected}
            style={{ margin: 8 }}
          />
          <Text
            onPress={() => {
              Linking.openURL("https://reactnative.dev");
            }}
            style={{
              color: "#CFB43C",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Li e concordo com os termos de uso e política de privacidade
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={
            userBio === "" || userName === "" || isSelected === false
              ? true
              : false
          }
          onPress={() => {
            postBioEUser(userName, userBio, USER_ID);
            navigation.navigate("TabBar", { USER_ID: USER_ID });
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", padding: 7 }}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  inputUser: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 10
  },
  inputBio: {
    height: 90,
    width: 350,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    padding: 10
  },
  screenView: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#CFB43C',
    height: 37,
    width: 115,
    marginTop: 30
  },
  
});