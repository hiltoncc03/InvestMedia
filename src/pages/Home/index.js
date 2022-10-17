//Renderização dos posts através da flatlist.


import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Container, Loading } from './styles';

import { InvestPost } from '../../components';
import getPosts from '../../api'; 


function Home() {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);


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
                keyExtractor={item => String(item.id)}
                onEndReached={() => fetchPosts()}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    if (!isFetching) {
                      return null;
                    }
                    return (
                      <Loading>
                        <ActivityIndicator size="large" color= "yellow" />
                      </Loading>
                    );
                  }}
                />
              </Container>
            );
          }
          

export default Home;