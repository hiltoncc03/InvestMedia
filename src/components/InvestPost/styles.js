// styles.js do InvestPost, dentro de components
// Tela para definição dos estilos do post no feed.

import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Image from '../Image';

export const Container2 = styled.View`

    padding: 10px 13px;
    margin-top: 1px;
    flex-direction: row;
   
 
`;

export const Profile = styled(Image)`

    width: 42px;
    height: 42px;
    border-radius: 21px;
    
   
`;
// Ajusta a direção de todo o conteúdo do feed.
export const Content = styled.View`
    flex: 1;
    padding-left: 10px;
`;

export const Header = styled.View`
    flex-direction: row;
    margin-bottom: 5px;

`;

// cor do nome de usuário que aparece no feed
export const Name = styled.Text`
  
    margin-top: 5px;
    font-weight: bold;
    color: rgb(20,  23,  25); 
    flex-direction: row;

`;

// cor do @username 
export const Account = styled.Text`
    font-size: 16px;
    color: rgba(104,  119,  132,  1);
    margin-top: 3px;
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
height: 320px;
width: 368px;
margin-top: 6px;
border-radius: 15px;
border: 1px solid rgba(206,  214,  220,  1);

`;

export const Footer = styled.View`
margin-top: 3px;
flex-direction: row;
margin-right: 140px;
margin-bottom: 5px;



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