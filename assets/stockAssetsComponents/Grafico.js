import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';


export const { width: SIZE } = Dimensions.get('window');

export const Grafico = ({ cotação, logoUrl, nome, sigla, porcentagemcotação7d, sparkline }) => {
  const ChangeColorPreço = porcentagemcotação7d > 0 ? '#34C759' : '#FF3B30';

  const formatBRL = value => {
    'worklet';
    if (value === '') {
      return `R$${cotação.toLocaleString('pt-BR', { currency: 'BRL' })}`;
    }



    const formattedValue = `R$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`

    return formattedValue;
  };


  return (
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.graficoest}>

        {/* Títulos */}
        <View style={styles.Titulosest}>

          <View style={styles.TitulosSuperiores}>
            <View style={styles.TituloSuperiorEsquerdo}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subtitulo}> {nome}, ({sigla.toUpperCase()}) </Text>
            </View>
            <Text style={styles.subtitulo}>7d</Text>
          </View>
          <View style={styles.TituloInferior}>
          <ChartYLabel
            format={formatBRL}
            style={styles.BoldTitulo}
          />
            {/*<Text style={styles.BoldTitulo}>R$ {cotação.toLocaleString('pt-BR', { currency: 'BRL' })}</Text>*/}
            <Text style={[styles.subtitulo, { color: ChangeColorPreço }]}>{porcentagemcotação7d.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
        </View>

      </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({

  graficoest: {
    marginVertical: 16
  },
  Titulosest: {
    marginHorizontal: 16
  },
  TitulosSuperiores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TituloSuperiorEsquerdo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 40,
    marginRight: 4,
    resizeMode: 'contain',
  },
  subtitulo: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  TituloInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BoldTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Titulo: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },

});
