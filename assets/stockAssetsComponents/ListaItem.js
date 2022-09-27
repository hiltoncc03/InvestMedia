import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export const ListaItem = ( {nome, sigla, cotação, porcentagemcotação7d, logoUrl, onPress} ) => {
    const ChangeColorPreço = porcentagemcotação7d > 0 ? '#34C759' : '#FF3B30';

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.AjustarItem}>

                {/*Lado esquerdo */}
                <View style={styles.ladoesquerdo}>
                    <Image source={{ uri: logoUrl}} style={styles.image} />
                    <View style={styles.titulosAtivos}>
                        <Text style={styles.titulo}> {nome} </Text>
                        <Text style={styles.subtitulo}> {sigla.toUpperCase()} </Text>
                    </View>
                </View>

                {/*Lado direito */}
                <View style={styles.ladodireito}>
                    <Text style={styles.titulo}> R$ {cotação.toLocaleString('pt-BR', {currency: 'BRL'})} </Text>
                    <Text style={[styles.subtitulo, { color: ChangeColorPreço }]}> {porcentagemcotação7d.toFixed(2)}%</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    AjustarItem: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    image: {
        height: 55,
        width: 70,
        resizeMode: 'contain'
    },
    ladoesquerdo: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'flex-end',
    },

});

export default ListaItem