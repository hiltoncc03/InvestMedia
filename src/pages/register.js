import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
//import Parse from "parse/react-native";
import { useNavigation } from '@react-navigation/native';

export default function Register({route}) {
    USER_ID = route.params.USER_ID
    const navigation = useNavigation();
    const [userName, setUsername] = useState("");
    const [userBio, setUserBio] = useState("");

    return (
    <>
        <TextInput
        style={styles.input}
        value={userName}
        placeholder={"Escolha seu Username:"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={userBio}
        placeholder={"Nos conte sobre você: "}
        secureTextEntry
        onChangeText={(text) => setUserBio(text)}
      />
      <Button title={"Comfirmar"} onPress={() => {
        //Fazer post de variáveis username e userbio
        navigation.navigate('TabBar', {'USER_ID' : response.data[0].USER_ID});
      }} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});