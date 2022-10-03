import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
//import Parse from "parse/react-native";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";

export default function Register(/*{route}*/) {
    USER_ID = 22//route.params.USER_ID
    const navigation = useNavigation();
    const [userName, setUsername] = useState("");
    const [userBio, setUserBio] = useState("");

    return (
    <View style={styles.screenView}>
        <TextInput
        style={styles.inputUser}
        value={userName}
        placeholder={"Escolha seu Username:"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
        selectionColor = "#CFB43C"
        />
      <TextInput
        style={styles.inputBio}
        value={userBio}
        placeholder={"Nos conte sobre você: "}
        maxLength={100}
        multiline
        numberOfLines={4}
        selectionColor = "#CFB43C"

        onChangeText={(text) => setUserBio(text)}
      />
      <TouchableOpacity> color = '#CFB43C' style={styles.button} onPress={() => {
        //Fazer post de variáveis username e userbio
        navigation.navigate('TabBar', {'USER_ID' : response.data[0].USER_ID});
      }} 
      <Text>Confirmar</Text>
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
    borderWidth: 100
  },
  
});