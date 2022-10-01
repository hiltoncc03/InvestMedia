import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

//Formata a data para o formato YYYY-MM-DD
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function preparaFotoPerfil(fotoPerfil){
    const fotoString = JSON.stringify(fotoPerfil);
    const res = fotoString.substring(1, fotoString.length-7)
    console.log(res)
    return res;
}

export default function Login() {
    const navigation = useNavigation();
    //Comando utilizado através do useEffect para evitar que a animação da tela splash se repita após o usuário usar o back.
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])

    //Função assíncrona criada para passar os parâmetros necessários para o login via Google.
    async function handleSignIn() {

        const CLIENT_ID = '1059836562881-1trgti4aldugcah36s0fi2tm9vhef1gj.apps.googleusercontent.com';
        const REDIRECT_URI = 'https://auth.expo.io/@guilhermecod/InvestMedia';
        const RESPONSE_TYPE = 'token';
        const SCOPE = 'profile email';
        const authUrl = encodeURI(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`);
        const response = await AuthSession.startAsync({ authUrl });
        const TOKEN = await response.params.access_token;
        //console.log(response);
        
        if (response.type === 'success'){ 
            const userdata = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${TOKEN}`);  
            const transformajson = await userdata.json()
            console.log(transformajson)
            await axios.get(`https://investmedia-server.glitch.me/getId/${transformajson.email}`)
            .then((response) => {
                navigation.navigate('TabBar', {'USER_ID' : response.data[0].USER_ID});
                //Chama a tela TabBar, passando o USER_ID como parâmetro
            })
            .catch(function (error){  //Verifica se existe o email logado está cadastrado no banco de dados
                console.log(error)
                console.log("Usuario não cadastrado")
                console.log(transformajson);
                const dataEntrada = formatDate(new Date().toDateString()) //Obtém a data atual pelo método new Date().toDateString() e converte para o formato YYYY-MM-DD pelo método formatDate()
                // Registra novo usuário no Banco de dados, por meio das informações obtidas pelo oAuth
                console.log(transformajson.picture)
                axios.post(`https://investmedia-server.glitch.me/infoUser`, 
                    {
                        nome: transformajson.name, 
                        email: transformajson.email, 
                        dataEntrada: dataEntrada, 
                        verificado: 1,
                        fotoPerfil: preparaFotoPerfil(transformajson.picture)
                        // Retira os ultimos 6 caracteres da string que contém o link da foto de perfil, que são responsáveis por limitar a qualidade da foto
                    }
                )
                .then(() => {
                    console.log("Usuário cadastrado, fazendo login")
                    axios.get(`https://investmedia-server.glitch.me/getId/${transformajson.email}`)
                    .then((response) => {
                        console.log("Redirecionando para Home")
                        navigation.navigate('TabBar', {'USER_ID' : response.data[0].USER_ID});
                        //navigation.navigate('Register', {'USER_ID' : response.data[0].USER_ID});
                        //Chama a tela TabBar, passando o USER_ID como parâmetro
                    })
                })
                .catch(err => 
                    console.log("Erro --> " + JSON.stringify(err.response.data))
                )
            })
        }   
        
    }

    return (
        //Imagem da logo do InvestMedia e botão personalizado do login com o Google.
        // Parte do código que permite a utilização de uma imagem no botão.
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.fundo}>
                <Image style={styles.ImagemLogin}
                    source={require('../../assets/LoginImage.png')}
                />
    
                <TouchableOpacity

                    onPress={handleSignIn}
                    style={styles.botaogoogle}
                    activeOpacity={0.5}>
                    <Image
                        source={require('../../assets/googlebutton.png')}
                        style={styles.imagembotaogoogle}
                    />
                    <View style={styles.separadorbotao} />
                    <Text style={{ color: '#808080', marginBottom: 4, marginLeft: 48, fontWeight: "bold" }}>
                        Continuar com o Google
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



//Estilos utilizados nessa tela.

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: '#f5f5f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImagemLogin: {
        width: 350,
        resizeMode: 'contain',
        marginTop: 90,

    },
    botaogoogle: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 5,
        borderColor: '#fff',
        height: 55,
        borderRadius: 30,
        margin: 5,
        width: 300,
        marginTop: 10,
        marginBottom: 410,
    },
    imagembotaogoogle: {

        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    separadorbotao: {

        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
});