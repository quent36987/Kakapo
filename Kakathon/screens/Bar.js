
import React, { Component } from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, View, Text, FlatList, Image, ImageBackground} from 'react-native';
import Firebase from '../config/firebase';
import Post from "../components/Post";
import {StatusBar} from "expo-status-bar";
import CardBar from "../components/CardBar";
import cardBar from "../components/CardBar";


class Bar extends Component {





    constructor() {
        super();
        this.docs = Firebase.firestore().collection('bar');
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
            const { titre } = res.data();
            students.push({
                key: res.id,
                qt : 5,
                prix : 69,
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
                <ScrollView>
                    <FlatList
                        data={this.state.students}
                        numColumns={2}
                        renderItem={cardBar}
                        style={styles.wrapper}

                    />
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 22,
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