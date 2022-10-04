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
  ScrollView
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
const Stack = createNativeStackNavigator();


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../../../assets/InvestMediaNomePreto.png")}
    />
  );
};

  
export default function App({route}){
  const baseUrl =  'https://investmedia-server.glitch.me';
  //PASSANDO USER_ID DE "Login.js" PARA "Routes.js" E PARA "Index.js" (PERFIL)
  const USER_ID = route.params.USER_ID;
  console.log("USER_ID (PERFIL) " + USER_ID);
  const [dadosPerfil, setDados] = useState([]);
  useEffect(() => {
    let mounted = true;
    axios.get(`${baseUrl}/infoUser/${USER_ID}`)
    .then((response) => {
      console.log(response.data)
      setDados(response.data[0])
      console.log(dadosPerfil);
  })
    return () => mounted = false;
  }, [])  
  return (
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
          <Text style={styles.textUser}>{dadosPerfil.nome}</Text>
          
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={{ marginRight: 30 }}>
              <Text style={styles.textQuant}>5</Text>
              <Text style={styles.textLegenda}>Publicações</Text>
            </View>
            <View>
              <Text style={styles.textQuant}>755</Text>
              <Text style={styles.textLegenda}>Seguidores</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerPerfilDireito}>
          <Text style={styles.textName}>{dadosPerfil.nome}</Text>
          <Text style={styles.textBio}>{dadosPerfil.userBio}</Text>
          <View style={{ flexDirection: "row", marginTop: 8, marginRight: 52}}>
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
          <View style={{ flexDirection: "row", marginTop: 2, marginRight: 15 }}>
            <Text style={styles.textLegenda2}>Resumo Mensal</Text>
            <Text style={styles.textLegenda2}>Resumo Semanal</Text>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "center"}}>
            <TouchableOpacity style={styles.pressableHeader}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: 14,
                  textAlignVertical: "auto",
                  marginTop: 2
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
                  marginTop: 2,
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
            justifyContent: 'space-between',
            marginRight: 90,
            marginLeft: 90
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#D4D4D4" : "white",
              },
              {width: 19.11, height: 21.06, marginTop: 5},
            ]}
          >
            <Image
              source={require("../../../assets/images/iconePerfilAtivos.png")}
              style={{ width: 19.11, height: 21.06, resizeMode: "cover" }}
            />
          </Pressable>
          <View style = {{backgroundColor: "#eaeaea", width: 2, height: 25,fill: 1, borderRadius: 10, marginTop: 5}}></View>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#D4D4D4" : "white",
              },
              {width: 25.74, height: 20.67, marginTop: 5},
            ]}
          >
            <Image
              source={require("../../../assets/images/iconePerfilFotos.png")}
              style={{ width: 25.74, height: 20.67, resizeMode: "cover" }}
            />
          </Pressable>
        </View>
      <View style = {{backgroundColor: "#eaeaea", width: 380, height: 2, borderRadius: 10, marginTop: 2, alignSelf: 'center'}}></View>
      <View style={styles.linhaFeed}>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
      </View>
      <View style={styles.linhaFeed}>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
      </View>
      <View style={styles.linhaFeed}>
        <Pressable style={({ pressed }) => [{tintColor: pressed ? "#D4D4D4" : "white"}, styles.publicacaoFeed]}>
          <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        </Pressable>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
        <Image source={require("../../../assets/images/photosTeste/photoUser.jpeg")} style={styles.publicacaoFeed}></Image>
      </View>
      </View>
    </View>
    </ScrollView>
  );
    
  
}

const styles = StyleSheet.create({
  linhaFeed: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  publicacaoFeed:{
    width: (windowWidth-2160/100)/3,
    height: (windowWidth-2160/100)/3
  },
  photoPerfilSize: {
    width: 10,
    height: 10,
    marginLeft: "11%",
    marginTop: "3%",
  },
  photoPerfil: {
    borderRadius: 999,
    height: 90,
    width: 90,
    alignSelf: "center",
    marginTop: "4%",
  },
  headerPerfilEsquerdo: {
    width: 200,
    height: 200,
  },
  headerPerfilDireito: {
    width: 200,
    height: 200,
  },
  background: {
    backgroundColor: "#eaeaea",
    flex: 1,
  },
  headerPerfil: {
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "1.9%",
    marginBottom: "4.9%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: "26.5%",
    flexDirection: "row",
    alignSelf: "center",
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
    marginTop: "1.5%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#14144b",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 10,
  },
  textQuant: {
    marginTop: "1.5%",
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
    marginLeft: 2,
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
    marginLeft: 10,
    alignContent: "center",
    marginTop: 10,
    marginRight: 10,
  },
});
