import styled from 'styled-components';
import {Animated} from 'react-native';

export const Container = styled.View`
overflow: hidden;
background-color: ${({color}) => color};
`;

export const RNImage = styled(Animated.Image)`
flex: 1;
`;