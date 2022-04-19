import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

const Post = ({
                    title,
                }) => {
    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            <Card.Divider/>
            <Card.Image source={require('../assets/favicon.png')} />
            <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
        </Card>
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