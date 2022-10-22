//Renderização dos posts através da flatlist.

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Loading } from './styles';
import { FAB } from "@rneui/themed";
import axios from "axios";
import { InvestPost } from '../../components';
import getPosts from '../../api';

const baseUrl = "https://investmedia-server.glitch.me";

// function getUserInfo(loggedUser){
//   const [userInfo,setUserInfo] = useState([])
//   useEffect(()=>{
//     axios.get(`${baseUrl}/infoUser/${loggedUser}`)
//     .then((response) => {
//       setTimeout( () => {
//         setUserInfo(response.data)
//         console.log(userInfo);
        
//       }, 3000)
//     })
//   },[])
//   return userInfo;
// }

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}

const getUserInfo = async (loggedUser) => {
    const response = await axios.get(`${baseUrl}/infoUser/${loggedUser}`)
    console.log(response.data[0])
    await delay(3000)
    return response.data
}


function Home({route}) {
    const loggedUser = route.params.loggedUser;
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [userInfoRequested, setUserInfoRequested] = useState(false);
    
    if(!userInfoRequested){
      setUserInfo(getUserInfo(loggedUser))
      setUserInfoRequested(true)
    }

    const fetchPosts = useCallback(async () => {
        if (!isFetching && !error) {
          try {
            setFetching(true);
            const newPosts = await getPosts(page, 4);
            setPage(page + 1);
            setPosts([...posts, ...newPosts]);
          } catch (err) {
            setError(err);
          } finally {
            setFetching(false);
          }
        }
      }, [page, isFetching]);
    
      useEffect(() => {
        fetchPosts();
      }, []);





    return (
      <Container>
        <FlatList
          data={posts}
          renderItem={({ item }) => <InvestPost {...item} />}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => fetchPosts()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (!isFetching) {
              return null;
            }
            return (
              <Loading>
                <ActivityIndicator size="large" color="yellow" />
              </Loading>
            );
          }}
        />
        <FAB
          visible={true}
          icon={{ name: "add", color: "white" }}
          color="#c6b347"
          placement="right"
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
          onPress={() => {
            navigation.navigate("Post", { userInfo: userInfo });
          }}
        />
      </Container>
    );
          }
          

export default Home;