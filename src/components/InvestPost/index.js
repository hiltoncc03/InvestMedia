// Arquivo js onde os posts são formatados a partir dos dados exportados para esta tela.

import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import numeral from 'numeral';
import { Container, Profile, Header, Content, Name, Account, Timestamp, Body, Media, Footer, IconContainer, Count } from './styles';


const calculateHeight = (width = null) => {
    if (!width) {
      width = Dimensions.get('screen').width;
    }
    const proportion = width > Dimensions.get('screen').height ? 0.39 : 0.425;
  
    return width * proportion;
  };



function InvestPost({ user, tweet }) {
    
    const [mediaHeight, setMediaHeight] = useState(calculateHeight());

    useEffect(() => {
        const handleChange = ({screen}) => {
          setMediaHeight(calculateHeight(screen.width));
        };
        Dimensions.addEventListener('change', handleChange);
    
        return () => {
          Dimensions.removeEventListener('change');
        };
      }, []);

    return (

        <Container>
            <Profile source={{ uri: user.picture }} />
            <Content>

                <Header>
                    <Name> {user.nickname} </Name>
                    <Account> @{user.account} </Account>
                    <Timestamp> . 3 h</Timestamp>
                </Header>

                {tweet.text && <Body>    {tweet.text}       </Body>}

                {tweet.media && <Media height={mediaHeight} source={{ uri: tweet.media }} />}

                <Footer>

                    <IconContainer>
                        <Icon
                            name="heart"
                            size={24}
                            color="rgba(104,  119,  132,  1);"
                        />
                        <Count> {numeral(tweet.commentCount).format('0a')}  </Count>
                    </IconContainer>

                    <IconContainer>
                        <Icon
                            name="heart"
                            size={24}
                            color="rgba(104,  119,  132,  1);"
                        />
                        <Count> {numeral(tweet.shareCount).format('0a')}  </Count>
                    </IconContainer>

                    <IconContainer>
                        <Icon
                            name="comment"
                            size={24}
                            color="rgba(104,  119,  132,  1);"
                        />
                        <Count> {numeral(tweet.likeCount).format('0a')}  </Count>
                    </IconContainer>

                </Footer>
            </Content>
        </Container>

    );
}

export default InvestPost;