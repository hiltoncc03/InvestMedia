import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import axios from 'axios';

export const { width: SIZE } = Dimensions.get('window');

export const Grafico = ({ cotação, logoUrl, nome, sigla, porcentagemcotação7d, ASSETS_ID}) => {
  const ChangeColorPreço = porcentagemcotação7d > 0 ? '#34C759' : '#FF3B30';
  // Resolve bug do gráfico invisível.
  const [chartReady, setChartReady] = useState(false);
  const [sparkline, setSparkline] = useState([]);



  useEffect(() => {
    axios
     .get(
       "https://investmedia-server.glitch.me/ativos/variacao/" + ASSETS_ID
     )
axios
  .get("https://investmedia-server.glitch.me/ativos/variacao/" + ASSETS_ID)
  .then((res) => {
    console.log(res.data[0]);
    setSparkline([
      { x: 1, y: res.data[0].d1 },
      { x: 2, y: res.data[0].d2 },
      { x: 3, y: res.data[0].d3 },
      { x: 4, y: res.data[0].d4 },
      { x: 5, y: res.data[0].d5 },
      { x: 6, y: res.data[0].d6 },
      { x: 7, y: res.data[0].d7 },
      { x: 8, y: res.data[0].d8 },
      { x: 9, y: res.data[0].d9 },
      { x: 10, y: res.data[0].d10 },
      { x: 11, y: res.data[0].d11 },
      { x: 12, y: res.data[0].d12 },
      { x: 13, y: res.data[0].d13 },
      { x: 14, y: res.data[0].d14 },
      { x: 15, y: res.data[0].d15 },
    ]);
  });

    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [])

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
              <Text style={styles.subtitulo}> {nome}, ({sigla}) </Text>
            </View>
            <Text style={styles.subtitulo}>15d</Text>
          </View>
          <View style={styles.TituloInferior}>
          <ChartYLabel
            format={formatBRL}
            style={styles.BoldTitulo}
          />
            {/* <Text style={styles.BoldTitulo}> R$ {cotação.toLocaleString('pt-BR', { currency: 'BRL' })}</Text> */}
            <Text style={[styles.subtitulo, { color: ChangeColorPreço }]}>{porcentagemcotação7d}%</Text>
          </View>
        </View>

        { chartReady ?
        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
        </View>

        : 

        null

        }

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



export default Grafico