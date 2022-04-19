
import React, { Component } from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, View, Text} from 'react-native';
import Firebase from '../config/firebase';
import Post from "../components/Post";
import {StatusBar} from "expo-status-bar";


class Bar extends Component {

    constructor() {
        super();
        this.docs = Firebase.firestore().collection('post');
        this.state = {
            isLoading: true,
            students: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getStudentsData);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getStudentsData = (querySnapshot) => {
        const students = [];
        querySnapshot.forEach((res) => {
            const { message, titre } = res.data();
            students.push({
                key: res.id,
                message,
                titre
            });
        });
        this.setState({
            students,
            isLoading: false
        });
    }



    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar style='dark-content' />
                <View style={styles.row}>
                    <Text style={styles.title}>A boire</Text>
                </View>


                <ScrollView style={styles.wrapper}>
                    {
                        this.state.students.map((res, i) => {
                            return (
                                <Post title={res.titre}/>
                            );
                        })
                    }
                </ScrollView>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingBottom: 22
    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#e93b81',
        paddingTop: 40,
        paddingHorizontal: 9
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff'
    }
})

export default Bar;