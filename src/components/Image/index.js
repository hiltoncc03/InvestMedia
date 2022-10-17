import React, { useState, useMemo } from 'react';
import { Animated } from 'react-native';
import { Container, RNImage } from './styles';

function Image({ source, style }) {
    const [opacity] = useState(new Animated.Value(0));

    const onLoadImage = () => {
        Animated.timing(opacity, {
            duration: 250,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const color = useMemo(() => {
        return `rgb(${Math.random() * 255}, ${Math.random() *
          255}, ${Math.random() * 255})`;
      }, []);

    return (
        <Container color={color} style={style}>
            <RNImage style={{ opacity }} source={source} onLoad={onLoadImage} />
        </Container>
    );
}

export default Image;