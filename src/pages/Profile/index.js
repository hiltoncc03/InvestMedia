import React, { useEffect } from "react";
import { useState } from "react";
import { FAB } from "@rneui/themed";
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
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { set } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "https://investmedia-server.glitch.me";

//Gera uma pausa no código (delay)
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}

const seguir = async (loggedUser, showProfileID) => {
  const response = await axios.post(
    `https://investmedia-server.glitch.me/seguir`,
    {
      loggedUser: loggedUser,
      showProfileID: showProfileID,
    }
  );
  if (response.status === 200) {
    console.log("Seguido");
    return true;
  }
};

//Verifica se o perfil do usuário mostrado é seguido pelo logado
const verificaSegue = async (loggedUser, showProfileID) => {
  const response = await axios.get(
    `${baseUrl}/segue/${loggedUser}/${showProfileID}`
  );
  console.log(response.data[0]);
  if (response.data[0] != undefined) {
    if (response.data[0].fk_Usuario_USER_ID === loggedUser) {
      return true;
    }
  } else {
    return false;
  }
};

//Retorna informações como nome, foto e bio
const getUserInfo = async (showProfileID) => {
  const response = await axios.get(`${baseUrl}/infoUser/${showProfileID}`);
  console.log(`${baseUrl}/infoUser/${showProfileID}`);
  // await delay(3000);
  return response.data;
};

//Retorna uma lista dos posts do usuário
const getPosts = async (showProfileID) => {
  const response = await axios.get(
    "https://investmedia-server.glitch.me/userPub/" + showProfileID
  );
  console.log(response.data);
  return response.data.reverse();
};

//RETORNA O NUMERO DE SEGUIDORES DO USUÁRIO
const getFollowersNumber = async (showProfileID) => {
  if (showProfileID) {
    const response = await axios.get(
      `https://investmedia-server.glitch.me/getFollowersNumber/${showProfileID}`
    );
    return response.data[0].folowersNumber;
  }
};

//RETORNA O NUMERO DE PUBLICAÇÕES DO USUÁRIO
const getPostsNumber = async (showProfileID) => {
  if (showProfileID) {
    response = await axios.get(
      `https://investmedia-server.glitch.me/getPostsNumber/${showProfileID}`
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
  const [segue, setSegue] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshes, setRefreshes] = React.useState(0);
  const [stockScreen, setStockScreen] = useState(true);
  const [postsScreen, setPostsScreen] = useState(false);
  const navigation = useNavigation()
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshes(refreshes.valueOf() + 1);
    console.log(refreshes.valueOf());
    delay(2000).then(() => setRefreshing(false));
  }, []);

  //Faz a requisição das informações do usuário
  useEffect(() => {
    if (loggedUser) {
      if (loggedUser === showProfileID) {
        //Confere se o perfil a ser visualizado é o perfil do usuário utilizador
        setIsUserProfile(true);
        setShowProfileID(loggedUser);
      }
      if (showProfileID) {
        if (!userInfoRequested) {
          async function load() {
            console.log("FAZENDO REQUISIÇÕES");
            const data = await getUserInfo(showProfileID);
            const tempPostsN = await getPostsNumber(showProfileID);
            const tempFollowers = await getFollowersNumber(showProfileID);
            const tempPosts = await getPosts(showProfileID);
            if (loggedUser != showProfileID) {
              const tempSegue = await verificaSegue(loggedUser, showProfileID);
              setSegue(tempSegue);
              console.log(segue);
            }

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
  }, [refreshes]);

  if (userInfoRequested) {
    return (
      <View
        style={{
          alignItems: "center",
          marginLeft: "2%",
          marginRight: "2%",
          //backgroundColor: "red",
        }}
      >
        <FlatList
          key={stockScreen ? 1 : 3}
          showsVerticalScrollIndicator={false}
          numColumns={stockScreen ? 1 : 3}
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <View style={{flex:1}}>
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
                      disabled={isUserProfile || segue} //Desativa o botão seguir, se o usuário estiver no próprio perfil
                      style={
                        isUserProfile || segue
                          ? styles.pressableHeaderDisabled
                          : styles.pressableHeader
                      }
                      onPress={async () => {
                        setSegue(await seguir(loggedUser, showProfileID));
                      }}
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
                    {/* <TouchableOpacity style={styles.pressableHeader}>
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
                    </TouchableOpacity> */}
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
                  <TouchableOpacity
                    style={{ width: 25.74, height: 20.67, marginTop: 5 }}
                    onPress={() => {
                      setStockScreen(true);
                      setPostsScreen(false);
                      console.log(stockScreen);
                      console.log(postsScreen);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/iconePerfilAtivos.png")}
                      style={{
                        width: 19.11,
                        height: 21.06,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#eaeaea",
                      width: 2,
                      height: 25,
                      fill: 1,
                      borderRadius: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  ></View>
                  <TouchableOpacity
                    onPress={() => {
                      setPostsScreen(true);
                      setStockScreen(false);
                      console.log(stockScreen);
                      console.log(postsScreen);
                    }}
                    style={{ width: 25.74, height: 20.67, marginTop: 5 }}
                  >
                    <Image
                      source={require("../../../assets/images/iconePerfilFotos.png")}
                      style={{
                        width: 25.74,
                        height: 20.67,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          data={stockScreen ? null : posts}
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
        <FAB
        visible={loggedUser!=showProfileID? true : false}
        icon={{ name: "arrow-back", color: "white" }}
        color="#c6b347"
        placement="left"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => {
          navigation.goBack()
          }
        }
        
      />
      </View>
    );
  } else {
    return (
      <ActivityIndicator
        size="large"
        color="#c6b347"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
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
    marginRight: 0,
    //backgroundColor: "red",
  },
  headerPerfilDireito: {
    width: 200,
    height: 200,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 13,
    //backgroundColor: "blue",
  },
  background: {
    backgroundColor: "#eaeaea",
    flex: 1,
  },
  headerPerfil: {
    flex: 1,
    // marginLeft: "2%",
    // marginRight: "2%",
    marginTop: "1.9%",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 200,
    width:(windowWidth - 2160 / 100) + 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicacoesPerfil: {
    flex: 1,
    //marginLeft: "2%",
    //marginRight: "2%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: (windowWidth - 2160 / 100) + 6
    //borderTopStartRadius: 20,
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
