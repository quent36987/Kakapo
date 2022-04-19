import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import {Ionicons} from "@expo/vector-icons";

const Post = ({
                    title,
                    message,
    date,
    important,
    image,
    key,
                }) => {
    return (
        <>
        <Card >
            {important ?
                <Card.Title>  <Ionicons name='megaphone' color='red' /> {title}</Card.Title>
                :

            <Card.Title>{title}</Card.Title> }


            <Card.Divider/>
            {image ?
            <Card.Image source={{uri: image}} style={{marginBottom:10 }}/> : <></> }

            {message ?
            <Text style={{marginBottom: 10}}>
                {message}
            </Text> : <></> }

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

export default Post;