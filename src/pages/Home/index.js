//Renderização dos posts através da flatlist.

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Container, Loading } from './styles';
import { FAB } from "@rneui/themed";
import axios from "axios";
import { InvestPost } from '../../components';
import getPosts from '../../api';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const baseUrl = "https://investmedia-server.glitch.me";4

function bottomSheet(userInfo){
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['45%'], []);
  
  const openModal = (item) => {
    setSelectedStockassetData(item);
    bottomSheetModalRef.current.present();
  }
   
  return(<GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
        <SafeAreaView>

        </SafeAreaView>

        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}

        >

        </BottomSheetModal>

    </BottomSheetModalProvider>
</GestureHandlerRootView>)
}

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

function Home({ route }) {
  const loggedUser = route.params.loggedUser;
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoRequested, setUserInfoRequested] = useState(false);

  useEffect(() => {
    if (!userInfoRequested) {
      async function load() {
        const data = await getUserInfo(loggedUser)

        setUserInfoRequested(true)
        setUserInfo(
          data
        )
      }

      load()
    }
  }, [userInfoRequested])



  console.log(userInfo)
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
          //navigation.navigate("Post", { userInfo: userInfo });
          bottomSheet(userInfo)
        }}
      />
    </Container>
  );
}


export default Home;