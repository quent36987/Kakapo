import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import Bar from "./Bar";

const auth = Firebase.auth();



export default function PostAdd() {

    const [titre, setTitre] = useState('');
    const [message, setMessage] = useState('');

    const dbRoot = Firebase.firestore().collection('posts');

    const addData = async () => {
        dbRoot.add({
            titre: titre,
            message: message,
        });


    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Titre</Text>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='home'
                placeholder='Enter titre'
                autoCapitalize='none'
                autoFocus={true}
                value={titre}
                onChangeText={text => setTitre(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='lock'
                placeholder='Enter message'
                autoCapitalize='none'
                value={message}
                onChangeText={text => setMessage(text)}
            />


            <Button
                onPress={addData()}
                backgroundColor='#f57c00'
                title='Send'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 24
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e93b81',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 24
    },
});

