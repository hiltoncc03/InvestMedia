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
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { set } from "react-native-reanimated";
const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "https://invest-media.herokuapp.com";

const getUserInfo = async (showProfileID) => {
  const response = await axios.get(`${baseUrl}/infoUser/${showProfileID}`);
  console.log(`${baseUrl}/infoUser/${showProfileID}`);
  console.log(response.data)
  // await delay(3000);
  return response.data;
};

const getPosts = async (showProfileID) => {
  const response = await axios.get(
    `${baseUrl}/userPub/` + showProfileID
  );
  console.log(response.data);
  return response.data.reverse();
};

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}

//RETORNA O NUMERO DE SEGUIDORES DO USUÁRIO
const getFollowersNumber = async (showProfileID) => {
  if (showProfileID) {
    const response = await axios.get(
      `${baseUrl}/getFollowersNumber/${showProfileID}`
    );
    return response.data[0].folowersNumber;
  }
};

//RETORNA O NUMERO DE PUBLICAÇÕES DO USUÁRIO
const getPostsNumber = async (showProfileID) => {
  if (showProfileID) {
    const response = await axios.get(
      `${baseUrl}/getPostsNumber/${showProfileID}`
    );
    return response.data[0].postsNumber;
  }
};

export default function App({ route }) {
  //PASSANDO showProfileID DE "Login.js" PARA "Routes.js" E PARA "Index.js" (PERFIL)
  const loggedUser = route.params.loggedUser;
  const [showProfileID, setShowProfileID] = useState(
    route.params.showProfileID
  );
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [dadosPerfil, setDados] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userInfoRequested, setUserInfoRequested] = useState(false);
  const [postsNumber, setPostsNumber] = useState(0);
  const [followersNumber, setFollowersNumber] = useState(0);
  //Faz a requisição das informações do usuário
  useEffect(() => {
    if (loggedUser) {
      if (loggedUser === showProfileID) {
        //Confere se o perfil a ser visualizado é o perfil do usuário utilizador
        setIsUserProfile(true);
        setShowProfileID(loggedUser);
      }
      if (showProfileID) {
        if (!userInfoRequested && showProfileID) {
          async function load() {
            console.log("FAZENDO REQUISIÇÕES");
            const data = await getUserInfo(showProfileID);
            const tempPostsN = await getPostsNumber(showProfileID);
            const tempFollowers = await getFollowersNumber(showProfileID);
            const tempPosts = await getPosts(showProfileID);

            setUserInfoRequested(true);
            if (data) setDados(data[0]);
            setPostsNumber(tempPostsN);
            setFollowersNumber(tempFollowers);
            setPosts(tempPosts);
            console.log(dadosPerfil);
          }

          load();
        }
      }
      console.log("Usuário conectado:");
      console.log(loggedUser);
      console.log("Usuário mostrado");
      console.log(showProfileID);
    }
  }, [showProfileID]);

  if (userInfoRequested) {
    return (
      <View
        style={{
          alignItems: "center",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          horizontal={false}
          //contentContainerStyle={{alignSelf: 'center'}}
          //ListEmptyComponent= { }
          ListHeaderComponent={
            <View>
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
                      <Text style={styles.textQuant}>{followersNumber}</Text>
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
                      style={{
                        width: 19.11,
                        height: 21.06,
                        resizeMode: "cover",
                      }}
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
                      style={{
                        width: 25.74,
                        height: 20.67,
                        resizeMode: "cover",
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.publicacaoFeed]}
              onPress={() => console.log("Publicação " + item.POST_ID)}
            >
              <Image
                source={{ uri: item.midia }}
                style={styles.publicacaoFeed}
              ></Image>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return <Text> carregando... </Text>;
  }
}

const styles = StyleSheet.create({
  linhaFeed: {
    flexDirection: "row",
    justifyContent: "center",
  },
  publicacaoFeed: {
    width: (windowWidth - 2160 / 100) / 3,
    height: (windowWidth - 2160 / 100) / 3,
    marginRight: 3,
    marginLeft: 0,
    marginBottom: 3,
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
    marginRight: 10,
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
    //marginLeft: "2%",
    //marginRight: "2%",
    marginTop: "1.9%",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicacoesPerfil: {
    flex: 1,
    //marginLeft: "2%",
    //marginRight: "2%",
    backgroundColor: "#ffffff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
