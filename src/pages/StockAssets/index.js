
import * as React from 'react';
import { useRef, useMemo, useState } from 'react';
import { Text, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ListaItem } from '../../../assets/stockAssetsComponents/ListaItem'
import { Grafico } from '../../../assets/stockAssetsComponents/Grafico'
import { Dadosdeamostra } from '../../../assets/stockAssetsComponents/Dadosdeamostra'

const ListHeader = () => (
    <>
        <View style={styles.Ajustartitulo}>
            <Text style={styles.Titulolargo}> Mercados </Text>
        </View>
        <View style={styles.Divisor} />
    </>
)

export default function Ativos({route}) {
    const USER_ID = route.params.USER_ID;
    const [selectedStockassetData, setSelectedStockassetData] = useState(null);

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['45%'], []);

    const openModal = (item) => {
        setSelectedStockassetData(item);
        bottomSheetModalRef.current.present();
    }


    return (
        <View></View>
        /*
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <SafeAreaView>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={Dadosdeamostra}
                        renderItem={({ item }) => (
                            <ListaItem
                                nome={item.nome}
                                sigla={item.sigla}
                                cotação={item.current_price}
                                porcentagemcotação7d={item.price_change_percentage_7d_in_currency}
                                logoUrl={item.image}
                                onPress={() => openModal(item)}
                            />
                        )}
                        ListHeaderComponent={<ListHeader />}
                    />

                </SafeAreaView>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={styles.bottomSheet}

                >
                { selectedStockassetData ? (
                //Condição que verifica se a variavel dos ativos possui dados.

                 <Grafico
                    cotação={selectedStockassetData.current_price}
                    logoUrl={selectedStockassetData.image}
                    nome={selectedStockassetData.nome}
                    sigla={selectedStockassetData.sigla}
                    porcentagemcotação7d={selectedStockassetData.price_change_percentage_7d_in_currency}
                    sparkline={selectedStockassetData.sparkline_in_7d.price}
                 />
                )
                : null}

                </BottomSheetModal>

            </BottomSheetModalProvider>
        </GestureHandlerRootView>*/
    );
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    Titulolargo: {
        fontSize: 24,
        fontWeight: "bold",
    },
    Ajustartitulo: {
        marginTop: 40,
        paddingHorizontal: 16
    },
    Divisor: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#CFB43C',
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
    }
});
