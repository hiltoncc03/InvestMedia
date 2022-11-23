// index.js dentro de Home, dentro de pages
// Renderização dos posts através da flatlist.
import numeral from "numeral";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon_ION from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect, useCallback } from "react";
import { FAB } from "@rneui/themed";
import {
  FlatList,
  Alert,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Container, Loading } from "./styles";
import {
  Container2,
  Profile,
  Header,
  Content,
  Name,
  Account,
  Timestamp,
  Body,
  Media,
  Footer,
  IconContainer,
  Count,
} from "../../components/InvestPost/styles";
import { InvestPost, IconLike } from "../../components";
import getPosts from "../../api";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Background } from "victory-native";

//Constantes para dimensionar tamanho da tela
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Calcular tamanho da tela do usuário
const calculateHeight = (width = null) => {
  if (!width) {
    width = Dimensions.get("screen").width;
  }
  const proportion = width > Dimensions.get("screen").height ? 0.39 : 0.425;

  return width * proportion;
};

//Função principal
function Home({route}) {
  const loggedUser = route.params.loggedUser;
  //Define o tamanho da tela do usuário
  useEffect(() => {
    const handleChange = ({ screen }) => {
      setMediaHeight(calculateHeight(screen.width));
    };
    Dimensions.addEventListener("change", handleChange);

    return () => {
      Dimensions.removeEventListener("change");
    };
  }, []);

  const [estadoLike, setEstadoLike] = React.useState(false);

  function curtir() {
    setEstadoLike((oldState) => !oldState);
  }

  // Criação das variáveis
  const [modalActive, setModalActive] = useState(false);
  const [mediaHeight, setMediaHeight] = useState(calculateHeight());
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (!isFetching && !error) {
      try {
        setFetching(true);
        const newPosts = await getPosts(page, 2);
        setPage(page + 1);
        setPosts([...posts, ...newPosts]);
      } catch (err) {
        setError(err);
      } finally {
        setFetching(false);
      }
    }
  }, [page, isFetching]);

  useEffect(() => {
    fetchPosts();
  }, []);

  //Puxar feed
  useEffect(() => {
    fetch("https://investmedia-server.glitch.me/userPub")
      .then((re) => re.json())
      .then((re) => {
        setPosts(re.reverse());
        console.log(re);
      });
  }, []);
  //pegar like do banco de dados
  return (
    <Container2>
      <ScrollView>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => {
            return item.POST_ID.toFixed();
          }}
          //extraData={estadoLike}
          renderItem={({ item, index }) => {
            async function puxarLike() {
              const likeResponse = await fetch(
                `https://investmedia-server.glitch.me//curtir/${item.USER_ID}/${item.POST_ID}`
              );
              const likeResponseJson = await likeResponse.json();
              console.log(likeResponseJson);
            }

            return (
              <View>
                <Content>
                  <Header>
                    <Profile source={{ uri: item.fotoperfil }} />
                    <Name> {item.nome} </Name>
                    <Account> {item.userName} </Account>
                    {/* <Timestamp> item.dataPost </Timestamp> */}
                  </Header>

                  {item.texto != "null" && item.texto && (
                    <Body> {item.texto} </Body>
                  )}

                  {item.midia != "null" && item.midia && (
                    <Media height={mediaHeight} source={{ uri: item.midia }} />
                  )}

                  <Footer>
                    <IconContainer>
                      <TouchableOpacity>
                        <IconLike
                          onPress={() => {
                            puxarLike();
                          }}
                        />
                      </TouchableOpacity>

                      <Count> {numeral().format("0a")} </Count>
                    </IconContainer>

                    <IconContainer>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalActive}
                        onRequestClose={() => setModalActive(false)}
                      >
                        <View style={styles.outerView}>
                          <View style={styles.modalView}>
                            <Pressable
                              onPress={() => setModalActive(false)}
                              style={{ marginLeft: 280 }}
                            >
                              {/* <Text style={{color: 'red', marginBottom: 380}}> Fechar comentários </Text> */}

                              <Icon_ION name="close" size={32} color="grey" />
                            </Pressable>

                            <Text style={{ color: "blue", marginTop: 12 }}>
                              {" "}
                              teste
                            </Text>
                          </View>
                        </View>
                      </Modal>

                      <TouchableOpacity
                        onPress={() => {
                          setModalActive(true);
                        }}
                      >
                        <Icon name="comments-dollar" size={24} color="grey" />
                      </TouchableOpacity>

                      <Count> {numeral().format("0a")} </Count>
                    </IconContainer>
                  </Footer>
                </Content>
              </View>
            );
          }}
        />
      </ScrollView>
      <FAB
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="#c6b347"
        placement="right"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => {
          navigation.navigate("Post", { userInfo: userInfo });
        }}
      />
    </Container2>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  outerView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 48,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
    width: 390,
    height: 490,
    alignItems: "center",
  },
});

export default Home;
