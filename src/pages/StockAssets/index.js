import * as React from 'react';
import { useRef, useMemo, useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, SafeAreaView, Image, ActivityIndicator, TextInput} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dadosdeamostra } from '../../../assets/Dados/Dadosdeamostra'
import { ListaItem } from '../../components/ListaItem'
import { Grafico } from '../../components/Grafico'
import axios from 'axios';


//Função que renderiza os mercados

export default function Ativos({ route }) {
  const loggedUser = route.params.loggedUser;
  //Variáveis do gráfico
  const [selectedStockassetData, setSelectedStockassetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [acoes, setAcoes] = useState([]);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["55%"], []);

  const openModal = (data) => {
    setSelectedStockassetData(data);
    bottomSheetModalRef.current.present();
  };

  useEffect(() => {
    searchText != ""
      ? axios
          .get(`https://investmedia-server.glitch.me/ativos/` + searchText)
          .then((res) => {
            console.log(res.data);
            setAcoes(res.data);
            setIsLoading(false);
          })
      : axios.get(`https://investmedia-server.glitch.me/ativos`).then((res) => {
          console.log(res.data);
          setAcoes(res.data);
          setIsLoading(false);
        });
  }, [searchText]);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#E1E2E1" }}>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <View style={styles.searchArea}>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar"
              placeholderTextColor="#848484"
              value={searchText}
              onChangeText={(t) => {
                setSearchText(t);
              }}
            />
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={acoes}
            renderItem={({ item }) => (
              <>
                {item.sigla === "null" ? (
                  <></>
                ) : (
                  <ListaItem
                    nome={item.nm_empresa}
                    sigla={item.cd_acao}
                    cotação={item.curPrc}
                    porcentagemcotação7d={item.prcFlcn}
                    loggedUser={loggedUser}
                    ASSETS_ID={item.ASSETS_ID}
                    //logoUrl={'item.image'}
                    //onPress={() => { }}
                    onPress={() => openModal(item)}
                  />
                )}
              </>
            )}
          />
        </SafeAreaView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {selectedStockassetData ? (
            /*Condição que verifica se a variavel dos ativos possui dados. */

            <Grafico
              cotação={selectedStockassetData.curPrc}
              //logoUrl={selectedStockassetData.image}
              nome={selectedStockassetData.nm_empresa}
              sigla={selectedStockassetData.cd_acao}
              porcentagemcotação7d={selectedStockassetData.prcFlcn}
              ASSETS_ID={selectedStockassetData.ASSETS_ID}
            />
          ) : null}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
    margin: 10,
    borderRadius: 10,
    fontSize: 19,
    color: "#000000",
    padding: 10,
  },
  searchArea: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  Titulolargo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  Ajustartitulo: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  Divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#CFB43C",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});