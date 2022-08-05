import React,{useLayoutEffect} from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import Post from '../components/Post.js'
import Active from '../components/Active.js'
import { Data } from './data/dummyData'

const HomeScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title:"",
      headerLeft:() => {
        <Image
          style={{
            marginLeft: -10,
            height: 60,
            width: 150,
            resizeMode: "contain",
            marginBottom: -5,
          }}

          source={require("../assets/logo-text.png")}
        />
      }
    })
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.activeContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          {Data.map((data) => {
          <Active key={data.id} name={data.name} profUrl={data.profUrl}/>
        })
        }
        </ScrollView>
      </View>
      <View style={styles.postContainer}>
        {Data.map((data) => {
          <Post key={data.id} name={data.name} profUrl={data.profUrl} post={data.post}/>
        })
        }
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  activeContainer: {
    paddingTop: 10,
    height: 105,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  image: {
    height: "92%",
    width: "92%",
    borderRadius: 50,
    borderWidth: 1,
  },
  container: {
    flexDirection: "column",
  },
});