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
import { TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    // setImage(result.uri);
    const image = result.uri
    console.log(image)
    try {
      const result2 = await axios.post("https://thumbsnap.com/api/upload",
        {
          media: `${image}`,
          key: "000023b5ab5123e013ceca9a40134f6e",
        },
        {
          'content-type': 'multipart/form-data',
        }
      );
      console.log(result2)
    }
    catch(error){
      console.log(error.message)
    }
  }
};

export default function Post({ route }) {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo[0];
  console.log(userInfo);
  const [text, setText] = useState("");
  //const [image, setImage] = useState(null);
  return (
    <View style={styles.screenViewAll}>
      <View style={styles.screenView}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.fotoPost}
            source={{ uri: userInfo.fotoPerfil }}
          ></Image>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={text}
            placeholder="Compartilhe algo com seus seguidores: "
            maxLength={300}
            multiline
            numberOfLines={4}
            selectionColor="#CFB43C"
            textBreakStrategy="highQuality"
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={
            pickImage
          }>
            <Text style={{ color: "#CFB43C" }}>
              Adicionar Imagem
            </Text>
          </TouchableOpacity>
          <Text style={styles.textLenght}>
            {text.length}/{300}
          </Text>
        </View>
      </View>
      <View style={styles.screenView2}>
        <TouchableOpacity style={styles.button} onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then((image) => {
            console.log(image);
          });
        }}>
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
    alignSelf: "flex-start",
  },
  textLenght: {
    color: "#CFB43C",
    marginLeft: 217
  },
  input: {
    height: 200,
    textAlignVertical: "top",
    width: 370,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    borderRadius: 1000,
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
    flexDirection: "row",
    backgroundColor: "red",
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#CFB43C",
    height: 37,
    width: 115,
  },
  button2: {
    borderRadius: 100,
    height: 24,
    width: 200,
  },
});
