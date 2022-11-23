import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRef, useMemo, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const seguir = async (loggedUser, ASSETS_ID) => {
  const response = await axios.post(
    `https://investmedia-server.glitch.me/seguirAtivo`,
    {
      loggedUser: loggedUser,
      assetsID: ASSETS_ID,
    }
  );
  if (response.status === 200) {
    console.log("Seguido");
    return true;
  }
};

const verificaSegue = async (loggedUser, ASSETS_ID) => {
  const response = await axios.get(
    `https://investmedia-server.glitch.me/seguirAtivo/${loggedUser}/${ASSETS_ID}`
  );
  console.log(response.data);
  return response.data;
};

export const ListaItem = ({
  nome,
  sigla,
  cotação,
  porcentagemcotação7d,
  loggedUser,
  ASSETS_ID,
  onPress,
}) => {
  const ChangeColorPreço = porcentagemcotação7d > 0 ? "#34C759" : "#FF3B30";
  const [seguido, setSeguido] = useState(false);
  useEffect(() => {
    let temp = verificaSegue(loggedUser, ASSETS_ID);
    setSeguido(temp);
  }, []);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.AjustarItem}>
        {/*Lado esquerdo */}
        <View style={styles.ladoesquerdo}>
          <View style={styles.titulosAtivos}>
            <Text style={styles.titulo}> {nome} </Text>
            <Text style={styles.subtitulo}> {sigla.toUpperCase()} </Text>
          </View>
        </View>

        {/*Lado direito */}
        <View style={styles.ladodireito}>
          <Text style={styles.titulo}> R$ {cotação} </Text>
          <Text style={[styles.subtitulo, { color: ChangeColorPreço }]}>
            {" "}
            {porcentagemcotação7d}%
          </Text>
          <TouchableOpacity
            disabled={seguido} //Desativa o botão seguir, se o usuário estiver no próprio perfil
            style={
              seguido ? styles.pressableHeaderDisabled : styles.pressableHeader
            }
            onPress={() => {
              const temp = seguir(loggedUser, ASSETS_ID);
              setSeguido(true);
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressableHeader: {
    backgroundColor: "#c6b347",
    height: 28,
    width: 83,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
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
  AjustarItem: {
    paddingHorizontal: 16,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: 55,
    width: 70,
    resizeMode: "contain",
  },
  ladoesquerdo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titulosAtivos: {
    marginLeft: 8,
  },
  titulo: {
    fontSize: 18,
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
  ladodireito: {
    alignItems: "flex-end",
  },
});

export default ListaItem;
