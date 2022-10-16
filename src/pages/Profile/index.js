import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
//import { response } from "express";
const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "https://investmedia-server.glitch.me";

//RETORNA O NUMERO DE SEGUIDORES DO USUÁRIO
function getFollowersNumber(showProfileID) {
  //const [folowersNumber, setFolowersNumber] = useState([]);
  axios
    .get(
      `https://investmedia-server.glitch.me/getFolowersNumber/${showProfileID}`
    )
    .then((response) => {
      console.log("func - " + response.data[0]);
      return (response.data[0].folowersNumber);
    });
}

//RETORNA O NUMERO DE PUBLICAÇÕES DO USUÁRIO
function getPostsNumber(showProfileID) {
  //const [postsNumber, setPostsNumber] = useState([]);

  axios
    .get(`https://investmedia-server.glitch.me/getPostsNumber/${showProfileID}`)
    .then((response) => {
      console.log("func - " + response.data[0]);
      return (response.data[0].postsNumber);
    });
}

export default function App({ route }) {
  // useEffect(() => {
  //   if (contLoaded >= 2) {
  //     setIsLoading(false);
  //   }
  // },[contLoaded])
  const [isLoading, setIsLoading] = useState(true)
  const [contLoaded, setContLoaded] = useState(0);
  const [postsNumber, setPostsNumber] = useState([]);
  const [folowersNumber, setFolowersNumber] = useState([]);
  //PASSANDO showProfileID DE "Login.js" PARA "Routes.js" E PARA "Index.js" (PERFIL)
  const loggedUser = route.params.loggedUser;
  const [showProfileID, setShowProfileID] = useState(
    route.params.showProfileID
  );
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [dadosPerfil, setDados] = useState([]);
  const [posts, setPosts] = useState([]);
  //Faz a requisição das informações do usuário
  useEffect(() => {
    if (isLoading) {
      return () => {
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#CFB43C" />
        </View>
      }
    } else {
      //console.log(contLoaded);
      return () => {
        <ScrollView>
          <View style={styles.background}>
            {/*HEADER DO PERFIL*/}
            <View style={styles.headerPerfil}>
              <View style={styles.headerPerfilEsquerdo}>
                <Image
                  source={{
                    uri: dadosPerfil.fotoPerfil,
                  }}
                  style={styles.photoPerfil}
                ></Image>
                <Text style={styles.textUser}>{dadosPerfil.userName}</Text>

                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <View style={{ marginRight: 30 }}>
                    <Text style={styles.textQuant}>{postsNumber}</Text>
                    <Text style={styles.textLegenda}>Publicações</Text>
                  </View>
                  <View>
                    <Text style={styles.textQuant}>{folowersNumber}</Text>
                    <Text style={styles.textLegenda}>Seguidores</Text>
                  </View>
                </View>
              </View>
              <View style={styles.headerPerfilDireito}>
                <View style={{ justifyContent: "flex-start", height: 82 }}>
                  <Text style={styles.textName}>{dadosPerfil.nome}</Text>
                  <Text style={styles.textBio}>{dadosPerfil.userBio}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/images/TriânguloUp.png")}
                    style={styles.iconStock}
                  />
                  <Text style={styles.textStock}>6%</Text>
                  <Image
                    source={require("../../../assets/images/TriânguloDown.png")}
                    style={styles.iconStock}
                  />
                  <Text style={styles.textStock}>2.3%</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 2,
                    marginRight: 15,
                  }}
                >
                  <Text style={styles.textLegenda2}>Resumo Mensal</Text>
                  <Text style={styles.textLegenda2}>Resumo Semanal</Text>
                </View>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <TouchableOpacity
                    disabled={isUserProfile} //Desativa o botão seguir, se o usuário estiver no próprio perfil
                    style={
                      isUserProfile
                        ? styles.pressableHeaderDisabled
                        : styles.pressableHeader
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: 14,
                        textAlignVertical: "auto",
                        padding: 3.5,
                      }}
                    >
                      Seguir
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pressableHeader}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: 14,
                        textAlignVertical: "auto",
                        padding: 3.5,
                      }}
                    >
                      Mensagem
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.publicacoesPerfil}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 90,
                  marginLeft: 90,
                }}
              >
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#D4D4D4" : "white",
                    },
                    { width: 19.11, height: 21.06, marginTop: 5 },
                  ]}
                >
                  <Image
                    source={require("../../../assets/images/iconePerfilAtivos.png")}
                    style={{ width: 19.11, height: 21.06, resizeMode: "cover" }}
                  />
                </Pressable>
                <View
                  style={{
                    backgroundColor: "#eaeaea",
                    width: 2,
                    height: 25,
                    fill: 1,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                ></View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#D4D4D4" : "white",
                    },
                    { width: 25.74, height: 20.67, marginTop: 5 },
                  ]}
                >
                  <Image
                    source={require("../../../assets/images/iconePerfilFotos.png")}
                    style={{ width: 25.74, height: 20.67, resizeMode: "cover" }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  backgroundColor: "#eaeaea",
                  width: 380,
                  height: 2,
                  borderRadius: 10,
                  marginTop: 2,
                  alignSelf: "center",
                }}
              ></View>
              <FlatList
                nestedScrollEnabled
                numColumns={3}
                horizontal={false}
                // data={(posts.url =! null ? posts.url : null)}
                data={posts.reverse()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.publicacaoFeed]}
                    onPress={() => console.log("Publicação " + item.id)}
                  >
                    {console.log(item.url)}
                    <Image
                      source={{ uri: item.url }}
                      style={styles.publicacaoFeed}
                    ></Image>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
      }
    }
  },[isLoading])
  useEffect(() => {
    //Confere se o perfil a ser visualizado é o perfil do usuário utilizador
    if (loggedUser === showProfileID) {
      setIsUserProfile(true);
      setShowProfileID(loggedUser);
    }
    //let mounted = true;
    axios
      .get(`${baseUrl}/infoUser/${showProfileID}`)
      .then((response) => {
        console.log(
          "\n\n\n\n----------------- FAZENDO REQUISIÇÂO ----------------"
        );
        setDados(response.data[0]);
      })
      .catch((error) => console.log(error.data));
    getFollowersNumber(showProfileID)
    getPostsNumber(showProfileID)
    
    //return () => mounted = false;
  }, []);
  
  //faz a requisição das informações de publicação do usuário
  useEffect(() => {
    axios
      //.get(`${baseUrl}/userPub/${showProfileID}`)
      .get('https://jsonplaceholder.typicode.com/albums/1/photos')// api fake JsonPlaceHolder
      .then((response) => {
        setPosts(response.data);
        console.log("\n\n\n\n---------------------PUBLICAÇÔES--------------------");
        console.log(posts);
        console.log("---------------------PUBLICAÇÔES--------------------");
        
      })
      .catch((error) => console.log(error.data));
      setIsLoading(false);
  },[])
  console.log("Usuário conectado:");
  console.log(loggedUser);
  console.log("Usuário mostrado");
  console.log(showProfileID);
  console.log("Data");
  console.log(dadosPerfil);
  //MUDAR VALOR CASO O NUMERO DE REQUISIÇÕES AUMENTE----
  
}

const styles = StyleSheet.create({
  linhaFeed: {
    flexDirection: "row",
    justifyContent: "center",
  },
  publicacaoFeed: {
    width: (windowWidth - 2160 / 100) / 3,
    height: (windowWidth - 2160 / 100) / 3,
  },
  photoPerfilSize: {
    width: 10,
    height: 10,
    marginLeft: "11%",
    marginTop: "3%",
  },
  photoPerfil: {
    borderRadius: 999,
    height: 93,
    width: 93,
    alignSelf: "center",
    marginTop: "4%",
  },
  headerPerfilEsquerdo: {
    width: 200,
    height: 200,
    marginTop: 5,
    marginBottom: 10,
  },
  headerPerfilDireito: {
    width: 200,
    height: 200,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 13,
  },
  background: {
    backgroundColor: "#eaeaea",
    flex: 1,
  },
  headerPerfil: {
    flex: 1,
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "1.9%",
    marginBottom: "4.9%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicacoesPerfil: {
    flex: 1,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: "4.9%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  textUser: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#14144b",
    textAlign: "center",
    alignSelf: "center",
  },
  textQuant: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#14144b",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 12,
  },
  textName: {
    marginTop: "4%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#14144b",
    textAlign: "center",
    alignSelf: "flex-start",
  },
  textBio: {
    marginTop: "1%",
    fontSize: 14,
    color: "#848484",
    textAlign: "justify",
    alignSelf: "flex-start",
  },
  textLegenda: {
    marginTop: "1.5%",
    fontSize: 12,
    color: "#848484",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 12,
  },
  textLegenda2: {
    marginTop: "1.5%",
    fontSize: 12,
    color: "#848484",
    textAlign: "center",
    alignSelf: "center",
    marginRight: 5,
  },
  textStock: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#14144b",
    textAlign: "center",
    alignSelf: "flex-start",
    marginRight: 10,
  },
  iconStock: {
    width: 27,
    height: 27,
    marginLeft: "5%",
    marginTop: "3%",
    marginRight: 7,
  },
  pressableHeader: {
    backgroundColor: "#c6b347",
    height: 28,
    width: 83,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
    marginRight: 10,
  },
  pressableHeaderDisabled: {
    backgroundColor: "gray",
    height: 28,
    width: 83,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
    marginRight: 10,
  },
});
