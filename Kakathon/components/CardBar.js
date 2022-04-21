import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import {Ionicons} from "@expo/vector-icons";

const CardBar = ({
                  title,
                  message,
                  date,
                  important,
                  image,
                  key,
              }) => {
    return (
        <>
            <Card>

                <ImageBackground
                    source={require('../assets/icon.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode='cover'
                >
                <Text style={{marginBottom: 10}}>
                The idea with React Native Elements.
            </Text>
                    </ImageBackground>
            </Card>

        </>

    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '600'
    },
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        paddingHorizontal: 12
    }
});

export default CardBar;