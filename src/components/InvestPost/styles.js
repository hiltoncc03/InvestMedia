// Tela para definição dos estilos do post no feed.

import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Image from '../Image';

export const Container = styled.View`

    padding: 10px 13px;
    margin-top: 1px;
    flex-direction: row;
`;

export const Profile = styled(Image)`

    width: 60px;
    height: 60px;
    border-radius: 30px;


`;

export const Content = styled.View`
    flex: 1;
    padding-left: 10px;
`;

export const Header = styled.View`
    flex-direction: row;

`;

// cor do nome de usuário que aparece no feed
export const Name = styled.Text.attrs({
    numberOfLines: 1,
})`
    flex-shrink: 1;
    font-size: 16px;
    font-weight: bold;
    color: rgb(20,  23,  25); 

`;

// cor do @username 
export const Account = styled.Text`
    font-size: 16px;
    color: rgba(104,  119,  132,  1);
`;
// Hora dos posts
export const Timestamp = styled.Text`
    font-size: 16px;
    color: rgba(104,  119,  132,  1);
`;

export const Body = styled.Text`
font-size: 16px;
padding-top: 3px;
color: rgb(20,  23,  25);
`;

export const Media = styled(Image)`
height: 150px;
margin-top: 6px;
border-radius: 15px;
border: 1px solid rgba(206,  214,  220,  1);
height: ${({height}) => height}px;
`;

export const Footer = styled.View`
margin-top: 3px;
flex-direction: row;




`;

export const IconContainer = styled(TouchableOpacity)`
    flex: 1;
    flex-direction: row;
    align-items: center;  
    padding: 5px 0px;

`;

export const Count = styled.Text`
font-size: 16px;
color: rgba(104,  119,  132,  1);
padding-left: 5px;
`;