import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"

const Post = (name,profUrl,post, likes) => {
  return (
    <View style={styles.container}>
        <View style={styles.postHeadContainer}>
            <View style={styles.postHead}>
                <Image style={styles.image} source={{uri:profUrl}} />
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="dots-vertical" size={31} color="black"/>
            </View>
        </View>
        <View>
            <Image style={styles.imagePost} source={{uri:post}} />  
        </View>
        <View style={styles.postBottom}>
            <View style={styles.postBelow}>
                <AntDesign name="hearto" size={29} color={"black"} style={styles.bottomIcons}/>
                <Feather name="message-circle" size={29} color={"black"} style={styles.bottomIcons}/>
                <Ionicons name="paper-plane-outline" size={29} color={"black"} style={styles.bottomIcons}/>
            </View>
            <View>
                <Feather name="bookmark" size={29} color={"black"}/>
            </View>
        </View>
        <View>
            <Text style={styles.likeCount}>{likes} likes</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        minHeight: 505,
        backgroundColor: "#fafafa",
        paddingTop: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    image:{
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 5,
    },
    imagePost:{
        height: 400,
        width: "100%",
        borderWidth: 1,
    },
    postHeadContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-beetween",
    },
    nameText:{
        fontWeight: "bold",
    },
    postHead:{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5,
    },
    postBelow:{
        flexDirection: "row",
    },
    bottomIcons:{
        marginLeft: 5,
    },
    postBottom:{
        flexDirection: "row",
        justifyContent: "space-beetween",
        marginTop: 5,
    },
    likeCount:{
        fontWeight: "bold",
        backgroundColor: "white",
        paddingBottom: 5,
        marginTop: 5,
        marginLeft: 5,
    },
});